import { Field, ErrorMessage } from "formik";

export const FormField = ({ name, placeholder, type, value }: any) => (
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
