import React, { useState } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"

const initialValues = {
  contentReady: "",
  needHelp: "",
}

const WebsiteContent = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validate = values => {
    const errors = {}
    if (!values.contentReady) {
      errors.contentReady = "Required"
    }
    if (!values.needHelp) {
      errors.needHelp = "Required"
    }
    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (value) {
        resData = await patchData(
          "/business/content",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/business/content",
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
              <p>Do you have upcoming website content ready?</p>

              <label>
                <Field type="radio" name="contentReady" value="Yes" />
                Yes
              </label>
              <br />
              <label>
                <Field type="radio" name="contentReady" value="No" />
                No
              </label>
              <br />
              <ErrorMessage
                name="contentReady"
                component="div"
                style={{ color: "red" }}
              />
              <p>Do you need help for website content creation?</p>

              <label>
                <Field type="radio" name="needHelp" value="Yes" />
                Yes
              </label>
              <br />
              <label>
                <Field type="radio" name="needHelp" value="No" />
                No
              </label>
              <br />
              <ErrorMessage
                name="needHelp"
                component="div"
                style={{ color: "red" }}
              />

              <div>
                <Button
                  type="submit"
                  color="primary"
                  className="w-md mt-3"
                  WebsiteContent
                >
                  Submit
                </Button>
              </div>
            </FormikComponent>
            {submitted && (
              <Button color="success" onClick={() => setClicked(true)}>
                Next Section
              </Button>
            )}
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default WebsiteContent
