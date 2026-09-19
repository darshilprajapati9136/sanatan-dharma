import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        className="flex min-h-screen items-center justify-center bg-[#f7f1e7] p-6 font-sans text-[#2c2620] antialiased"
        style={{fontFamily: 'system-ui, sans-serif'}}
      >
        <main className="flex max-w-md flex-col items-center gap-4 text-center">
          <h1 className="font-serif text-2xl font-semibold">Page not found</h1>
          <p className="text-sm text-[#71675b]">
            We could not find the page you were looking for.
          </p>
          <Link
            href="/en"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[#a94f16] px-5 text-sm font-medium text-white hover:opacity-90"
          >
            Back home
          </Link>
        </main>
      </body>
    </html>
  );
}