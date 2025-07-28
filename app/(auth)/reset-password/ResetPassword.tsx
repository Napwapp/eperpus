"use client";

import LoaderSpinner from "@/components/ui/loader-spinner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { showAlert } from "@/components/ui/toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordEmailSchema,
  resetPasswordNewPasswordSchema,
} from "@/validations/userSchema";
import { z } from "zod";
import { CheckCircle } from "lucide-react";
import { BackButton } from "@/app/(auth)/login/Login";

type EmailFormData = z.infer<typeof resetPasswordEmailSchema>;
type PasswordFormData = z.infer<typeof resetPasswordNewPasswordSchema>;

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  // Form untuk step 1 (email)
  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(resetPasswordEmailSchema),
    mode: "onChange",
  });

  // Form untuk step 2 (password)
  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(resetPasswordNewPasswordSchema),
    mode: "onChange",
  });

  // Check for success message from localStorage on component mount
  useEffect(() => {
    const successMessage = localStorage.getItem("successMessage");
    if (successMessage) {
      showAlert({ message: successMessage, type: "success" });
      localStorage.removeItem("successMessage");
    }
  }, []);

  // Handle email submission (Step 1)
  const handleEmailSubmit = async (data: EmailFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (!response.success) {
        showAlert({ message: response.error, type: "error" });
        return;
      }

      setUserEmail(data.email);
      setStep(2);
      showAlert({
        message: "Email ditemukan! Silakan masukkan password baru Anda.",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      showAlert({
        message: "Terjadi kesalahan, silakan coba lagi.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Update password (Step 2)
  const handlePasswordSubmit = async (data: PasswordFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          email: userEmail,
        }),
      });

      const response = await res.json();

      if (!response.success) {
        showAlert({ message: response.error, type: "error" });
        return;
      }

      localStorage.setItem(
        "successMessage",
        "Password berhasil di update! Silahkan login kembali"
      );
      router.push("/login");
    } catch (err) {
      console.error(err);
      showAlert({
        message: "Terjadi kesalahan, silakan coba lagi.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  //   Step
  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
            step >= 1
              ? step > 1
                ? "bg-violet-600 border-violet-600 text-white"
                : "border-violet-600 text-violet-600"
              : "border-gray-300 text-gray-500"
          }`}
        >
          {step > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
        </div>
        <div
          className={`w-12 h-0.5 ${
            step >= 2 ? "bg-violet-600" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
            step >= 2
              ? step > 2
                ? "bg-violet-600 border-violet-600 text-white"
                : "border-violet-600 text-violet-600"
              : "border-gray-300 text-gray-500"
          }`}
        >
          {step > 2 ? <CheckCircle className="w-5 h-5" /> : "2"}
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)}>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="text-sm font-medium text-gray-700 mb-2 block"
        >
          Email
        </label>
        <input
          type="email"
          placeholder="Masukkan email Anda"
          className={`w-full rounded-md border px-5 py-3 text-base outline-none transition ${
            emailForm.formState.errors.email
              ? "border-red-500 focus:border-red-500"
              : "border-stroke focus:border-violet-600"
          } bg-transparent text-body-color dark:border-dark-3 dark:text-white`}
          {...emailForm.register("email")}
        />
        {emailForm.formState.errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {emailForm.formState.errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer rounded-md border border-violet-600 bg-violet-600 px-5 py-3 text-base font-medium text-white transition hover:bg-violet-700 disabled:opacity-50"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <span>Loading</span>
            <LoaderSpinner />
          </div>
        ) : (
          "Lanjutkan"
        )}
      </button>
    </form>
  );

  const renderStep2 = () => (
    <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}>
      <div className="mb-6">
        <label
          htmlFor="newPassword"
          className="text-sm font-medium text-gray-700 mb-2 block"
        >
          Password Baru
        </label>
        <input
          type="password"
          placeholder="Masukkan password baru"
          className={`w-full rounded-md border px-5 py-3 text-base outline-none transition ${
            passwordForm.formState.errors.newPassword
              ? "border-red-500 focus:border-red-500"
              : "border-stroke focus:border-violet-600"
          } bg-transparent text-body-color dark:border-dark-3 dark:text-white`}
          {...passwordForm.register("newPassword")}
        />
        {passwordForm.formState.errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">
            {passwordForm.formState.errors.newPassword.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-gray-700 mb-2 block"
        >
          Konfirmasi Password
        </label>
        <input
          type="password"
          placeholder="Konfirmasi password baru"
          className={`w-full rounded-md border px-5 py-3 text-base outline-none transition ${
            passwordForm.formState.errors.confirmPassword
              ? "border-red-500 focus:border-red-500"
              : "border-stroke focus:border-violet-600"
          } bg-transparent text-body-color dark:border-dark-3 dark:text-white`}
          {...passwordForm.register("confirmPassword")}
        />
        {passwordForm.formState.errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {passwordForm.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer rounded-md border border-violet-600 bg-violet-600 px-5 py-3 text-base font-medium text-white transition hover:bg-violet-700 disabled:opacity-50"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <span>Loading</span>
            <LoaderSpinner />
          </div>
        ) : (
          "Reset Password"
        )}
      </button>
    </form>
  );

  return (
    <>
      <BackButton />

      <section className="bg-gray-1 min-h-screen flex items-center justify-center dark:bg-dark py-8 sm:py-20 lg:py-[120px]">
        <div className="container mx-auto px-2 relative">
          <div className="flex justify-center items-center">
            <div className="w-full">
              <div className="relative mx-auto w-full max-w-xs sm:max-w-md md:max-w-[525px] overflow-hidden rounded-lg bg-white px-4 sm:px-8 md:px-12 py-10 sm:py-16 dark:bg-dark-2">
                <div className="mb-10 text-center md:mb-16">
                  <h1 className="text-2xl font-bold text-gray-700 mb-4">
                    Reset Password
                  </h1>
                  <p className="text-gray-600 text-sm">
                    {step === 1
                      ? "Masukkan email Anda untuk memulai proses reset password"
                      : "Masukkan password baru Anda"}
                  </p>
                </div>

                {renderStepIndicator()}

                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}

                {step === 2 && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setStep(1)}
                      className="text-violet-600 hover:text-violet-700 text-sm underline"
                    >
                      Kembali ke langkah sebelumnya
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
