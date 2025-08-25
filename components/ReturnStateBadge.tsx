"use client";
import { State_Data, StateValuesType } from "@/utils/productData";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { capitalize, returnLabelByValue } from "@/utils/functions";

type Props = {
  state: StateValuesType;
};

const ReturnStateBadge = ({ state }: Props) => {
  return (
    <Badge
      variant={
        state === "mauvais"
          ? "destructive"
          : state === "nouveau"
          ? "default"
          : "secondary"
      }
    >
      <span className="text-[10px]">
        {capitalize(returnLabelByValue(state, State_Data))}
      </span>
    </Badge>
  );
};

export default ReturnStateBadge;
