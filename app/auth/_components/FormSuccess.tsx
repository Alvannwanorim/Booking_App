import { CheckCircleIcon } from "lucide-react";
import React from "react";

const FormSuccess = ({ message }: { message: string | undefined }) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 flex items-center gap-x-2 text-sm text-emerald-500 p-3">
      <CheckCircleIcon />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
