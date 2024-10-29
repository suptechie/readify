import LoginForm from "@/components/forms/auth/LoginForm";
import Image from "next/image";

const LoginPage = () => {
  return (
    <main className="flex h-svh max-h-[620px]">
        <Image
          src={'/assets/sofa-reader.png'}
          height={1000}
          width={1000}
          alt="patient"
          className="side-img max-w-[50%]"
        />
      <section className="container my-auto">
        <div className="sub-container max-w-[496px] items-center justify-center">
          <LoginForm />
        </div>
      </section>
    </main>
  );
};

export default LoginPage;