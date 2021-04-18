import React, { useState } from "react"
import { Formik, Field, FieldArray, Form } from "formik"
import { Button, Row, Col } from "reactstrap"
import { Redirect } from "react-router-dom"
import { formPostData, formGetData, patchData } from "./ApiRequest"

const initialValues = {
  websites: [""],
}

const WebsitesYouLike = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)

  const validate = () => {
    const errors = {}
    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    let websites = []
    data.websites.map((website, index) =>
      websites.push(data[`website${index}`])
    )
    console.log(websites)
    try {
      if (value) {
        resData = await patchData(
          "/design/dislike",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/design/dislike",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
      console.log(resData)
    } catch (err) {
      setError(err.response.data.errors)
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
              initialValues={initialValues}
              validate={validate}
              onSubmit={handleSubmit}
            >
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
                          {!error && clicked && <Redirect to="websiteColor" />}
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
