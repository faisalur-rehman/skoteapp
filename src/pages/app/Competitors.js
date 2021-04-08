import React from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"

const initialValues = {
  competitor: "",
  webAddress1: "",
  webAddress2: "",
  webAddress3: "",
}
const Competitors = () => {
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
          <Col sm={2}></Col>
          <Col sm={8}>
            <FormikComponent
              initialValues={initialValues}
              validate={validate}
              handleSubmit={handleSubmit}
            >
              <label htmlFor="competitor">Your Competitors: </label>
              <Field
                type="text"
                name="competitor"
                id="competitor"
                className="form-control"
              />
              <br />
              <label>Three Website Adresses: </label>
              <Field name="webAddress1" className="form-control" />
              <br />
              <Field name="webAddress2" className="form-control" />
              <br />
              <Field name="webAddress3" className="form-control" />
              <br />
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

export default Competitors
