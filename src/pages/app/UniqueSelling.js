import React from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"

const initialValues = { sellingPoint: "", strength: "", whyYou: "" }
const UniqueSelling = () => {
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
              <label htmlFor="sellingPoint">Your unique selling point: </label>
              <Field
                type="text"
                id="sellingPoint"
                name="sellingPoint"
                className="form-control"
              />
              <br />

              <label htmlFor="strength">Your Strength: </label>
              <Field
                type="text"
                id="strength"
                name="strength"
                className="form-control"
              />
              <br />

              <label htmlFor="whyYou">Why should customer choose you? </label>
              <Field
                type="text"
                id="whyYou"
                name="whyYou"
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

export default UniqueSelling
