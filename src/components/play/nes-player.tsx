"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { NES, Controller } from "jsnes";
import type { ButtonKey } from "jsnes";

const SCREEN_W = 256;
const SCREEN_H = 240;
const SAMPLE_RATE = 44100;
const AUDIO_BUFFER_SIZE = 8192;

const KEY_MAP: Record<string, [1 | 2, ButtonKey]> = {
  ArrowUp: [1, Controller.BUTTON_UP],
  ArrowDown: [1, Controller.BUTTON_DOWN],
  ArrowLeft: [1, Controller.BUTTON_LEFT],
  ArrowRight: [1, Controller.BUTTON_RIGHT],
  KeyZ: [1, Controller.BUTTON_B],
  KeyX: [1, Controller.BUTTON_A],
  Enter: [1, Controller.BUTTON_START],
  ShiftRight: [1, Controller.BUTTON_SELECT],
  ShiftLeft: [1, Controller.BUTTON_SELECT],
};

type Props = { romUrl: string; title?: string };

export function NesPlayer({ romUrl, title = "NES" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nesRef = useRef<InstanceType<typeof NES> | null>(null);
  const rafRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioBufRef = useRef<{ l: Float32Array; r: Float32Array; idx: number }>(
    { l: new Float32Array(AUDIO_BUFFER_SIZE), r: new Float32Array(AUDIO_BUFFER_SIZE), idx: 0 }
  );
  const nextPlayTimeRef = useRef(0);

  const [status, setStatus] = useState("Loading ROM…");
  const [running, setRunning] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  const flushAudio = useCallback(() => {
    const ctx = audioCtxRef.current;
    const buf = audioBufRef.current;
    if (!ctx || buf.idx === 0) return;
    const len = buf.idx;
    const ab = ctx.createBuffer(2, len, SAMPLE_RATE);
    ab.copyToChannel(buf.l.slice(0, len), 0);
    ab.copyToChannel(buf.r.slice(0, len), 1);
    const src = ctx.createBufferSource();
    src.buffer = ab;
    src.connect(ctx.destination);
    const now = ctx.currentTime;
    const start = Math.max(now, nextPlayTimeRef.current);
    src.start(start);
    nextPlayTimeRef.current = start + len / SAMPLE_RATE;
    buf.idx = 0;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const image = ctx2d.createImageData(SCREEN_W, SCREEN_H);
    const buf32 = new Uint32Array(image.data.buffer);

    const nes = new NES({
      onFrame: (frame: Uint32Array) => {
        for (let i = 0; i < frame.length; i++) {
          buf32[i] = 0xff000000 | frame[i];
        }
        ctx2d.putImageData(image, 0, 0);
      },
      onAudioSample: (l: number, r: number) => {
        const buf = audioBufRef.current;
        if (buf.idx >= AUDIO_BUFFER_SIZE) return;
        buf.l[buf.idx] = l;
        buf.r[buf.idx] = r;
        buf.idx++;
        if (buf.idx >= AUDIO_BUFFER_SIZE) flushAudio();
      },
      onStatusUpdate: (s: string) => setStatus(s),
      sampleRate: SAMPLE_RATE,
    });
    nesRef.current = nes;

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(romUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const ab = await res.arrayBuffer();
        if (cancelled) return;
        nes.loadROM(new Uint8Array(ab));
        setStatus("Ready. Press Start.");
      } catch (e) {
        setStatus(`Load failed: ${(e as Error).message}`);
      }
    })();

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      audioCtxRef.current?.close().catch(() => {});
    };
  }, [romUrl, flushAudio]);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      const m = KEY_MAP[e.code];
      if (!m || !nesRef.current) return;
      e.preventDefault();
      nesRef.current.buttonDown(m[0], m[1]);
    };
    const onUp = (e: KeyboardEvent) => {
      const m = KEY_MAP[e.code];
      if (!m || !nesRef.current) return;
      e.preventDefault();
      nesRef.current.buttonUp(m[0], m[1]);
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  const start = useCallback(() => {
    if (!nesRef.current || running) return;
    if (soundOn && !audioCtxRef.current) {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new Ctor({ sampleRate: SAMPLE_RATE });
      nextPlayTimeRef.current = 0;
    }
    setRunning(true);
    let last = performance.now();
    const loop = (now: number) => {
      const delta = now - last;
      last = now;
      const frames = Math.min(4, Math.max(1, Math.round(delta / (1000 / 60))));
      for (let i = 0; i < frames; i++) nesRef.current?.frame();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, [running, soundOn]);

  const stop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    stop();
    nesRef.current?.reset();
    setStatus("Reset.");
  }, [stop]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="bg-black rounded-lg p-2 shadow-lg">
        <canvas
          ref={canvasRef}
          width={SCREEN_W}
          height={SCREEN_H}
          className="w-[512px] h-[480px] max-w-full image-pixelated"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        {!running ? (
          <button
            onClick={start}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium"
          >
            ▶ Start
          </button>
        ) : (
          <button
            onClick={stop}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded font-medium"
          >
            ⏸ Pause
          </button>
        )}
        <button
          onClick={reset}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium"
        >
          ↻ Reset
        </button>
        <label className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
          <input
            type="checkbox"
            checked={soundOn}
            onChange={(e) => setSoundOn(e.target.checked)}
            disabled={running}
          />
          Sound
        </label>
      </div>
      <p className="text-sm text-gray-500">{status}</p>
      <div className="text-xs text-gray-600 dark:text-gray-400 max-w-md text-center">
        <p className="font-semibold mb-1">Controls</p>
        <p>Arrow keys = D-Pad · Z = B · X = A · Enter = Start · Shift = Select</p>
      </div>
    </div>
  );
}
