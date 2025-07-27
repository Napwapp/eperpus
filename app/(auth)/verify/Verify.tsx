"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { showAlert } from "@/components/ui/toast";
import LoaderSpinner from "@/components/ui/loader-spinner";
import Link from "next/link";

export default function EmailVerificationPage() {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [showResendButton, setShowResendButton] = useState(false);

  // Tampilkan pesan success dari localStorage
  useEffect(() => {
    const successMessage = localStorage.getItem("successMessage");
    if (successMessage) {
      showAlert({ message: successMessage, type: "success" });
      // Hapus pesan dari localStorage setelah ditampilkan
      localStorage.removeItem("successMessage");
    }
  }, []);

  // Ambil email dari localStorage saat pertama kali load
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (!storedEmail) {
      showAlert({
        message: "Email tidak ditemukan. Silakan daftar ulang.",
        type: "error",
      });
      router.push("/register");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const handleVerify = async () => {
    const otpCode = code.join("");

    if (otpCode.length !== 6 || !email) {
      showAlert({ message: "Kode OTP atau email tidak valid", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otpCode }),
      });

      const result = await res.json();

      if (!res.ok) {
        // Jika error expired, tampilkan tombol resend
        if (result.error && result.error.includes("expired")) {
          setShowResendButton(true);
        }
        showAlert({
          message: result.error || "Verifikasi gagal",
          type: "error",
        });
        return;
      }

      localStorage.setItem("successMessage", result.message || "Verifikasi berhasil, silakan login.");
      router.push("/login");
      localStorage.removeItem("userEmail");

    } catch (error) {
      showAlert({
        message: "Terjadi kesalahan saat verifikasi.",
        type: "error",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      showAlert({
        message: "Kode OTP telah dikirim lagi, mohon periksa kembali email anda.",
        type: "success",
      });
      // Sembunyikan tombol resend setelah berhasil
      setShowResendButton(false);
    } else {
      showAlert({ message: "Terjadi kesalahan saat mengirim kode OTP.", type: "error" });
    }
    setResendLoading(false);
  };

  const handleInputChange = (index: number, value: string): void => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto focus ke input berikutnya
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace untuk kembali ke input sebelumnya
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste untuk inputan 6 digit
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^[0-9]+$/.test(pastedData)) {
      const newCode = [...code];
      for (let i = 0; i < pastedData.length && i < 6; i++) {
        newCode[i] = pastedData[i];
      }
      setCode(newCode);

      // Focus ke input terakhir yang diisi atau input berikutnya
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/register"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali
          </Link>

          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Verifikasi Email
          </h1>
          <p className="text-white/80 text-base sm:text-lg">
            Masukkan kode 6 digit yang telah dikirim ke
          </p>
          <p className="text-white font-medium">example@email.com</p>
        </div>

        {/* Verification Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 sm:p-6 md:p-8 shadow-2xl border border-white/20">
          <div className="space-y-6">
            {/* Code Input */}
            <div>
              <label className="block text-white font-medium mb-4 text-center">
                Kode Verifikasi
              </label>
              <div className="flex justify-center space-x-1 sm:space-x-2 md:space-x-3">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el: HTMLInputElement | null) => {
                      if (el) {
                        inputRefs.current[index] = el;
                      }
                    }}
                    type="text"
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-9 h-10 sm:w-10 sm:h-12 md:w-13 md:h-14 text-lg sm:text-xl md:text-2xl font-bold text-violet-700 text-center bg-white rounded-md border-2 border-transparent focus:border-violet-400 focus:outline-none focus:ring-4 focus:ring-violet-200/30 transition-all duration-200 shadow-lg"
                    maxLength={1}
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-fit min-w-[200px] mx-auto block sm:w-full bg-white text-violet-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-200 shadow-lg text-base sm:text-lg"
            >
              {loading ? (
                <span className="inline-flex items-center justify-center gap-2">
                  Loading
                  <LoaderSpinner />
                </span>
              ) : (
                "Verifikasi Kode"
              )}
            </button>

            {/* Resend Section */}
              {showResendButton && (
            <div className="text-center space-y-3">
              <p className="text-white/80">Tidak menerima kode?</p>
                <Button
                  onClick={handleResendOtp}
                  className="text-white font-medium hover:text-white/80 transition-colors"
                >
                  {resendLoading ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      Loading
                      <LoaderSpinner />
                    </span>
                  ) : (
                    "Kirim Ulang Kode"
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            Periksa folder spam jika tidak menemukan email
          </p>
        </div>
      </div>
    </div>
  );
}
