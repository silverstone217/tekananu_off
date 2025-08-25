"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  value: string;
  disabled: boolean;
  className?: string;
  placeholder: string;
  required?: boolean;
};

const SelectOptions = ({
  options,
  onChange,
  value,
  disabled,
  className,
  placeholder,
  required = false,
}: Props) => {
  return (
    <Select
      value={value}
      onValueChange={onChange}
      disabled={disabled}
      required={required}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={className}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectOptions;
