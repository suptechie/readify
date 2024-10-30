import LoginForm from "@/components/forms/auth/LoginForm";
import Image from "next/image";
import { memo } from "react";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="fixed left-0 top-0 hidden h-screen w-[50%] md:block">
        <Image
          src="/assets/images/sofa-reader.png"
          height={1000}
          width={1000}
          alt="Person reading"
          priority
          className="h-full w-full object-cover"
        />
      </div>

      <main className="flex min-h-screen w-full items-center justify-center md:ml-[50%] md:w-[50%]">
        <div className="w-full max-w-md px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome Back 👋
            </h1>
            <p className="text-lg mb-9">
              Sign in to continue sharing your stories and connecting with our community.
            </p>
          </div>

          <LoginForm />
        </div>
      </main>
    </div>
  );
};

export default memo(LoginPage);