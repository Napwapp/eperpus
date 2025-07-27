"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { showAlert } from "@/components/ui/toast";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { loginUserSchema } from "@/validations/userSchema";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import BaseAlert from "@/components/ui/base-alert";
import Image from "next/image";
import Link from "next/link";
import LoaderSpinner from "@/components/ui/loader-spinner";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [showUnauthorizedAlert, setShowUnauthorizedAlert] = useState(false);

  // Pesan localStorage dari Verify
  useEffect(() => {
    const message = localStorage.getItem("successMessage");
    if (message) {
      showAlert({ message, type: "success" });
      localStorage.removeItem("successMessage");
    }

    const queryMessage = searchParams.get("message");
    if (queryMessage) {
      showAlert({ message: decodeURIComponent(queryMessage), type: "success" });
      router.replace("/login");
    }
  }, [router, searchParams]);

  // Cek query param unauthorized untuk menampilkan alert jika user belum login
  useEffect(() => {
    const isUnauthorized = searchParams.get("unauthorized");
    if (isUnauthorized && !sessionStorage.getItem("unauthorized-alert-shown")) {
      setShowUnauthorizedAlert(true);
      sessionStorage.setItem("unauthorized-alert-shown", "true");
      router.replace("/login");
    }
  }, [router, searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validasi frontend
    try {
      loginUserSchema.parse({ email, password });
    } catch (error) {
      if (error && typeof error === "object" && "errors" in error) {
        const zodError = error as {
          errors: Array<{ path: string[]; message: string }>;
        };
        if (zodError.errors.length > 0) {
          showAlert({ message: zodError.errors[0].message, type: "error" });
        }
      } else {
        showAlert({ message: "Terjadi kesalahan validasi", type: "error" });
      }
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      showAlert({ message: res.error, type: "error" });
    } else {
      sessionStorage.removeItem("unauthorized-alert-shown");
      router.push("/user/home");
      localStorage.setItem("successMessage", "Berhasil login!");
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {

    setIsLoadingGoogle(true);
    const res = await signIn("google", {
      callbackUrl: "/user/home", // arahkan ke dashboard setelah login berhasil
    });
    console.log(res, "Google sign-in response");
    if (res?.error) {
      showAlert({ message: res.error, type: "error" });
      setIsLoadingGoogle(false);
    } else {
      router.push("/user/home"); // ganti ke halaman tujuanmu
      setIsLoadingGoogle(false);
    }
  };


  return (
    <>
      <BackButton />

      {showUnauthorizedAlert && (
        <BaseAlert
          type="error"
          message="Maaf, Tidak bisa mengakses halaman, kamu belum login"
          show={showUnauthorizedAlert}
          onClose={() => {
            setShowUnauthorizedAlert(false);
            sessionStorage.removeItem("unauthorized-alert-shown");
          }}
          autoClose={true}
          duration={5000}
        />
      )}
      <section className="bg-gray-1 min-h-screen flex items-center justify-center dark:bg-dark py-8 sm:py-20 lg:py-[120px]">
        <div className="container mx-auto px-2 relative">
          <div className="flex justify-center items-center">
            <div className="w-full">
              <div className="relative mx-auto w-full max-w-xs sm:max-w-md md:max-w-[525px] overflow-hidden rounded-lg bg-white px-4 sm:px-8 md:px-12 py-10 sm:py-16 dark:bg-dark-2">
                <div className="mb-10 text-center md:mb-16">
                  <h1 className="text-2xl font-bold text-gray-700 mb-4">
                    Login ke akun Anda
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

                <form onSubmit={handleSubmit}>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-600 mb-2"
                  >
                    Email
                  </label>
                  <div className="mb-6">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    />
                  </div>

                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-600 mb-2"
                  >
                    Password
                  </label>
                  <div className="mb-6">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    />
                  </div>

                  <div className="mb-5">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90 disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <p className="ml-2">Loading</p>
                          <LoaderSpinner />
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </div>
                </form>

                <p className="mb-6 text-base text-secondary-color dark:text-dark-7 text-center">
                Atau login dengan
                </p>                                

                <div className="mb-5">
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="flex items-center justify-center bg-white w-full cursor-pointer rounded-md border-2 border-primary px-5 py-3 text-base font-medium text-black transition hover:bg-gray-100 disabled:opacity-50"
                    >
                      {/* svg Google */}
                      <Image
                        src="/google.svg"
                        alt="Google"
                        width={30}
                        height={30}
                        className="mr-2"
                      />
                      {isLoadingGoogle ? (
                        <div className="flex items-center justify-center gap-2">
                          <p className="ml-2">Loading</p>
                          <LoaderSpinner />
                        </div>
                      ) : (
                        "Sign In with Google"
                      )}
                    </button>
                  </div>

                <div className="flex justify-center">
                  <p>
                    <Link
                      href="/register"
                      className="text-base text-violet-700 hover:text-violet-800 hover:underline hover:underline-offset-4"
                    >
                      Belum punya akun? Daftar disini
                    </Link>
                  </p>

                  {/* Belum bisa dipakai, karna belum ada logic nya */}                  
                  {/* <Link
                    href="/"
                    className="mb-2 inline-block text-base text-violet-700 hover:text-violet-800 hover:underline hover:underline-offset-6"
                  >
                    Forget Password?
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function BackButton() {
  return (
    <div className="absolute top-4 left-4 z-10">
      <Link href="/">
        <Button
          variant="outline"
          className="outline-violet-700 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-violet-700" />
          <span className="hidden sm:inline ml-2">Kembali ke Beranda</span>
          <span className="sm:hidden ml-2">Kembali</span>
        </Button>
      </Link>
    </div>
  );
}
