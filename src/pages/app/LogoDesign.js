import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { formGetData, formPostData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"
import Step6 from "./Step6"

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
    <div className="">
      <Row>
        <Step6 active={0} />
        <Col>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <div className="account-pages pt-sm-5">
                  <div>
                    <Row className="justify-content-center">
                      <Col sm={8}>
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
                              <Col xs={8}>
                                <div className="text-primary p-4">
                                  <h5 className="text-primary">Logo Design!</h5>
                                </div>
                              </Col>
                              <Col className="col-4 align-self-end">
                                <img
                                  src={profile}
                                  alt=""
                                  className="img-fluid"
                                  style={{ height: 100 }}
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
                                as="textarea"
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
                                as="textarea"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="tagline"
                                component="div"
                                style={{ color: "red" }}
                              />
                              <p id="my-radio-group">Your color preference</p>

                              <Field
                                id="strength"
                                name="color"
                                as="textarea"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="color"
                                component="div"
                                style={{ color: "red" }}
                              />
                              <br />

                              <label htmlFor="reason_to_choose">
                                Please describe what style of logo you are
                                looking for?{" "}
                              </label>
                              <Field
                                as="textarea"
                                id="reason_to_choose"
                                name="style"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="style"
                                component="div"
                                style={{ color: "red" }}
                              />

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
                      </Col>
                    </Row>
                  </div>
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
