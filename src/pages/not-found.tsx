import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] flex items-center bg-paper">
      <div className="container mx-auto px-6">
        <p className="figure text-ink-3 mb-6" style={{ fontSize: "clamp(5rem, 14vw, 10rem)" }} aria-hidden="true">
          404
        </p>
        <h1 className="text-ink mb-4 leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300 }}>
          This page does not exist.
        </h1>
        <p className="text-[17px] text-ink-2 mb-10 max-w-[48ch]">
          The link may be out of date. Everything on the site is reachable from the home page.
        </p>
        <Link href="/" className="group btn-outline focus-ring">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
          Back to the home page
        </Link>
      </div>
    </main>
  );
}
