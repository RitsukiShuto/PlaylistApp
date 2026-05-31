"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p className="text-sm">Signed in as {session.user?.email}</p>
        <Button onClick={() => signOut()} variant="outline" size="sm">
          Sign out
        </Button>
      </div>
    );
  }
  return (
    <Button onClick={() => signIn("spotify")} size="sm">
      Sign in with Spotify
    </Button>
  );
}
