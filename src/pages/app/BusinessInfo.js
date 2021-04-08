import React from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"

const initialValues = { notes: "", company: "", products: "" }

const BusinessInfo = () => {
  function validate(values) {
    const errors = {}
    if (!values.notes) {
      errors.notes = "Required"
    }
    if (!values.company) {
      errors.company = "Required"
    }
    if (!values.products) {
      errors.products = "Required"
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
          <Col sm={3}>Track Bar Goes Here</Col>
          <Col sm={9}>
            <FormikComponent
              initialValues={initialValues}
              validate={validate}
              handleSubmit={handleSubmit}
            >
              <p>Introduction: </p>
              <label htmlFor="notes">Short Notes: </label>
              <Field name="notes" id="notes" className="form-control" />
              <ErrorMessage
                name="notes"
                component="div"
                style={{ color: "red" }}
              />
              <br />
              <label htmlFor="company">Your Company: </label>
              <Field name="company" id="company" className="form-control" />
              <ErrorMessage
                name="company"
                component="div"
                style={{ color: "red" }}
              />

              <br />
              <label htmlFor="products">Your Products: </label>
              <Field name="products" id="products" className="form-control" />
              <ErrorMessage
                name="products"
                component="div"
                style={{ color: "red" }}
              />

              <div>
                <Button type="submit" color="primary" className="w-md mt-3">
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

export default BusinessInfo
