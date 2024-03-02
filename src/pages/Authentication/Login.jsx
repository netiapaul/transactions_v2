import React, { useState } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

//redux
// import { useSelector, useDispatch } from "react-redux";
// import { createSelector } from "reselect";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// Import Component
import { ErrorAlert } from "../../components/Common/AlertFeedback";

import { HandleLogin } from "../../common/services/SystemServices";

import {
  Row,
  Col,
  CardBody,
  Card,
  // Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";

// import images
import CompanyBrand from "../../assets/images/LoginPageLogo.png";

const Login = (props) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    isLoading: false,
    error: "",
  });

  //meta title
  document.title = "Login | phAMACore Cloud";
  // const dispatch = useDispatch();

  async function HandleSubmit(data) {
    setData((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    try {
      const response = await HandleLogin(data);
      setData((prevState) => ({
        ...prevState,
        isLoading: false,
        error: response?.message,
      }));
      if (response["user"].usergrouplist === "customerQuo") {
        localStorage.setItem("customerQuoCode", response["user"].username);
      } else if (response["user"].usergrouplist === "salesrepQuo") {
        localStorage.setItem("salesrepQuoCode", response["user"].username);
      }
      localStorage.setItem("token", response.token);
      localStorage.setItem("usergrouplist", response["user"].usergrouplist);
      localStorage.setItem("serverName", response["user"].serverName);
      localStorage.setItem("userName", response["user"].username);
      localStorage.setItem("companyName", response["user"].companyName);
      localStorage.setItem("clientCode", response["user"].clientCode);
      localStorage.setItem("companyDetailId", response["user"].companyDetailId);
      localStorage.setItem("fullusername", response["user"].fullusername);
      localStorage.setItem("cellnumber", response["user"].cellnumber);
      localStorage.setItem("BASE_URL", response["user"].baseUrl);
      // localStorage.setItem(
      //   "branches",
      //   JSON.stringify(response["user"].userBranches || userData.customBranch)
      // );
      localStorage.setItem(
        "viewDashboard",
        JSON.stringify(response["user"].viewDashboard)
      );
      localStorage.setItem("cusId", response["user"].cusId);
      localStorage.setItem(
        "userrights",
        JSON.stringify(response["user"].userrights)
      );
      localStorage.setItem(
        "userProfiles",
        JSON.stringify(response["user"].userPROFILEGROUPS)
      );
    } catch (error) {
      setData((prevState) => ({
        ...prevState,
        isLoading: false,
        error: "Error",
      }));
    }
  }

  const formik = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // email: "admin@themesbrand.com" || "",
      // password: "123456" || "",
      username: "PaulDev",
      password: "Tom12345",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      const data = {
        username: values?.username,
        password: values?.password,
        customBranch: "",
        machineCookie: "",
        latt: "",
        long: "",
      };
      HandleSubmit(data);
      // dispatch(loginUser(values, props.router.navigate));
      // alert(JSON.stringify(values, null, 2));
    },
  });

  // const LoginProperties = createSelector(
  //   (state) => state.Login,
  //   (login) => ({
  //     error: login.error,
  //   })
  // );

  // const { error } = useSelector(LoginProperties);

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
                  <div className="p-2 mt-3">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                        return false;
                      }}
                    >
                      {data?.error && <ErrorAlert error={data?.error} />}

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

                        <div className="input-group auth-pass-inputgroup">
                          <Input
                            name="password"
                            autoComplete="off"
                            value={formik.values.password}
                            type={show ? "text" : "password"}
                            placeholder="Enter Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            invalid={
                              formik.touched.password && formik.errors.password
                                ? true
                                : false
                            }
                          />
                          <button
                            onClick={() => setShow(!show)}
                            className="btn btn-light "
                            type="button"
                            id="password-addon"
                          >
                            {show ? (
                              <i className="mdi mdi-eye-off-outline"></i>
                            ) : (
                              <i className="mdi mdi-eye-outline"></i>
                            )}
                          </button>
                        </div>
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
                          disabled={data?.isLoading}
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
