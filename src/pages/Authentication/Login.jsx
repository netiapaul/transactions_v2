import React from "react";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";

// actions
import { loginUser, socialLogin } from "../../store/actions";

// import images
import CompanyBrand from "../../assets/images/LoginPageLogo.png";

const Login = (props) => {
  //meta title
  document.title = "Login | phAMACore";
  const dispatch = useDispatch();

  const formik = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // email: "admin@themesbrand.com" || "",
      // password: "123456" || "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      // dispatch(loginUser(values, props.router.navigate));
      alert(JSON.stringify(values, null, 2));
    },
  });

  const LoginProperties = createSelector(
    (state) => state.Login,
    (login) => ({
      error: login.error,
    })
  );

  const { error } = useSelector(LoginProperties);

  const signIn = (type) => {
    dispatch(socialLogin(type, props.router.navigate));
  };

  //for facebook and google authentication
  const socialResponse = (type) => {
    signIn(type);
  };

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden shadow-sm">
                <div className="pt-3 pe-3 ps-3 text-center">
                  <img
                    src={CompanyBrand}
                    alt=""
                    className="img-fluid"
                    width="150"
                  />
                  <p className="fw-semibold m-0 system_version">
                    Version 2.0.0.2
                  </p>{" "}
                  <h5 className="mb-1">Welcome back!</h5>
                  <p className="mb-0 text-secondary">
                    Please enter your credentials to sign in!
                  </p>
                </div>
                <CardBody className="pt-0">
                  <div className="auth-logo"></div>
                  <div className="p-2 mt-3">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                        return false;
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}

                      <div className="mb-2">
                        <Label className="form-label text-muted">
                          Username
                        </Label>
                        <Input
                          name="username"
                          className="form-control"
                          placeholder="Enter Username"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                          invalid={
                            formik.touched.username && formik.errors.username
                              ? true
                              : false
                          }
                        />
                        {formik.touched.username && formik.errors.username ? (
                          <FormFeedback type="invalid">
                            {formik.errors.username}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label text-muted">
                          Password
                        </Label>
                        <Input
                          name="password"
                          autoComplete="off"
                          value={formik.values.password}
                          type="password"
                          placeholder="Enter Password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          invalid={
                            formik.touched.password && formik.errors.password
                              ? true
                              : false
                          }
                        />
                        {formik.touched.password && formik.errors.password ? (
                          <FormFeedback type="invalid">
                            {formik.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  © {new Date().getFullYear()} phAMACore. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by CoreBase
                  Solutions
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);
