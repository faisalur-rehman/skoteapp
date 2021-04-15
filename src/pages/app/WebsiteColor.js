import React, { useState } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
import { Redirect } from "react-router-dom"

const initialValues = { sellingPoint: "", strength: "", whyYou: "" }

const WebsiteColor = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)

  function validate(values) {
    const errors = {}
    if (!values.picked) {
      errors.picked = "Required"
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
      if (value) {
        resData = await patchData(
          "/business/style",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/business/style",
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
              initialValues={{
                picked: "",
                color: "",
              }}
              validate={validate}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
                  <p id="my-radio-group">Your color preference</p>

                  <label>
                    <Field type="radio" name="picked" value="Yes" />
                    Yes
                  </label>
                  <br />
                  <label>
                    <Field type="radio" name="picked" value="No" />
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
                        name="color"
                        className="form-control"
                      />
                      <br />
                      <ErrorMessage
                        name="color"
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
