import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"

import { Row, Col, Button } from "reactstrap"

const initialValues = {
  login_url: "",
  username: "",
  password: "",
}

const AccessAccount = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/services/social-media/web-info",
          localStorage.getItem("token")
        )
        console.log(data.payload)
        if (data.payload) {
          setId(data.payload["_id"])
          initialValues.login_url = data.payload.login_url
          initialValues.username = data.payload.username
          initialValues.password = data.payload.password
          setValues(initialValues)
        }
        setError(null)
      } catch (error) {
        setError(error.response)
      }
    }
    fetchData()
  }, [])

  const validate = values => {
    const errors = {}
    if (!values.login_url) {
      errors.login_url = "Required"
    }
    if (!values.username) {
      errors.username = "Required"
    }
    if (!values.password) {
      errors.password = "Required"
    }
    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)

    try {
      if (value) {
        resData = await patchData(
          "/services/social-media/web-info",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/social-media/web-info",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
      setSubmitted(true)

      console.log(resData)
    } catch (err) {
      setError(err.response.data.errors)
      console.log(err.response)
      setSubmitted(false)
    }
  }

  return (
    <div className="page-content">
      <div className="container">
        <Row>
          <Col sm={2}></Col>

          <Col sm={8}>
            <FormikComponent
              initialValues={initialValues}
              handleSubmit={handleSubmit}
              validate={validate}
            >
              <p>
                In order to add analytics, we need access to the backend of your
                website.Please include your login url
              </p>

              <Field
                name="login_url"
                className="form-control"
                placeholder="e.g. https://sicurogroup.com"
              />
              <br />
              <ErrorMessage
                name="login_url"
                component="div"
                style={{ color: "red" }}
              />
              <p>Username:</p>
              <Field
                name="username"
                className="form-control"
                placeholder="Username"
              />
              <ErrorMessage
                name="username"
                component="div"
                style={{ color: "red" }}
              />
              <p>Password:</p>
              <Field
                type="password"
                name="password"
                className="form-control"
                placeholder="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red" }}
              />
              <br />
              <div>
                <Button type="submit" color="primary" className="w-md mt-3">
                  Submit
                </Button>
              </div>
            </FormikComponent>
            {/* {submitted && (
              <Button color="success" onClick={() => setClicked(true)}>
                Next Section
              </Button>
            )} */}
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default AccessAccount
