// pages/signin.tsx
"use client";
import { useState, useEffect } from "react";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { FaGoogle, FaApple, FaDiscord } from "react-icons/fa";
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    if (session) {
      router.push("/dashboard/upload");
    }
  }, [session, router]);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(formData);

    if (!result.success) {
      const errors = result.error.format();
      setFormErrors({
        email: errors.email?._errors[0],
        password: errors.password?._errors[0],
      });
      toast.error("Please fix the errors in the form");
      return;
    }

    setFormErrors({});
    toast.success("Sign in successful!");
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex sm:items-center sm:justify-center">
      <Toaster />
      <div className="flex flex-col md:flex-row sm:rounded-lg shadow-lg overflow-hidden w-full max-w-5xl my-0 md:mx-4 md:my-8">
        {/* Left Side */}
        <div className="sm:hidden bg-blue-600 py-5 px-4">
          <p className="text-base font-bold px-4 bg-white text-black  rounded-full inline py-2">
            Base
          </p>
        </div>

        <div className="hidden w-full md:w-1/2 p-8 sm:flex flex-col rounded-lg justify-between bg-blue-600 transition-colors duration-300">
          <div className="md:flex flex-col justify-between rounded-md pt-8 px-2 sm:px-6 text-white h-full bg-blue-700 opacity-90">
            <div className="space-y-8 mb-6">
              <span className="rounded-full bg-white text-black p-2">
                <span className="text-sm font-bold px-2">Base</span>
              </span>

              <h1 className="text-xl md:text-2xl font-bold mb-4">
                Generate detailed reports with just one click
              </h1>
            </div>
            <div className="flex items-end justify-between">
              <span className="mb-10">
                <ThemeToggle />
              </span>
              <Image src="/girl.png" width={200} height={400} alt="Logo" />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div
          className={`w-full md:w-1/2 p-4 sm:p-8 flex flex-col justify-center ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} transition-colors duration-300`}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-2">Sign In</h2>
          <p className="mb-6">Sign in to your account</p>
          <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-4 mb-4">
            <button
              onClick={() => signIn("google")}
              className="flex items-center justify-center w-full p-3 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors duration-300"
            >
              <FaGoogle className="mr-2" />
              Sign in with Google
            </button>
            <button className="flex items-center justify-center w-full p-3 bg-black rounded-lg text-white hover:bg-gray-900 transition-colors duration-300">
              <FaApple className="mr-2" />
              Sign in with Apple
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email address"
                className="w-full p-3 rounded-lg bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm">{formErrors.email}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm">{formErrors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full p-3 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-300"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-indigo-400">
              Forgot password?
            </a>
          </div>
          <div className="mt-4 text-center">
            <p>
              Don&apos;t have an account?{" "}
              <a href="#" className="text-indigo-400">
                Register here
              </a>
            </p>
          </div>
          <div className="flex justify-center space-x-4 mt-6">
            <FiGithub
              className={`hover:text-indigo-500 cursor-pointer transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-black"}`}
            />
            <FiTwitter
              className={`hover:text-indigo-500 cursor-pointer transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-black"}`}
            />
            <FiLinkedin
              className={`hover:text-indigo-500 cursor-pointer transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-black"}`}
            />
            <FaDiscord
              className={`hover:text-indigo-500 cursor-pointer transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-black"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
