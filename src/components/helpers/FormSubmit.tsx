import React from "react";

interface FormSubmitProps {
  buttonText: string;
  isSubmitting?: boolean; // Add the isSubmitting prop
  buttonStyles?: string;
  onClick? : () => void
}

export const FormSubmit: React.FC<FormSubmitProps> = ({
  buttonText,
  isSubmitting,
  buttonStyles,
  onClick
}) => (
  <button
    type="submit"
    className={`${buttonStyles} btn-block ${isSubmitting ? "sending" : ""}`}
    onClick={onClick}
  >
    {buttonText}
  </button>
);
