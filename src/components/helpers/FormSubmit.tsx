interface FormSubmitProps {
  buttonText: string;
}

export const FormSubmit: React.FC<FormSubmitProps> = ({ buttonText }) => (
  <button type="submit" className="opacity">
    {buttonText}
  </button>
);
