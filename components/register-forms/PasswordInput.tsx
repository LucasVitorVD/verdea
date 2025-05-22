"use client";

import { Eye, EyeClosed } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface PasswordInputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  register: UseFormRegister<T>;
}

export default function PasswordInput<T extends FieldValues>({
  register,
  name,
  ...props
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type={showPassword ? "text" : "password"}
        {...props}
        {...register(name ?? "")}
      />
      <Button
        type="button"
        variant="ghost"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <Eye /> : <EyeClosed />}
      </Button>
    </div>
  );
}
