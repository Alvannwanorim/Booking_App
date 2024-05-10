import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const FormError = ({ message }: { message: string | undefined }) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 flex items-center gap-x-2 text-sm text-destructive p-3">
      <FaExclamationTriangle />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
