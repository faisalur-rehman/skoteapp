import React from "react"
import { Formik, Field, FieldArray, Form } from "formik"
import { Button, Row, Col } from "reactstrap"

const WebsitesYouLike = () => {
  function handleSubmit(data) {
    console.log(data)
  }
  return (
    <div className="page-content">
      <div className="container">
        <Row>
          <Col sm={3}>Track Bar Goes Here</Col>
          <Col sm={9}>
            <Formik initialValues={{ websites: [""] }} onSubmit={handleSubmit}>
              {() => (
                <Form>
                  <label htmlFor="websites">
                    Enter website's name you dislike.
                  </label>
                  <FieldArray name="websites">
                    {props => {
                      const { form, push, remove } = props
                      const { values } = form
                      const { websites } = values

                      return (
                        <div>
                          {websites.map((website, index) => (
                            <Field
                              name={`website${index}`}
                              type="text"
                              key={index}
                              className="form-control"
                            />
                          ))}
                          <Button color="secondary" onClick={() => push("")}>
                            Add Website
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
        </Row>
      </div>
    </div>
  )
}

export default WebsitesYouLike
