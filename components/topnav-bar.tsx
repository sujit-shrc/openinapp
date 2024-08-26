"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { BellDot } from "lucide-react";
export default function Profile() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-2 justify-end mr-3 p-2">
      <BellDot className="text-xl" />
      {session?.user?.image && (
        <Image
          src={session.user.image}
          alt="Profile Picture"
          width={33}
          height={40}
          className="rounded-full"
        />
      )}
    </div>
  );
}
