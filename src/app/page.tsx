import Image from "next/image";
import { LoginButton } from "@/components/auth/login-button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex w-full justify-between items-center mb-8">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <LoginButton />
        </div>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Spotify Music Mapping MVP
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Your personal music, visualized through acoustic data.
          </p>
          {session && (
            <Link
              href="/dashboard"
              className="mt-4 flex h-12 items-center justify-center rounded-full bg-green-500 px-8 text-white transition-colors hover:bg-green-600 font-bold"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-12">
          {/* ... */}
        </div>
      </main>
    </div>
  );
}
