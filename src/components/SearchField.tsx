"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

export default function SearchField({ className }: { className?: string }) {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      method="GET"
      action="/search"
      className={className}
    >
      <div className="relative">
        <Input name="q" placeholder="Search" className="pe-10" />
        <button className="absolute right-3 top-1/2 z-10 -translate-y-1/2 transform">
          <SearchIcon className="size-5 text-muted-foreground" />
        </button>
      </div>
    </form>
  );
}
