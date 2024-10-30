import RegisterForm from "@/components/forms/auth/RegisterForm";
import Image from "next/image";

const RegisterPage = () => {
  return (
    <div className="flex h-svh md:max-h-[620px] overflow-hidden">
      <Image
        src={'/assets/images/chair-reader.png'}
        height={1000}
        width={1000}
        alt="patient"
        priority
        className="side-img max-w-[50%]"
      />
      <section className="remove-scrollbar container">
        <div className="sub-container sm:items-center max-w-[860px] py-10">
          <RegisterForm />
        </div>
      </section>

    </div>
  );
};

export default RegisterPage;
