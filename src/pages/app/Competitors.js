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
          <Col sm={3}>Track Bar Goes Here</Col>
          <Col sm={9}>
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
              <label htmlFor="webAddress1">Three Website Adresses: </label>
              <Field
                type="text"
                name="webAddress1"
                id="webAddress"
                className="form-control"
              />
              <Field type="text" name="webAddress2" className="form-control" />
              <Field type="text" name="webAddress3" className="form-control" />
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

export default Competitors
