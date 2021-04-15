import React, { useState, useEffect } from "react"
import { Formik, Field, FieldArray, ErrorMessage, Form } from "formik"
import { Button, Row, Col } from "reactstrap"
import { Redirect } from "react-router-dom"

const WebsitesYouLike = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  function validate(values) {
    const errors = {}
    if (values.websites.length < 3) {
      errors.websites = "Minimum 3 websites required."
    }

    return errors
  }
  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (value) {
        resData = await patchData(
          "/business/websitesYouLike",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/business/websitesYouLike",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
      console.log(resData)
    } catch (err) {
      // setError(err.response.data.errors)
      setError(err.response.data.errors[0])
      console.log(err.response)
    }
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
                          {error && <p style={{ color: "red" }}>{error}</p>}
                          <Button color="secondary" onClick={() => push("")}>
                            Add More Websites
                          </Button>
                          <Button color="primary" className="m-2" type="submit">
                            Submit
                          </Button>
                          {!error && clicked && (
                            <Redirect to="websitesYouDisLike" />
                          )}
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
