# Perbaikan Type Safety pada Middleware Role

## Masalah yang Diperbaiki

Sebelumnya, file `middlewares/errorHandler.ts` menggunakan tipe `any` untuk parameter token, yang menyebabkan error TypeScript dan kurangnya type safety.

## Perubahan yang Dilakukan

### 1. File `middlewares/errorHandler.ts`

**Sebelum:**
```typescript
export function validateToken(token: any): boolean {
  // ...
}

export function getRoleFromToken(token: any): string | null {
  // ...
}
```

**Sesudah:**
```typescript
import { JWT } from "next-auth/jwt";
import { Role } from "@/lib/generated/prisma";

export function validateToken(token: JWT | null): boolean {
  if (!token) return false;
  
  // Cek apakah token memiliki properti yang diperlukan
  if (!token.email || !token.role) return false;
  
  // Cek apakah role valid
  const validRoles: Role[] = ["user", "admin", "superadmin"];
  if (!validRoles.includes(token.role as Role)) return false;
  
  return true;
}

export function getRoleFromToken(token: JWT | null): Role | null {
  if (!validateToken(token) || !token) return null;
  return token.role as Role;
}
```

### 2. File `middlewares/roleMiddleware.ts`

**Sebelum:**
```typescript
export type UserRole = keyof typeof ROLE_ACCESS;
```

**Sesudah:**
```typescript
import { Role } from "@/lib/generated/prisma";
export type UserRole = Role;
```

### 3. File `middlewares/superadminMiddleware.ts`

**Sebelum:**
```typescript
export function isSuperAdmin(role: string): boolean {
  return role === "superadmin";
}
```

**Sesudah:**
```typescript
import { Role } from "@/lib/generated/prisma";

export function isSuperAdmin(role: Role): boolean {
  return role === "superadmin";
}
```

### 4. File `components/ui/error-message-handler.tsx`

**Sebelum:**
```typescript
let alertType: "success" | "error" | "warning" | "info" = "error";
```

**Sesudah:**
```typescript
import { showAlert, AlertType } from "./toast";

let alertType: AlertType = "error";
```

## Tipe yang Digunakan

### 1. JWT Token
```typescript
import { JWT } from "next-auth/jwt";

interface JWT {
  id: string;
  email: string;
  name: string;
  role: Role;
  nomorHp: string;
  alamat: string;
  gender: Gender;
  createdAt: string;
  updatedAt: string;
}
```

### 2. Role Enum
```typescript
import { Role } from "@/lib/generated/prisma";

enum Role {
  user = "user",
  admin = "admin", 
  superadmin = "superadmin"
}
```

### 3. AlertType
```typescript
import { AlertType } from "@/components/ui/toast";

type AlertType = "success" | "error" | "info" | "loading";
```

## Keuntungan Perubahan

1. **Type Safety**: Tidak ada lagi tipe `any`, semua parameter memiliki tipe yang spesifik
2. **IntelliSense**: IDE akan memberikan autocomplete dan error checking yang lebih baik
3. **Runtime Safety**: Mengurangi kemungkinan error runtime karena tipe yang salah
4. **Maintainability**: Kode lebih mudah dipahami dan di-maintain
5. **Consistency**: Menggunakan tipe yang konsisten di seluruh aplikasi

## File yang Terpengaruh

- `middlewares/errorHandler.ts` - Perbaikan tipe token
- `middlewares/roleMiddleware.ts` - Perbaikan tipe role
- `middlewares/superadminMiddleware.ts` - Perbaikan tipe role
- `components/ui/error-message-handler.tsx` - Perbaikan tipe alert
- `components/ui/access-denied-alert.tsx` - Menggunakan showAlert dari toast

## Testing

Setelah perubahan ini, semua fungsi middleware akan memiliki type safety yang lebih baik dan tidak akan ada lagi error TypeScript terkait tipe `any`. 