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
  currency: string;
  onChange: (currency: string) => void;
  disabled: boolean;
  className?: string;
  required?: boolean;
};

const SelectCurrency = ({
  currency,
  onChange,
  disabled,
  className,
  required = false,
}: Props) => {
  return (
    <Select
      value={currency}
      onValueChange={onChange}
      disabled={disabled}
      required={required}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Sélectionnez votre devise" />
      </SelectTrigger>
      <SelectContent className={` ${className}`}>
        <SelectItem value="USD">USD</SelectItem>
        <SelectItem value="CDF">CDF</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectCurrency;
