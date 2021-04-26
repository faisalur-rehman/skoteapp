import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { formGetData, formPostData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"

const initialValues = {
  exact_text: "",
  tagline: "",
  style: "",
  color_preference: "",
  has_color_preference: "",
}
const LogoDesign = () => {
  const [values, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setRedirect(true)
    }
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/services/logo-design/detail",
          localStorage.getItem("token")
        )
        console.log(data)
        if (data.payload) {
          setId(data.payload["_id"])
          initialValues.exact_text = data.payload.exact_text
          initialValues.tagline = data.payload.tagline
          initialValues.style = data.payload.style
          if (data.payload.has_color_preference) {
            initialValues.has_color_preference = "true"
            initialValues.color_preference = data.payload.color_preference
          } else {
            initialValues.has_color_preference = "false"
            initialValues.color_preference = ""
          }
          setValues(initialValues)
        }
        setError(null)
      } catch (err) {
        // setError(err.response.data.message)
        console.log(err.response)
      }
    }
    fetchData()
  }, [])
  function validate(values) {
    const errors = {}
    if (!values.exact_text) {
      errors.exact_text = "Required"
    }
    if (!values.tagline) {
      errors.tagline = "Required"
    }
    if (!values.style) {
      errors.style = "Required"
    }
    if (!values.has_color_preference) {
      errors.has_color_preference = "Required"
    }
    if (values.has_color_preference === "true" && !values.color_preference) {
      errors.color_preference = "Required"
    }
    return errors
  }
  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (values) {
        resData = await patchData(
          "/services/logo-design/detail",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/logo-design/detail",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
    } catch (err) {
      // setError(err.response.data.message)
      console.log(err.response)
    }
    setClicked(true)
  }
  return (
    <div className="container">
      <Row>
        <Col sm={12}>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <div className="account-pages my-5 pt-sm-5">
                  <Container>
                    <Row className="justify-content-center">
                      <Col md={8} lg={6} xl={5}>
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              Step6
                            </li>
                            <li
                              style={{ color: "blue" }}
                              className="breadcrumb-item"
                              aria-current="page"
                            >
                              Logo Design
                            </li>
                          </ol>
                        </nav>
                        <Card className="overflow-hidden">
                          <div className="bg-primary bg-soft">
                            <Row>
                              <Col xs={7}>
                                <div className="text-primary p-4">
                                  <h5 className="text-primary">Logo Design!</h5>
                                </div>
                              </Col>
                              <Col className="col-5 align-self-end">
                                <img
                                  src={profile}
                                  alt=""
                                  className="img-fluid"
                                />
                              </Col>
                            </Row>
                          </div>
                          <CardBody className="pt-0">
                            <div className="p-2">
                              <label htmlFor="description">
                                Please provide the exact Text for the logo{" "}
                              </label>
                              <Field
                                id="description"
                                name="exact_text"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="exact_text"
                                component="div"
                                style={{ color: "red" }}
                              />
                              <br />

                              <label htmlFor="strength">
                                If you have a tagline, please let us know what
                                it is.{" "}
                              </label>
                              <Field
                                id="strength"
                                name="tagline"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="tagline"
                                component="div"
                                style={{ color: "red" }}
                              />
                              <p id="my-radio-group">Your color preference</p>

                              <label>
                                <Field
                                  type="radio"
                                  name="has_color_preference"
                                  value="true"
                                />
                                Yes
                              </label>
                              <br />
                              <label>
                                <Field
                                  type="radio"
                                  name="has_color_preference"
                                  value="false"
                                />
                                No
                              </label>
                              <br />
                              <ErrorMessage
                                name="hasPreference"
                                component="div"
                                style={{ color: "red" }}
                              />
                              {values.has_color_preference === "true" && (
                                <div>
                                  <p>Your color Preference</p>
                                  <Field
                                    type="text"
                                    name="color_preference"
                                    className="form-control"
                                  />
                                  <br />
                                  <ErrorMessage
                                    name="color_preference"
                                    component="div"
                                    style={{ color: "red" }}
                                  />
                                </div>
                              )}

                              <br />

                              <label htmlFor="reason_to_choose">
                                Please describe what style of logo you are
                                looking for?{" "}
                              </label>
                              <Field
                                type="text"
                                id="reason_to_choose"
                                name="style"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="style"
                                component="div"
                                style={{ color: "red" }}
                              />
                              {error && (
                                <p style={{ color: "red" }}>
                                  {error}. Please mark the logo creation as
                                  checked in Checklist form of Service section.
                                </p>
                              )}
                              <div>
                                <Button
                                  type="submit"
                                  className="w-md mt-3"
                                  color="primary"
                                >
                                  Submit
                                </Button>
                              </div>
                              {!error && clicked && (
                                <Redirect to="uploadLogo" />
                              )}
                              {redirect && <Redirect to="login" />}
                            </div>
                          </CardBody>
                        </Card>
                        <div className="mt-5 text-center">
                          <p>
                            © {new Date().getFullYear()} Sicuro Group. Crafted
                            with <i className="mdi mdi-heart text-danger" /> by
                            9thDimension
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
        {/* <Col sm={2}></Col> */}
      </Row>
    </div>
  )
}

export default LogoDesign
