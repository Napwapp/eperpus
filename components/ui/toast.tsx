import { toast, ToastOptions } from "react-hot-toast";

export type AlertType = "success" | "error" | "info" | "loading";

interface BaseAlertProps {
  message: string;
  type?: AlertType;
  options?: ToastOptions;
  className?: string;
}

const classNames = {
  success: "text-center",
  error: "text-center",
  info: "text-center",
  loading: "text-center",
  duration: 5000,
};

/**
 * Fungsi utilitas untuk menampilkan alert berbasis react-hot-toast.
 *
 * @param message Pesan yang ingin ditampilkan
 * @param type Jenis alert: success | error | info | loading (default: success)
 * @param options Opsi tambahan dari react-hot-toast
 */

export function showAlert({ message, type = "success", options, className }: BaseAlertProps) {
  switch (type) {
    case "success":
      toast.success(message, { ...options, className: classNames[type] + " " + className, duration: classNames.duration });
      break;
    case "error":
      toast.error(message, { ...options, className: classNames[type] + " " + className, duration: classNames.duration });
      break;
    case "info":
      toast(message, { ...options, className: classNames[type] + " " + className, duration: classNames.duration });
      break;
    case "loading":
      toast.loading(message, { ...options, className: classNames[type] + " " + className, duration: classNames.duration });
      break;
    default:
      toast(message, { ...options, className: classNames[type] + " " + className, duration: classNames.duration });
  }
}

// Cara penggunaan
// import { showAlert } from "@/components/ui/base-alert";
// showAlert({ message: "Berhasil login!", type: "success" });
