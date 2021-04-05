import React from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"

const initialValues = { market: "", audience: "" }

const TargetMarket = () => {
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
              <label htmlFor="market">Your Niche Market: </label>
              <Field
                type="text"
                name="market"
                id="market"
                className="form-control"
              />
              <br />
              <label htmlFor="audience">Your target audience: </label>
              <Field
                type="text"
                name="audience"
                id="audience"
                className="form-control"
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

export default TargetMarket
