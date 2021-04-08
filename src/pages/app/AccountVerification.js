import React from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"

const values = {
  email: "",
}

const AccountVerification = () => {
  function validate(values) {
    const errors = {}
    if (!values.email) {
      errors.email = "Required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid Email Address"
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
          <Col sm={2}></Col>
          <Col sm={9}>
            <FormikComponent
              initialValues={values}
              validate={validate}
              handleSubmit={handleSubmit}
            >
              <label htmlFor="email">Verify Email* : </label>
              <Field
                name="email"
                type="email"
                id="email"
                className="form-control"
              />
              <ErrorMessage
                name="email"
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
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default AccountVerification
