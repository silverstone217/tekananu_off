"use client";
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  value: string;
  disabled: boolean;
  className?: string;
};

const RadioComponent = ({
  options,
  onChange,
  value,
  disabled,
  className,
}: Props) => {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      disabled={disabled}
      className={className}
    >
      {options.map((option) => (
        <RadioGroupItem key={option.value} value={option.value}>
          {option.label}
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
};

export default RadioComponent;
