import RegisterForm from "@/components/forms/auth/RegisterForm";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

const RegistrationPage = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="fixed left-0 top-0 hidden h-screen w-[40%] md:block">
        <Image
          src="/assets/images/chair-reader.png"
          height={1000}
          width={1000}
          alt="Person reading"
          priority
          className="h-full w-full object-cover"
        />
      </div>

      <main className="min-h-screen w-full md:ml-[40%] md:w-[60%]">
        <div className="flex h-full min-h-screen flex-col px-6 py-10 md:px-[10%]">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Share Your Story ✍️
            </h1>
            <p className="text-base">
              Express yourself freely and anonymously. Share your experiences, thoughts, and ideas with our community while maintaining your privacy.
            </p>
          </div>

          <RegisterForm />

          <p className="mt-6 text-center text-sm ">
            By posting, you agree to our{" "}
            <Link href="#" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default memo(RegistrationPage);