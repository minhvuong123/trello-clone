"use client"

import { KeyboardEventHandler, forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";
import { Textarea } from "../ui/textarea";

interface FormTextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(({
  id,
  label,
  placeholder,
  required,
  disabled,
  errors,
  className,
  defaultValue = "",
  onBlur,
  onClick,
  onKeyDown
}, ref) => {
  const { pending } = useFormStatus();

  return (
    <div className="space-y-2 w-full">
      <div className="space-y-1 w-full">
        {
          label ? (
            <Label htmlFor={id} className="text-xs font-semibold text-neutral-700">
              {label}
            </Label>
          ) : null
        }
        <Textarea 
          onBlur={onBlur}
          onClick={onClick}
          onKeyDown={onKeyDown}
          defaultValue={defaultValue}
          ref={ref}
          required={required}
          name={id}
          id={id}
          placeholder={placeholder} 
          disabled={pending || disabled}
          className={cn(
            "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
            className
          )}
          aria-describedby={`${id}-error`}
        />
        <FormErrors id={id} errors={errors} />
      </div>
    </div>
  )
})

FormTextarea.displayName = "FormTextarea";