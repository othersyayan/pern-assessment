"use client";

import * as Yup from "yup";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
// react / next
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
// components
import Toast from "@/components/toast";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
//
import { HOST_API } from "@/config-global";

// ----------------------------------------------------------------------

export default function AuthRegisterView() {
  const router = useRouter();

  const [showToast, setShowToast] = useState(false);

  const [toastType, setToastType] = useState<"success" | "error" | "default">(
    "default"
  );

  const [message, setMessage] = useState("Default toast");

  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
  });

  const defaultValues = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (formValue) => {
    try {
      const { status } = await axios.post(`${HOST_API}/register`, formValue);

      if (status === 201) {
        setToastType("success");
        setMessage("Your data is success registered, please login first!");

        window.location.replace("/auth/login");
      }
    } catch (error) {
      setToastType("error");

      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data.message
            ? error.response.data.message
            : error.response?.data
        );
      } else {
        setMessage(error as string);
      }
    } finally {
      reset();
      handleShowToast();
    }
  });

  const handleShowToast = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <div className="form-wrapper">
        <h3 className="text-xl font-bold mb-6 ">Register</h3>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="flex flex-col gap-6">
            <RHFTextField
              name="username"
              type="text"
              variant="medium"
              disabled={isSubmitting}
              placeholder="Create username"
            />
            <RHFTextField
              name="password"
              type="password"
              variant="medium"
              disabled={isSubmitting}
              placeholder="Create password"
            />
            <RHFTextField
              name="confirmPassword"
              type="password"
              variant="medium"
              disabled={isSubmitting}
              placeholder="Confirm password"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#62CCCD] hover:from-[#62CCCD]/85 to-[#4599DB] hover:to-[#4599DB]/85 py-3 px-8 rounded-lg text-sm inline-flex items-center leading-6 justify-center disabled:from-[#62CCCD]/70 disabled:to-[#4599DB]/70 disabled:text-white/70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin mr-3 h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 25 25"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </FormProvider>
      </div>

      <p className="text-sm inline-flex items-center justify-center gap-2">
        <span>Have an account?</span>
        <span
          className="text-transparent bg-clip-text bg-gradient-to-tr from-[#D5BE88] via-[#F3EDA6] to-[#94783E] border-b border-[#D5BE88] cursor-pointer hover:opacity-85"
          onClick={() => router.push("/auth/login")}
        >
          Login here
        </span>
      </p>

      {showToast && <Toast type={toastType} message={message} />}
    </div>
  );
}
