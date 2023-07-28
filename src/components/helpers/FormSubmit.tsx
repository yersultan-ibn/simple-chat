import React from "react";

interface FormSubmitProps {
  buttonText: string;
  isSubmitting: boolean; // Add the isSubmitting prop
}

export const FormSubmit: React.FC<FormSubmitProps> = ({ buttonText, isSubmitting }) => (
  <button type="submit" className={`btn-block ${isSubmitting ? "sending" : ""}`}>
    {buttonText}
  </button>
);
