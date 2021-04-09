import React from "react"
import { Formik, Field, FieldArray, ErrorMessage, Form } from "formik"
import { Button, Row, Col } from "reactstrap"

const WebsitesYouLike = () => {
  function validate(values) {
    const errors = {}
    if (values.websites.length < 3) {
      errors.websites = "Minimum 3 websites required."
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
              initialValues={{ websites: [""] }}
              validate={validate}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <label htmlFor="websites">
                    Enter website's name you like.
                  </label>
                  <FieldArray name="websites">
                    {props => {
                      const { form, push } = props
                      const { values } = form
                      const { websites } = values

                      return (
                        <div>
                          {websites.map((website, index) => (
                            <div key={index}>
                              <Field
                                name={`website${index}`}
                                type="text"
                                key={index}
                                className="form-control"
                              />
                            </div>
                          ))}
                          <ErrorMessage
                            name="websites"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <Button color="secondary" onClick={() => push("")}>
                            Add More Websites
                          </Button>
                          <Button color="primary" className="m-2" type="submit">
                            Submit
                          </Button>
                        </div>
                      )
                    }}
                  </FieldArray>
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

export default WebsitesYouLike
