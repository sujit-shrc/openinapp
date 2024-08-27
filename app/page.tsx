"use client";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      // Redirect to /dashboard/upload if the user is authenticated
      redirect("/dashboard/upload");
    } else if (status === "unauthenticated") {
      // Show a toast notification for users who aren't logged in
      toast.error("You haven't logged in. Please log in to continue.");
    }
  }, [status]);

  if (status === "loading") {
    // Show a spinner loader while the session is being loaded
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        Please log in
      </h1>
      <p className="mb-4 text-gray-800 dark:text-gray-300">
        You need to be logged in to access the dashboard.
      </p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => signIn()}
      >
        Go to Sign In
      </button>
    </div>
  );
}
