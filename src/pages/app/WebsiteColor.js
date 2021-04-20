import React, { useState, useEffect } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"

const initialValues = {
  preference: "",
  hasPreference: "",
}

const WebsiteColor = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/services/design/color",
          localStorage.getItem("token")
        )
        console.log(data.color)
        if (data.color) {
          setId(data.color["_id"])
          if (data.color.hasPreference) {
            initialValues.hasPreference = "true"
            initialValues.preference = data.color.preference
          } else {
            initialValues.hasPreference = "false"
            initialValues.preference = ""
          }

          setValues(initialValues)
          setError(null)
        }
        console.log(initialValues)
      } catch (error) {
        // setError(error.response)
      }
    }
    fetchData()
  }, [])

  function validate(values) {
    const errors = {}
    console.log(values)
    if (!values.hasPreference) {
      errors.hasPreference = "Required"
    }
    if (values.hasPreference === "true" && !values.preference) {
      errors.preference = "Required"
    }
    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    if (data.hasPreference === "true") {
      data.hasPreference = true
    } else {
      data.hasPreference = false
      data.preference = ""
    }
    try {
      if (value) {
        resData = await patchData(
          "/services/design/color",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/design/color",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
      console.log(resData)
      if (data.hasPreference) {
        data.hasPreference = "true"
      } else {
        data.hasPreference = "false"
      }
    } catch (err) {
      setError(err.response.data.errors)
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
                  <p id="my-radio-group">Your color preference</p>

                  <label>
                    <Field type="radio" name="hasPreference" value="true" />
                    Yes
                  </label>
                  <br />
                  <label>
                    <Field type="radio" name="hasPreference" value="false" />
                    No
                  </label>
                  <br />
                  <ErrorMessage
                    name="hasPreference"
                    component="div"
                    style={{ color: "red" }}
                  />
                  {values.hasPreference === "true" && (
                    <div>
                      <p>Your color Preference</p>
                      <Field
                        type="text"
                        name="preference"
                        className="form-control"
                      />
                      <br />
                      <ErrorMessage
                        name="preference"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  )}
                  <div>
                    <Button type="submit" className="w-md mt-3" color="primary">
                      Submit
                    </Button>
                    {!error && clicked && <Redirect to="websiteStyle" />}
                  </div>
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

export default WebsiteColor
