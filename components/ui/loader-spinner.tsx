import React from "react";

interface LoaderSpinnerProps {
  className?: string;
}

export default function LoaderSpinner({ className = "" }: LoaderSpinnerProps) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <span className="animate-spin rounded-full w-5 h-5 border-t-2 border-b-2 border-white"></span>
    </span>
  );
}