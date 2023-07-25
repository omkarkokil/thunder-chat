"use client";

import Button from "@/components/Button";
import Input from "@/components/input/Input";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthButton from "./AuthSocialButton";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";

type variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<variant>("LOGIN");
  const [isLoading, setisLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setisLoading(true);

    if (variant === "REGISTER") {
      // Login by Axios
    }

    if (variant === "LOGIN") {
      // NEXTAUTH SIGNIN
    }
  };
  const socialActions = (action: string) => {
    setisLoading(true);

    //   NEXTAUTH SOCIAL LOGIN
  };

  return (
    <>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div
          className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
        >
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {variant === "REGISTER" && (
              <Input
                id="name"
                register={register}
                disabled={isLoading}
                errors={errors}
                type="text"
                label="Enter name"
              />
            )}
            <Input
              id="email"
              register={register}
              disabled={isLoading}
              errors={errors}
              type="email"
              label="Enter email"
            />
            <Input
              id="password"
              register={register}
              disabled={isLoading}
              errors={errors}
              type="password"
              label="Enter password"
            />
            <div>
              <Button disabled={isLoading} fullWidth type="submit">
                {variant === "LOGIN" ? "Sign in" : "Sign up"}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute flex items-center inset-0">
                <div className="w-full border-gray-300 border-t"></div>
              </div>

              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <AuthSocialButton
                icon={BsGithub}
                onClick={() => socialActions("github")}
              />

              <AuthSocialButton
                icon={BsGoogle}
                onClick={() => socialActions("google")}
              />
            </div>
          </div>
          <div
            className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
          >
            <div>
              {variant === "LOGIN"
                ? "New to Messenger?"
                : "Already have an account?"}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
