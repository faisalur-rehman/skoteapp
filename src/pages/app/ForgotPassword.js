import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  Container,
  Button,
  Input,
  Label,
  Row,
} from "reactstrap"
import { Formik, Form, Field, ErrorMessage } from "formik"

// import images
import profile from "../../assets/images/profile-img.png"
import logo from "../../assets/images/logo.svg"

import { postData } from "./ApiRequest"

const Recoverpw = () => {
  const [error, setError] = useState(null)
  const [clicked, setClicked] = useState(false)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async data => {
    try {
      const resData = await postData("/auth/password-forget", data)
      setError(null)
      console.log(resData)
      setSuccess(resData.data.message)
    } catch (err) {
      setError(err.response.data.name)
      console.log(err.response)
    }
    setClicked(true)
  }
  function validate(values) {
    const errors = {}
    if (!values.email) {
      errors.email = "Required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address"
    }
    return errors
  }
  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary"> Reset Password</h5>
                        <p>Re-Password with Skote.</p>
                      </div>
                    </Col>
                    <Col xs={5} className="align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="dashboard">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <Formik
                    initialValues={{ email: "" }}
                    validate={validate}
                    onSubmit={handleSubmit}
                  >
                    {() => (
                      <div className="p-2">
                        <div
                          className="alert alert-success text-center mb-4"
                          role="alert"
                        >
                          {!error && !clicked ? (
                            <p>
                              Enter your Email and instructions will be sent to
                              you!
                            </p>
                          ) : error && clicked ? (
                            <p>{error}</p>
                          ) : (
                            <p>{success}</p>
                          )}
                        </div>
                        <Form className="form-horizontal">
                          <Label htmlFor="useremail">Email</Label>
                          <Field
                            name="email"
                            className="form-control"
                            id="useremail"
                            placeholder="Enter email"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <div className="text-end">
                            <Button
                              className="mt-2 w-md"
                              type="submit"
                              color="primary"
                            >
                              Reset
                            </Button>
                          </div>
                        </Form>
                      </div>
                    )}
                  </Formik>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Remember It ?
                  <Link to="login" className="fw-medium text-primary">
                    Sign In here
                  </Link>
                </p>
                <p>
                  © {new Date().getFullYear()} Skote. Crafted with
                  <i className="mdi mdi-heart text-danger"></i> by 9thDimension
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Recoverpw
