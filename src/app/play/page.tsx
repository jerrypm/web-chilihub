import { NesPlayer } from "@/components/play/nes-player";

export const metadata = {
  title: "Play — ChiliHub",
  description: "Mini arcade break.",
};

export default function PlayPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <NesPlayer romUrl="/roms/smb.nes" title="Super Mario Bros" />
    </main>
  );
}
