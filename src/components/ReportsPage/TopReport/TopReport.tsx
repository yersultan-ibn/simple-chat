import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  ReportsList,
  ReportsState,
  createReport,
  deleteReport,
} from "../../../redux/reports-slice";

const identifier = [
  {
    value: "VIN",
    label: "VIN",
  },
  {
    value: "ГРЗ",
    label: "ГРЗ",
  },
  {
    value: "BODY",
    label: "BODY",
  },
];

export const TopReport = () => {
  const dispatch = useDispatch();
  const reports = useSelector((state: ReportsState) => state.list);
  const initialValues = {
    identifier: "",
    identifierType: "ГРЗ",
  };

  const handleCreateReport = (values: any) => {
    const newReport = {
      identifier: values.identifier,
      identifierType: values.identifierType,
      date: new Date().toLocaleString("ru-RU"), // Преобразование в нужный формат
      statusReports: "Новый",
    };

    dispatch(createReport(newReport));
  };

  const handleDeleteReport = (reportId: any) => {
    dispatch(deleteReport(reportId));
  };

  return (
    <Box className="top-report">
      <Typography variant="h4" component="h3">
        Создать отчёт
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleCreateReport}>
        <Form className="form-report">
          <div>
            <label htmlFor="identifier">Идентификатор</label>
            <Field
              as={TextField}
              id="identifier"
              name="identifier"
              label="A007AA197"
              className="identifier-input"
            />
          </div>
          <div>
            <label htmlFor="identifierType">Тип идентификатора</label>
            <Field
              as={TextField}
              id="identifierType"
              name="identifierType"
              select
              defaultValue="ГРЗ"
            >
              {identifier.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Field>
          </div>
          <div>
            <Button type="submit">Создать</Button>
          </div>
        </Form>
      </Formik>
    </Box>
  );
};
