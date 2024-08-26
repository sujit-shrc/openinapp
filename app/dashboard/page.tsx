import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirect unauthenticated users to sign-in page
    redirect("/signin");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex-1">
        <h2>Hey Welcome to the dashboard page</h2>
      </main>
    </div>
  );
};

export default Dashboard;
