// file: validations/userSchema.ts
import { z } from "zod";

export const registerUserSchema = z.object({
  name: z
    .string()
    .nonempty("Nama wajib diisi")
    .min(5, "Nama minimal 5 karakter")
    .max(100, "Nama maksimal 100 karakter"),

  email: z
    .string()
    .nonempty("Email wajib diisi")
    .email("Format email tidak valid")
    .regex(/@gmail\.com$/, "Email harus menggunakan domain @gmail.com"),

  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(25, "Password maksimal 25 karakter"),

  nohp: z
    .string()
    .nonempty("Nomor HP wajib diisi")
    .min(11, "Nomor HP minimal 11 digit")
    .max(13, "Nomor HP maksimal 13 digit")
    .regex(
      /^08[0-9]+$/,
      "Masukkan format nomor HP yang valid"
    ),

  alamat: z
    .string()
    .nonempty("Alamat wajib diisi")
    .min(20, "Alamat minimal 20 karakter"),

  kelamin: z.enum(["Laki-laki", "Perempuan"]),
});

// Schema khusus untuk login
export const loginUserSchema = z.object({
  email: z
    .string()
    .nonempty("Email wajib diisi")
    .email("Format email tidak valid"),

  password: z
    .string()
    .nonempty("Password wajib diisi")
    .min(1, "Password wajib diisi"),
});
