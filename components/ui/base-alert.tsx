"use client";

import { AlertCircle, CheckCircle, Info, X, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface BaseAlertProps {
  type?: "success" | "error" | "warning" | "info";
  message: string;
  show?: boolean;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export default function BaseAlert({
  type = "info",
  message,
  show = true,
  onClose,
  autoClose = false,
  duration = 5000,
}: BaseAlertProps) {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, isVisible, onClose]);

  const getAlertStyles = () => {
    switch (type) {
      case "success":
        return {
          container: "bg-green-50 border-green-200 text-green-800",
          icon: CheckCircle,
          iconColor: "text-green-500",
        };
      case "error":
        return {
          container: "bg-red-50 border-red-200 text-red-800",
          icon: XCircle,
          iconColor: "text-red-500",
        };
      case "warning":
        return {
          container: "bg-yellow-50 border-yellow-200 text-yellow-800",
          icon: AlertCircle,
          iconColor: "text-yellow-500",
        };
      case "info":
      default:
        return {
          container: "bg-blue-50 border-blue-200 text-blue-800",
          icon: Info,
          iconColor: "text-blue-500",
        };
    }
  };

  const styles = getAlertStyles();
  const IconComponent = styles.icon;

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 flex items-center p-4 border rounded-lg shadow-lg max-w-sm ${styles.container}`}
      role="alert"
    >
      <IconComponent className={`w-5 h-5 mr-3 ${styles.iconColor}`} />
      <span className="text-sm font-medium">{message}</span>
      {onClose && (
        <button
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className="ml-5 -mx-1.5 -my-1.5 p-1.5"
        >          
          <X className="w-6 h-6 text-red-500 cursor-pointer" />
        </button>
      )}
    </div>
  );
}
