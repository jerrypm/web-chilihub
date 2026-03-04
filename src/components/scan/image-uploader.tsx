"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  onUpload: (file: File) => void;
  loading?: boolean;
}

export function ImageUploader({ onUpload, loading = false }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const url = URL.createObjectURL(file);
      setPreview(url);
      onUpload(file);
    },
    [onUpload]
  );

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function clearPreview() {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div
      className={`bg-white/5 backdrop-blur-xl border rounded-2xl p-8 transition-colors ${
        dragActive
          ? "border-leaf-400 bg-leaf-500/5"
          : "border-white/10"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {preview ? (
        <div className="relative">
          <div className="relative w-full max-w-md mx-auto aspect-square rounded-xl overflow-hidden">
            <Image
              src={preview}
              alt="Uploaded chili plant"
              fill
              className="object-cover"
            />
          </div>
          {loading ? (
            <div className="flex items-center justify-center gap-2 mt-4">
              <Loader2 className="w-5 h-5 text-leaf-400 animate-spin" />
              <span className="text-gray-300">Analyzing image...</span>
            </div>
          ) : (
            <button
              onClick={clearPreview}
              className="absolute top-2 right-2 bg-gray-900/80 rounded-full p-1.5 hover:bg-gray-900 transition-colors"
            >
              <X className="w-4 h-4 text-gray-300" />
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full flex flex-col items-center gap-4 py-8 cursor-pointer"
          disabled={loading}
        >
          <div className="w-16 h-16 rounded-full bg-leaf-500/10 flex items-center justify-center">
            <Upload className="w-7 h-7 text-leaf-400" />
          </div>
          <div className="text-center">
            <p className="text-gray-200 font-medium">
              Drop your chili plant photo here
            </p>
            <p className="text-gray-500 text-sm mt-1">
              or click to browse (JPG, PNG, WebP)
            </p>
          </div>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
