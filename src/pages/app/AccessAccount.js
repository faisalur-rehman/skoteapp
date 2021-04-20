import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"

import { Row, Col, Button } from "reactstrap"

const initialValues = {
  has_difference_access: "",
  info: "",
}

const AccessAccount = () => {
  const [value, setValues] = useState()
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
          "/services/social-media/account-info",
          localStorage.getItem("token")
        )
        console.log(data.payload)
        if (data.payload) {
          setId(data.payload["_id"])
          if (data.payload.has_difference_access) {
            initialValues.has_difference_access = "true"
          } else {
            initialValues.has_difference_access = "false"
          }
          initialValues.info = data.payload.info
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
    if (!values.has_difference_access) {
      errors.has_difference_access = "Required"
    }
    if (!values.info) {
      errors.info = "Required"
    }
    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    if (data.has_difference_access === "true") {
      data.has_difference_access = true
    } else {
      data.has_difference_access = false
    }
    try {
      if (value) {
        resData = await patchData(
          "/services/social-media/account-info",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/social-media/account-info",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
      setSubmitted(true)
      if (data.has_difference_access) {
        data.has_difference_access = "true"
      } else {
        data.has_difference_access = "false"
      }
      console.log(resData)
    } catch (err) {
      setError(err.response.data.errors)
      console.log(err.response)
      setSubmitted(false)
    }
    setClicked(true)
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
                Would you like to use a different way for Sicuro Group to access
                your account?
              </p>

              <label>
                <Field type="radio" name="has_difference_access" value="true" />
                Yes
              </label>
              <br />
              <label>
                <Field
                  type="radio"
                  name="has_difference_access"
                  value="false"
                />
                No
              </label>
              <br />
              <ErrorMessage
                name="has_difference_access"
                component="div"
                style={{ color: "red" }}
              />
              <p>Do you have an Ad account ID?</p>
              <label>
                <Field
                  type="radio"
                  name="info"
                  value="Yes I have an ad account number"
                />
                Yes I have an ad account number
              </label>
              <br />
              <label>
                <Field type="radio" name="info" value="I am not sure" />
                I’m not sure
              </label>
              <br />

              <label>
                <Field
                  type="radio"
                  name="info"
                  value="I don't have an ad account number"
                />
                No
              </label>
              <br />
              <ErrorMessage
                name="info"
                component="div"
                style={{ color: "red" }}
              />
              <div>
                <Button type="submit" color="primary" className="w-md mt-3">
                  Submit
                </Button>
              </div>
            </FormikComponent>
            {!error && clicked && <Redirect to="webInfo" />}
            {redirect && <Redirect to="login" />}

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
