"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserSchema } from "@/validations/userSchema";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BackButton } from "../login/Login";
import { useCallback, useState } from "react";
import InputBox from "./inputRegister";
import LoaderSpinner from "@/components/ui/loader-spinner";

type RegisterFormData = z.infer<typeof registerUserSchema>;

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerUserSchema),
    mode: "onChange",
  });

  const onSubmit = useCallback(
    async (data: RegisterFormData) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/auth/signup`, {
          method: "POST",
          body: JSON.stringify(data),
        });
        const response = await res.json();
        if (!response.success) {
          toast.error(response.error);
          setLoading(false);
          return;
        }

        // Panggil send-otp
        const otpRes = await fetch(`/api/auth/send-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: response.email }),
        });

        const otpResponse = await otpRes.json();
        if (!otpResponse.success) {
          toast.error(otpResponse.error);
          setLoading(false);
          return;
        }

        localStorage.setItem("userEmail", response.email);
        localStorage.setItem(
          "successMessage",
          "Registrasi Berhasil,kami telah mengirimkan kode OTP ke email anda. Mohon perika email anda."
        );
        router.push("/verify");
      } catch (err) {
        toast.error("Terjadi kesalahan, silakan coba lagi.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const handlePhoneInput = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
    },
    []
  );

  return (
    <>
      <BackButton />

      <section className="bg-gray-1 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-2 rounded-md">
          <div className="flex justify-center items-center">
            <div className="w-full">
              <div className="relative mx-auto w-full max-w-xs sm:max-w-md md:max-w-[525px] overflow-hidden rounded-lg bg-white px-4 sm:px-8 md:px-12 py-10 sm:py-16">
                <div className="mb-10 text-center md:mb-12">
                  <h1 className="text-2xl font-bold text-gray-700 mb-4">
                    Daftar Akun Baru
                  </h1>
                  <div className="flex justify-center items-center flex-row">
                    <Image
                      src="/eperpus.svg"
                      alt="Logo ePerpus"
                      width={80}
                      height={80}
                      className="w-10 h-10 md:w-25 md:h-25 object-contain"
                      priority
                    />
                    <h2 className="text-3xl font-bold text-violet-700">
                      ePerpus
                    </h2>
                  </div>
                </div>

                {/* Form Register */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label
                    htmlFor="nama"
                    className="text-sm font-medium text-gray-700 mb-2 mt-4 block"
                  >
                    Nama
                  </label>
                  <InputBox
                    type="text"
                    placeholder="Nama lengkap"
                    error={errors.name?.message}
                    {...register("name")}                    
                  />

                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 mb-2 mt-4 block"
                  >
                    Email
                  </label>
                  <InputBox
                    type="email"
                    placeholder="Email"
                    error={errors.email?.message}
                    {...register("email")}                    
                  />

                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700 mb-2 mt-4 block"
                  >
                    Password
                  </label>
                  <InputBox
                    type="password"
                    placeholder="Password"
                    error={errors.password?.message}
                    {...register("password")}                    
                  />

                  <label
                    htmlFor="nohp"
                    className="text-sm font-medium text-gray-700 mb-2 mt-4 block"
                  >
                    Nomor HP
                  </label>
                  <InputBox
                    type="tel"
                    placeholder="Nomor HP"
                    error={errors.nohp?.message}
                    {...register("nohp")}                    
                    onInput={handlePhoneInput}
                  />

                  <label
                    htmlFor="alamat"
                    className="text-sm font-medium text-gray-700 mb-2 mt-4 block"
                  >
                    Alamat
                  </label>
                  <div className="mb-4">
                    <textarea
                      placeholder="Alamat lengkap"
                      className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-violet-600 focus-visible:shadow-none text-gray-700"
                      rows={2}
                      {...register("alamat")}
                    />
                    {errors.alamat && (
                      <p className="text-red-500 text-sm">
                        {errors.alamat.message}
                      </p>
                    )}
                  </div>

                  <label className="text-sm font-medium text-gray-700 mb-2 mt-4 block">
                    Pilih Jenis Kelamin
                  </label>
                  <div className="flex gap-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="Laki-laki"
                        className="accent-violet-600"
                        {...register("kelamin")}
                      />
                      <span className="ml-2 text-gray-700">Laki-laki</span>
                    </label>

                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="Perempuan"
                        className="accent-violet-600"
                        {...register("kelamin")}
                      />
                      <span className="ml-2 text-gray-700">Perempuan</span>
                    </label>
                  </div>
                  {errors.kelamin && (
                    <p className="text-red-500 text-sm mt-2 mb-6">
                      {errors.kelamin.message}
                    </p>
                  )}

                  <div className="mb-5">
                    <Button
                      type="submit"
                      className="w-full cursor-pointer mt-6 rounded-md border border-violet-600 bg-violet-600 px-5 py-3 text-base font-medium text-white transition hover:bg-violet-700"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="inline-flex items-center justify-center gap-2">
                          Loading
                          <LoaderSpinner />
                        </span>
                      ) : (
                        "Daftar"
                      )}
                    </Button>
                  </div>
                </form>

                <div className="flex justify-center items-center">
                  <p>
                    <Link
                      href="/login"
                      className="text-base text-violet-600 hover:text-violet-700 hover:underline hover:underline-offset-4"
                    >
                      Sudah mempunyai akun? Masuk disini
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
