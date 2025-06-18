import { useState } from "react";
import { cn } from "@/libs/utils";

interface OTPInputProps {
  length?: number;
  onChange?: (value: string) => void;
}

export const OTPInput = ({ length = 6, onChange }: OTPInputProps) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newValues = [...values];
    newValues[index] = value.slice(-1);
    setValues(newValues);
    onChange?.(newValues.join(""));

    if (value && index < length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(pasted)) return;
    const newValues = pasted
      .split("")
      .concat(Array(length - pasted.length).fill(""));
    setValues(newValues);
    onChange?.(newValues.join(""));
  };

  return (
    <div className="flex gap-2 justify-center items-center">
      {values.map((value, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onPaste={handlePaste}
          maxLength={1}
          className={cn(
            "h-10 w-10 text-center rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          )}
        />
      ))}
    </div>
  );
};
OTPInput.displayName = "OTPInput";
