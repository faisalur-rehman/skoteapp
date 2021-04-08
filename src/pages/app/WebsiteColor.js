import React from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"

const initialValues = { sellingPoint: "", strength: "", whyYou: "" }
const WebsiteColor = () => {
  function validate(values) {
    const errors = {}
    if (!values.picked) {
      errors.picked = "Required"
    }
    if (!values.color) {
      errors.color = "Required"
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
            <Formik
              initialValues={{
                picked: "",
                color: "",
              }}
              validate={validate}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
                  <p id="my-radio-group">Your color preference</p>

                  <label>
                    <Field type="radio" name="picked" value="Yes" />
                    Yes
                  </label>
                  <br />
                  <label>
                    <Field type="radio" name="picked" value="No" />
                    No
                  </label>
                  <br />
                  <ErrorMessage
                    name="picked"
                    component="div"
                    style={{ color: "red" }}
                  />
                  {values.picked === "Yes" && (
                    <div>
                      <p>Your color Preference</p>
                      <Field
                        type="text"
                        name="color"
                        className="form-control"
                      />
                      <br />
                      <ErrorMessage
                        name="color"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  )}
                  <div>
                    <Button type="submit" className="w-md mt-3" color="primary">
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default WebsiteColor
