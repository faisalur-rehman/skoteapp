import React from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"

const initialValues = {
  logo: "",
  busName: "",
  busEmail: "",
  busPhone: "",
  website: "",
}

const UniqueSelling = () => {
  function validate(values) {
    const errors = {}

    if (!values.busName) {
      errors.busName = "Required"
    }

    if (!values.busPhone) {
      errors.busPhone = "Required"
    }
    if (!values.busEmail) {
      errors.busEmail = "Required"
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.busEmail)
    ) {
      errors.busEmail = "Invalid email address"
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
              <label htmlFor="logo">Logo : </label>
              <Field type="file" name="logo" className="form-control" />

              <br />
              <label htmlFor="busName">Business Name* : </label>
              <Field
                type="text"
                name="busName"
                id="busName"
                className="form-control"
              />
              <ErrorMessage
                name="busName"
                component="div"
                style={{ color: "red" }}
              />

              <br />
              <label htmlFor="busEmail">Business Email* : </label>
              <Field
                type="text"
                name="busEmail"
                id="busEmail"
                className="form-control"
              />
              <ErrorMessage
                name="busEmail"
                component="div"
                style={{ color: "red" }}
              />

              <br />
              <label htmlFor="busPhone">Business Phone* : </label>
              <Field
                type="number"
                name="busPhone"
                id="busPhone"
                className="form-control"
              />
              <ErrorMessage
                name="busPhone"
                component="div"
                style={{ color: "red" }}
              />

              <br />
              <label htmlFor="website">Website : </label>
              <Field
                type="text"
                name="website"
                id="website"
                className="form-control"
              />
              <ErrorMessage
                name="website"
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

export default UniqueSelling
