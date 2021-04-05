import React from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"

const initialValues = { notes: "", company: "", products: "" }

const BusinessInfo = () => {
  function validate(values) {
    const errors = {}
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
              <Field
                type="text"
                name="notes"
                id="notes"
                className="form-control"
              />
              <br />
              <label htmlFor="company">Your Company: </label>
              <Field
                type="text"
                name="company"
                id="company"
                className="form-control"
              />
              <br />
              <label htmlFor="products">Your Products: </label>
              <Field
                type="text"
                name="products"
                id="products"
                className="form-control"
              />
              <div>
                <Button type="submit" color="primary" className="w-md mt-3">
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

export default BusinessInfo
