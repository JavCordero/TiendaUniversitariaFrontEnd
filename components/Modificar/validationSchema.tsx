import * as yup from "yup";

export default yup.object().shape({
  modificacion: yup.string()
  .matches(/^[1234567890]+$/, "Debe ser un valor numérico"),
  aumento: yup.string()
  .matches(/^[1234567890]+$/, "Debe ser un valor numérico"),
});