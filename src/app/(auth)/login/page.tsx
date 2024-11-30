/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { auth } from "@/Authentication/firebase.config";
import { signWithEmailAndPassword } from "@/Authentication/firebase.init";
import Spinner from "@/components/ui/spinner";
import { Label } from "@/components/web/label";
import LabelInputContainer from "@/components/web/LabelContent";
import { Input } from "@/components/web/M_input";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { CircuitBoard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
interface Inputs {
  email: string;
  password: string;
}
const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const { email, password } = data;
    const userCredential = await signWithEmailAndPassword({
      email: email,
      auth: auth,
      password: password,
    });
    if (userCredential.user.uid) {
      setLoading(false);
      toast.success("Log In Successful", {
        position: "top-center",
        duration: 5000,
      });

      router.push("/dashboard");
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex items-center h-screen flex-col md:pt-20 gap-5">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-3xl p-4 md:p-8 shadow-input bg-slate-200/20 backdrop-blur-lg dark:bg-black/20 border-4 border-blue-500/10 ">
        <Link href={"/"}>
          <div className="flex items-center justify-center space-x-2 hover:opacity-80 transition-opacity">
            <CircuitBoard className="h-8 w-8 text-blue-400" strokeWidth={1.5} />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent uppercase">
              <span className="">Draftex</span>
            </span>
          </div>
        </Link>
        <div>
          <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
                {...register("email")}
              />
              {errors.email && <span>This field is required</span>}
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                {...register("password", {
                  required: true,
                  minLength: {
                    message: "Please enter your password",
                    value: 6,
                  },
                })}
              />
              {errors.password && <span>This field is required</span>}
            </LabelInputContainer>
            <button
              className={`${
                loading ? "opacity-50 pointer-events-none" : ""
              } bg-gradient-to-br relative group/btn from-black/20 dark:from-zinc-900/10 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800/30 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]`}
              type="submit"
            >
              {loading ? (
                <>
                  <Spinner />
                </>
              ) : (
                "Create Account"
              )}
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            <div className="flex flex-col space-y-4">
              <button
                className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="submit"
              >
                <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  GitHub
                </span>
                <BottomGradient />
              </button>
              <button
                className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="submit"
              >
                <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Google
                </span>
                <BottomGradient />
              </button>
            </div>
          </form>
        </div>
        <div>
          <div className="flex justify-center">
            <Link href={"/forgot-password"}>
              <span className="text-sm text-gray-500 hover:text-blue-500">
                Forgot Password?
              </span>
            </Link>
          </div>
          <div className="flex justify-center mt-4 items-center space-x-2">
            <span className="text-sm text-gray-500">
              {`Don't`} have an account?
            </span>
            <Link href={"/register"}>
              <span className="text-sm text-blue-500 hover:text-blue-600 underline underline-offset-4">
                Sign Up
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
