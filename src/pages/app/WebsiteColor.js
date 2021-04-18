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
        console.log(data.style)
        if (data.style) {
          setId(data.style["_id"])

          initialValues.style = data.style.style
          initialValues.perceive = data.style.perceive

          setValues(initialValues)
          setError(null)
        }
        console.log(initialValues)
      } catch (error) {
        setError(error.response)
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
    if (values.hasPreference) {
    }
    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
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
    } catch (err) {
      setError(err.response.data.errors)
      console.log(err.response)
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
                  <p id="my-radio-group">Your color preference</p>

                  <label>
                    <Field type="radio" name="hasPreference" value={true} />
                    Yes
                  </label>
                  <br />
                  <label>
                    <Field type="radio" name="hasPreference" value={false} />
                    No
                  </label>
                  <br />
                  <ErrorMessage
                    name="picked"
                    component="div"
                    style={{ color: "red" }}
                  />
                  {values.picked === "Yes" && (
                    <div>
                      <p>Your color Preference</p>
                      <Field
                        type="text"
                        name="hasPreference"
                        className="form-control"
                      />
                      <br />
                      <ErrorMessage
                        name="hasPreference"
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
