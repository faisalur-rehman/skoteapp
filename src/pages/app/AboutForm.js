import React, { useState, useEffect } from "react"
import { Row, Col, Button } from "reactstrap"
import FormikComponent from "./Formik"
import { Field, ErrorMessage } from "formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"

let initialValues = {
  name: "",
  role: "",
}

const AboutForm = () => {
  const [error, setError] = useState(null)
  const [values, setValues] = useState()
  const [id, setId] = useState()
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setRedirect(true)
    }
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/about",
          localStorage.getItem("token")
        )
        setId(data.about["_id"])
        initialValues.name = data.about.name
        initialValues.role = data.about.role
        setValues(initialValues)
        setError(null)
      } catch (error) {
        setError(error.response)
      }
    }
    fetchData()
  }, [])

  function validate(values) {
    const errors = {}
    if (!values.name) {
      errors.name = "Required"
    }
    if (!values.role) {
      errors.role = "Required"
    }
    return errors
  }
  async function handleSubmit(data) {
    let resData
    try {
      if (values) {
        resData = await patchData(
          "/about",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/about",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
    } catch (error) {
      setError(error.response)
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
              validate={validate}
              handleSubmit={handleSubmit}
            >
              <label htmlFor="name">Name* : </label>
              <Field
                name="name"
                id="name"
                className="form-control"
                as="textarea"
              />
              <ErrorMessage
                name="name"
                component="div"
                style={{ color: "red" }}
              />
              <br />
              <label htmlFor="role">Role* : </label>
              <Field
                id="role"
                name="role"
                className="form-control"
                as="textarea"
              />
              <ErrorMessage
                name="role"
                component="div"
                style={{ color: "red" }}
              />
              <div>
                <Button type="submit" className="w-md mt-3" color="primary">
                  Submit
                </Button>
              </div>
              {redirect && <Redirect to="login" />}
            </FormikComponent>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default AboutForm
