import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { ThemeButtons } from "../helpers/ThemeButtons";
import { FormField } from "../helpers/FormField";
import { FormSubmit } from "../helpers/FormSubmit";
import { RequestMethodsEnum, makeRequest } from "../../tools/request";
import Swal from "sweetalert2";

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .min(3, "Code must have at least 3 characters")
    .required("Code is required"),
});

export const CheckConfirmCode: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const [showError, setShowError] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("#231f20");

  const checkConfirmationCode = async (values: { code: string }) => {
    try {
      const data = await makeRequest({
        url: "auth/sign-up/check-confirm-code",
        body: JSON.stringify({ email, code: values.code }),
        method: RequestMethodsEnum.POST,
      });
      Swal.fire("Good job!", `${data.message}`, "success");
      navigate(`/set-password?email=${email}`);
    } catch (error: any) {
      const errorMessage = error.message; // Use error.message directly
      const leftTriesCount = error.data?.leftTriesCount; // Use error.data?.leftTriesCount
      const textError = `${errorMessage} ${
        leftTriesCount !== undefined ? leftTriesCount : ""
      }`;
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${errorMessage} ${
          leftTriesCount !== undefined ? leftTriesCount : ""
        }`,
      });
      setShowError(textError);
      console.error("Ошибка при проверке доступности электронной почты", error);
    }
  };

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
  };

  return (
    <div className="signup-page" style={{ background: selectedTheme }}>
      <div className="container">
        <div className="login-container">
          <div className="circle circle-one"></div>
          <div className="form-error form-error-top">{showError}</div>
          <div className="form-container">
            <img
              src="https://nambaone.app/_nuxt/img/business2.5140453.svg"
              alt="illustration"
              className="illustration"
            />
            <h1 className="opacity form-title">Confirm mail</h1>
            <Formik
              initialValues={{ code: "" }}
              validationSchema={validationSchema}
              onSubmit={checkConfirmationCode}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormField
                    type="email"
                    name="usernamecode"
                    placeholder="Email"
                    readOnly
                    value={email}
                  />
                  <FormField name="code" placeholder="Code" />
                  <FormSubmit buttonText="Next" isSubmitting={isSubmitting} />
                </Form>
              )}
            </Formik>
          </div>
          <div className="circle circle-two"></div>
        </div>
        <ThemeButtons handleThemeChange={handleThemeChange} />
      </div>
    </div>
  );
};
