import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-earth text-ivory">
      <div className="container-lux py-32 text-center">
        <p className="eyebrow-light">404</p>
        <h1 className="mx-auto mt-6 max-w-2xl font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-tight">
          This page has wandered off the map.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-ivory/70">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link href="/" className="btn-light mt-10 inline-flex">
          Return home
        </Link>
      </div>
    </section>
  );
}
