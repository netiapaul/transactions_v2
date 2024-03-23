import { Alert } from "reactstrap";

export const ErrorAlert = ({ error }) => {
  return <Alert color="danger">{error}</Alert>;
};
export const SuccessAlert = ({ success }) => {
  return <Alert color="success">{success}</Alert>;
};
