import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-leaf-400" />
          <span className="font-semibold">ChiliHub</span>
        </div>
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ChiliHub. Built for chili farmers
          worldwide.
        </p>
      </div>
    </footer>
  );
}
