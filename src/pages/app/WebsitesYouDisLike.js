import React, { useState, useEffect } from "react"
import { Formik, Field, FieldArray, Form } from "formik"
import { Button, Row, Col } from "reactstrap"
import { Redirect } from "react-router-dom"
import { formPostData, formGetData, patchData } from "./ApiRequest"

const initialValues = {
  websites: [""],
}

const WebsitesYouDisLike = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setRedirect(true)
    }
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/services/design/dislike",
          localStorage.getItem("token")
        )
        console.log(data.dislike)
        if (data.dislike) {
          setId(data.dislike["_id"])
          data.dislike.websites.map((website, index) => {
            initialValues[`website${index}`] = website
            initialValues.websites[index] = website
          })
          setValues(initialValues)
          setError(null)
        }
        console.log(initialValues)
      } catch (error) {
        // setError(error.response)
      }
    }
    fetchData()
  }, [])

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
    let newData = {
      websites,
    }
    try {
      if (value) {
        resData = await patchData(
          "/services/design/dislike",
          id,
          newData,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/design/dislike",
          newData,
          localStorage.getItem("token")
        )
      }
      setError(null)
      console.log(resData)
    } catch (err) {
      setError(err.response.data.errors[0])
      console.log(err.response)
    }
    setClicked(true)
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
                          {error && <p style={{ color: "red" }}>{error}</p>}

                          <Button color="secondary" onClick={() => push("")}>
                            Add Website
                          </Button>
                          <Button color="primary" className="m-2" type="submit">
                            Submit
                          </Button>
                          {!error && clicked && <Redirect to="websiteColor" />}
                          {redirect && <Redirect to="login" />}
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

export default WebsitesYouDisLike
