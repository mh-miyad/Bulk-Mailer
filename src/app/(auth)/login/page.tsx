import { Button } from "@/components/ui/button";
import UserForm from "@/components/web/RegisterForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="flex items-center h-screen flex-col md:pt-20 gap-5">
      <UserForm />
      <Link href={"/"}>
        <Button
          variant={"link"}
          className="underline underline-offset-4 hover:decoration-sky-500 text-base hover:active:text-sky-300 font-thin"
        >
          Go To Home
        </Button>
      </Link>
    </div>
  );
};

export default LoginPage;
