import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust the path if necessary

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirect unauthenticated users to sign-in page
    redirect("/signin");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
    </div>
  );
};

export default Dashboard;
