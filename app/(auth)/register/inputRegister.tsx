import React from "react";
import { cn } from "@/lib/utils";

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const InputBox = React.memo(({ 
  type, 
  placeholder, 
  name, 
  error,
  className = "",
  ...rest 
}: InputBoxProps) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className={`w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-violet-600 focus-visible:shadow-none dark:border-dark-3 dark:text-white ${className}`}
        {...rest}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
});

InputBox.displayName = "InputBox";

// Komponen Input untuk kompatibilitas dengan sidebar dan komponen lain
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input };
export default InputBox;