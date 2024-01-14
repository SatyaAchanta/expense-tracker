import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  let href = userId ? "new-user" : "/sign-in";

  return (
    <div className="w-screen h-screen bg-sky-900 flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">Your free personal budget tracker.</h1>
        <p className="text-2xl text-white/60 mb-4">
          Track your budget on the go for free
        </p>
        <div>
          <Link href={href}>
            <button className="bg-orange-600 px-4 py-2 rounded-lg text-xl">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
