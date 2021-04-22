import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
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
    <div className="page-content">
      <div className="container">
        <Row>
          <Col sm={2}></Col>
          <Col sm={8}>
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
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
                    If you have a tagline, please let us know what it is.{" "}
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
                    Please describe what style of logo you are looking for?{" "}
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
                      {error}. Please mark the logo creation as checked in
                      Checklist form of Service section.
                    </p>
                  )}
                  <div>
                    <Button type="submit" className="w-md mt-3" color="primary">
                      Submit
                    </Button>
                  </div>
                  {!error && clicked && <Redirect to="competitors" />}
                  {redirect && <Redirect to="login" />}
                </Form>
              )}
            </Formik>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default LogoDesign
