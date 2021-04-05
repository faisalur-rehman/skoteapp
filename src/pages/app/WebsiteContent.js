import React from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"

const initialValues = {
  contentReady: "",
  needHelp: "",
}

const WebsiteContent = () => {
  const handleSubmit = data => {
    console.log(data)
  }
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
  return (
    <div className="page-content">
      <div className="container">
        <Row>
          <Col sm={3}>Track Bar Goes Here</Col>
          <Col sm={9}>
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
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default WebsiteContent
