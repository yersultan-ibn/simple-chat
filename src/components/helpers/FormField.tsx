import { Field, ErrorMessage } from "formik";
import { FormFieldProps } from "../../types";

export const FormField: React.FC<FormFieldProps> = ({
  name,
  placeholder,
  type,
  value,
}) => (
  <>
    {name === "usernamecode" ? (
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        readOnly
      />
    ) : (
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={value}
      />
    )}
    <ErrorMessage name={name} component="p" className="form-error" />
  </>
);
