import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-5 py-3 sm:justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          bugbook
        </Link>
        <div className="xs:flex-row xs:items-center flex gap-5">
          <SearchField className="flex-1" />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
