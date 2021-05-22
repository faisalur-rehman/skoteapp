import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { formGetData, formPostData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"
import Step1 from "./Step1"

const initialValues = {
  text: "",
  tagline: "",
  style: "",
  color: "",
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
          "/logo-design",
          localStorage.getItem("token")
        )
        console.log(data)
        if (data.logoDesign) {
          setId(data.logoDesign["_id"])
          initialValues.text = data.logoDesign.text
          initialValues.tagline = data.logoDesign.tagline
          initialValues.style = data.logoDesign.style
          initialValues.color = data.logoDesign.color
          // if (data.payload.has_color) {
          //   initialValues.has_color = "true"
          //   initialValues.color = data.payload.color
          // } else {
          //   initialValues.has_color = "false"
          //   initialValues.color = ""
          // }
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
    if (!values.text) {
      errors.text = "Required"
    }
    if (!values.tagline) {
      errors.tagline = "Required"
    }
    if (!values.style) {
      errors.style = "Required"
    }
    if (!values.color) {
      errors.color = "Required"
    }
    return errors
  }
  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (values) {
        resData = await patchData(
          "/logo-design",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/logo-design",
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
    setRedirect(true)
  }
  return (
    <div className="">
      <Row>
        <Step1 active={6} />
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
                              Step1
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
                                name="text"
                                as="textarea"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="text"
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
                              {!error && clicked && <Redirect to="dashboard" />}
                              {/* {redirect && <Redirect to="login" />} */}
                              {/* {redirect && <Redirect to="dashboard" />} */}
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
