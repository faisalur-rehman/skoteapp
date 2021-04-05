import React from "react"
import { Row, Col, Button } from "reactstrap"
import FormikComponent from "./Formik"
import { Field, ErrorMessage } from "formik"

const AboutForm = () => {
  let initilaValues = {
    name: "",
    role: "",
  }
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
  function handleSubmit(data) {
    console.log(data)
  }
  return (
    <div className="page-content">
      <div className="container">
        <Row>
          <Col sm={3} style={{ borderRight: "1px solid black" }}>
            Track bar will go here
          </Col>
          <Col sm={9}>
            <FormikComponent
              initialValues={initilaValues}
              validate={validate}
              handleSubmit={handleSubmit}
            >
              <label htmlFor="name">Name* : </label>
              <Field
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <ErrorMessage
                name="name"
                component="div"
                style={{ color: "red" }}
              />
              <br />
              <label htmlFor="role">Role* : </label>
              <Field
                type="text"
                id="role"
                name="role"
                className="form-control"
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
            </FormikComponent>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default AboutForm
