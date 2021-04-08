import React from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"

const initialValues = { market: "", audience: "" }

const TargetMarket = () => {
  function validate(values) {
    const errors = {}
    if (!values.market) {
      errors.market = "Required"
    }
    if (!values.audience) {
      errors.audience = "Required"
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
          <Col sm={8}>
            <FormikComponent
              initialValues={initialValues}
              validate={validate}
              handleSubmit={handleSubmit}
            >
              <label htmlFor="market">Your Niche Market: </label>
              <Field name="market" id="market" className="form-control" />
              <ErrorMessage
                component="div"
                name="market"
                style={{ color: "red" }}
              />
              <br />
              <label htmlFor="audience">Your target audience: </label>
              <Field name="audience" id="audience" className="form-control" />
              <ErrorMessage
                component="div"
                name="audience"
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

export default TargetMarket
