import { Field, ErrorMessage } from "formik";

export const FormField = ({ name, placeholder, type }: any) => (
  <>
    <Field type={type} name={name} placeholder={placeholder} />
    <ErrorMessage name={name} component="p" className="form-error" />
  </>
);
