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
import nookies from "nookies";
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
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || "Anonymous",
      };
      nookies.set(null, "m_user_data", JSON.stringify(user), {
        path: "/",
        domain:
          process.env.NODE_ENV !== "production"
            ? process.env.NEXT_PRODUCTION_URL
            : process.env.NEXT_DEVELOPMENT_URL,
        maxAge: 3600,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        httpOnly: false,
        expires: new Date(Date.now() + 3600 * 1000),
      });

      toast.success("Log In Successful", {
        position: "top-center",
        duration: 5000,
      });
      setLoading(false);
      router.push("/dashboard");
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex h-screen flex-col items-center gap-5 md:pt-20">
      <div className="mx-auto w-full max-w-md rounded-none border-4 border-blue-500/10 bg-slate-200/20 p-4 shadow-input backdrop-blur-lg dark:bg-black/20 md:rounded-3xl md:p-8">
        <Link href={"/"}>
          <div className="flex items-center justify-center space-x-2 transition-opacity hover:opacity-80">
            <CircuitBoard className="h-8 w-8 text-blue-400" strokeWidth={1.5} />
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-xl font-bold uppercase text-transparent">
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
                loading ? "pointer-events-none opacity-50" : ""
              } group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black/20 to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800/30 dark:from-zinc-900/10 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]`}
              type="submit"
            >
              {loading ? (
                <>
                  <Spinner />
                </>
              ) : (
                "Log In"
              )}
              <BottomGradient />
            </button>

            <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

            <div className="flex flex-col space-y-4">
              <button
                className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="submit"
              >
                <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  GitHub
                </span>
                <BottomGradient />
              </button>
              <button
                className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="submit"
              >
                <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
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
          <div className="mt-4 flex items-center justify-center space-x-2">
            <span className="text-sm text-gray-500">
              {`Don't`} have an account?
            </span>
            <Link href={"/register"}>
              <span className="text-sm text-blue-500 underline underline-offset-4 hover:text-blue-600">
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
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
