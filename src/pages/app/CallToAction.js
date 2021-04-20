import React, { useState, useEffect } from "react"
import { Row, Col, Button } from "reactstrap"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"

const initialValues = {
  action: "",
}

const CallToAction = () => {
  const [error, setError] = useState(null)
  const [values, setValues] = useState()
  const [id, setId] = useState()
  const [submitted, setSubmitted] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setRedirect(true)
    }
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/services/wg-action",
          localStorage.getItem("token")
        )
        console.log(data.action)
        if (data.action) {
          setId(data.action["_id"])
          initialValues.action = data.action.action
          setValues(initialValues)
        }
        setError(null)
      } catch (error) {
        console.log(error)
        setError(error.response)
      }
    }
    fetchData()
  }, [])

  function validate(values) {
    const errors = {}
    if (values.action.length < 3) {
      errors.action = "Minimum of 3 characters are required"
    }

    return errors
  }
  async function handleSubmit(data) {
    let resData
    try {
      if (values) {
        resData = await patchData(
          "/services/wg-action",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/wg-action",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
      setSubmitted(true)
      console.log(resData)
    } catch (error) {
      setError(error.response)
      setSubmitted(false)
      console.log(error.response)
    }
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
                  <p style={{ fontWeight: "bold" }}>Call to action:</p>
                  <label htmlFor="name">Describe the action* : </label>
                  <Field name="action" className="form-control" />
                  <ErrorMessage
                    name="action"
                    component="div"
                    style={{ color: "red" }}
                  />

                  <div>
                    <Button type="submit" className="w-md mt-3" color="primary">
                      Submit
                    </Button>
                  </div>
                  {submitted && (
                    <Button
                      className="mt-3"
                      color="success"
                      onClick={() => setClicked(true)}
                    >
                      Next Section
                    </Button>
                  )}
                  {!error && clicked && <Redirect to="/services" />}
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

export default CallToAction
