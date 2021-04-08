import React from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"

const initialValues = {
  style: "",
  perceive: "",
}

const WebsiteContent = () => {
  const handleSubmit = data => {
    console.log(data)
  }
  const validate = values => {
    const errors = {}
    if (!values.style) {
      errors.style = "Required"
    }
    if (!values.perceive) {
      errors.perceive = "Required"
    }
    return errors
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
              <p>Style of Website you are looking for?</p>
              <Field type="text" name="style" className="form-control" />
              <ErrorMessage
                name="style"
                component="div"
                style={{ color: "red" }}
              />
              <p>
                How would you like your visitors to perceive your new website?
              </p>
              <Field type="text" name="perceive" className="form-control" />
              <ErrorMessage
                name="perceive"
                component="div"
                style={{ color: "red" }}
              />

              <div>
                <Button type="submit" className="w-md mt-2" color="primary">
                  Submit
                </Button>
              </div>
            </FormikComponent>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default WebsiteContent
