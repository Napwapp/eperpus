"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import LoaderSpinner from "@/components/ui/loader-spinner";
import { showAlert } from "@/components/ui/toast";
import { registerUserSchema } from "@/validations/userSchema";
import { EditProfileSheetProps } from "@/lib/types/user";
import { z } from "zod";

// Tipe data untuk form edit profile (tanpa password)
type EditProfileFormData = Omit<z.infer<typeof registerUserSchema>, 'password'>;

export default function EditProfileSheet({ user }: EditProfileSheetProps) {
  const [loading, setLoading] = useState(false);

  // Nilai default untuk form
  const defaultValues = useMemo(() => ({
    name: user.name,
    email: user.email,
    nohp: user.nomorHp || "",
    alamat: user.alamat || "",
    kelamin: user.gender === "laki_laki" ? "Laki-laki" : 
             user.gender === "perempuan" ? "Perempuan" : "Laki-laki",
  }), [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(registerUserSchema.omit({ password: true })),
    mode: "onChange",
    defaultValues: {
      name: user.name,
      email: user.email,
      nohp: user.nomorHp || "",
      alamat: user.alamat || "",
      kelamin: user.gender === "laki_laki" ? "Laki-laki" : 
               user.gender === "perempuan" ? "Perempuan" : "Laki-laki",
    },
  });

  // Memantau nilai form saat ini
  const currentValues = watch();
  
  // Cek apakah ada perubahan pada form
  const hasChanges = useMemo(() => {
    return (
      currentValues.name !== defaultValues.name ||
      currentValues.email !== defaultValues.email ||
      currentValues.nohp !== defaultValues.nohp ||
      currentValues.alamat !== defaultValues.alamat ||
      currentValues.kelamin !== defaultValues.kelamin
    );
  }, [currentValues, defaultValues]);

  const onSubmit = useCallback(
    async (data: EditProfileFormData) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/user/update-profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user.id,
            name: data.name,
            email: data.email,
            nomorHp: data.nohp,
            alamat: data.alamat,
            gender: data.kelamin === "Laki-laki" ? "laki_laki" : "perempuan",
          }),
        });

        const response = await res.json();
        
        if (!response.success) {
          showAlert({ message: response.error || "Terjadi kesalahan saat memperbarui profil", type: "error" });
          setLoading(false);
          return;
        }

        showAlert({ message: "Profil berhasil diperbarui", type: "success" });
        setLoading(false);
        // Optionally refresh the page or update the parent component
        window.location.reload();
      } catch (err) {
        showAlert({ message: "Terjadi kesalahan, silakan coba lagi.", type: "error" });
        console.log(err);
        setLoading(false);
      }
    },
    [user.id]
  );

  const handlePhoneInput = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
    },
    []
  );

  return (
    <>
      <SheetHeader>
        <SheetTitle>Edit Profile</SheetTitle>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nama
            </Label>
            <Input
              type="text"
              placeholder="Nama lengkap"
              className="mt-1"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              type="email"
              placeholder="Email"
              className="mt-1"
              {...register("email")}
              disabled
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="nohp" className="text-sm font-medium text-gray-700">
              Nomor HP
            </Label>
            <Input
              type="tel"
              placeholder="Nomor HP"
              className="mt-1"
              {...register("nohp")}
              onInput={handlePhoneInput}
            />
            {errors.nohp && (
              <p className="text-red-500 text-sm mt-1">{errors.nohp.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="alamat" className="text-sm font-medium text-gray-700">
              Alamat
            </Label>
            <textarea
              placeholder="Alamat lengkap"
              className="w-full rounded-md border border-stroke bg-transparent px-3 py-2 text-base outline-none focus:border-violet-600 focus-visible:shadow-none"
              rows={3}
              {...register("alamat")}
            />
            {errors.alamat && (
              <p className="text-red-500 text-sm mt-1">{errors.alamat.message}</p>
            )}
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">
              Pilih Jenis Kelamin
            </Label>
            <div className="flex gap-6 mt-2">
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
              <p className="text-red-500 text-sm mt-1">{errors.kelamin.message}</p>
            )}
          </div>
        </form>
      </div>

      <SheetFooter className="p-6">
        <Button
          type="submit"
          className={`w-full ${
            !hasChanges 
              ? 'bg-violet-400 text-white cursor-not-allowed opacity-60' 
              : 'bg-violet-600 hover:bg-violet-700'
          }`}
          disabled={loading || !hasChanges}
          onClick={handleSubmit(onSubmit)}
        >
          {loading ? (
            <span className="inline-flex items-center justify-center gap-2">
              Menyimpan
              <LoaderSpinner />
            </span>
          ) : (
            "Simpan Perubahan"
          )}
        </Button>
      </SheetFooter>
    </>
  );
} 