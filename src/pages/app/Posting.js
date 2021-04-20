import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
import { Redirect } from "react-router-dom"
import { formPostData, formGetData, patchData } from "./ApiRequest"

const initialValues = {
  voice_tone: "",
  no_post_specification: "",
  feedback: "",
  is_found: "",
  // website: "",
}

const Posting = () => {
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
          "/services/social-media/post",
          localStorage.getItem("token")
        )
        console.log(data)
        if (data.payload) {
          setId(data.payload["_id"])
          initialValues.feedback = data.payload.feedback
          initialValues.voice_tone = data.payload.voice_tone
          if (data.payload.is_found) {
            initialValues.is_found = "true"
            initialValues.website = data.payload.website
          } else {
            initialValues.is_found = "false"
            initialValues.website = ""
          }
          initialValues.no_post_specification =
            data.payload.no_post_specification

          setValues(initialValues)
        }
        setError(null)
      } catch (err) {
        console.log(err.response)
        // setError(err.response.data.message)
      }
    }
    fetchData()
  }, [])

  function validate(values) {
    const errors = {}
    if (values.voice_tone.length < 3) {
      errors.voice_tone = "Atleast 3 characters are required"
    }
    if (values.no_post_specification.length < 3) {
      errors.no_post_specification = "Atleast 3 characters are required"
    }
    if (values.feedback.length < 5) {
      errors.feedback = "Atleast 5 characters are required"
    }
    if (!values.is_found) {
      errors.is_found = "Required"
    }
    // if (!values.website) {
    //   errors.website = "Required"
    // }
    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    if (data.is_found === "true") {
      data.is_found = true
    } else {
      data.is_found = false
    }
    try {
      if (value) {
        resData = await patchData(
          "/services/social-media/post",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/social-media/post",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
      if (data.is_found) {
        data.is_found = "true"
      } else {
        data.is_found = "false"
      }
      console.log(resData)
    } catch (err) {
      // setError(err.response)
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
            <FormikComponent
              initialValues={initialValues}
              handleSubmit={handleSubmit}
              // validate={validate}
            >
              <p>What tone of voice would you like?</p>
              <Field
                name="voice_tone"
                className="form-control"
                placeholder="E.g. playful, fun, professional"
              />
              <ErrorMessage
                name="voice_tone"
                component="div"
                style={{ color: "red" }}
              />
              <br />
              <p>What can't we talk about?</p>
              <Field
                name="no_post_specification"
                className="form-control"
                placeholder="Please specify what we can’t post"
              />
              <ErrorMessage
                name="no_post_specification"
                component="div"
                style={{ color: "red" }}
              />
              <br />
              <p id="my-radio-group">
                Are there websites that we can use for articles/blog content?
              </p>

              <label>
                <Field type="radio" name="is_found" value="true" />
                Yes
              </label>
              <br />
              <label>
                <Field type="radio" name="is_found" value="false" />
                No
              </label>
              <br />
              <ErrorMessage
                name="picked"
                component="div"
                style={{ color: "red" }}
              />

              <br />
              <p>
                Do you have any other comments or feedback regarding posting?
              </p>
              <Field
                name="feedback"
                className="form-control"
                placeholder="Your comments"
              />
              <ErrorMessage
                name="feedback"
                component="div"
                style={{ color: "red" }}
              />
              <br />

              {error && (
                <span style={{ color: "red" }}>
                  {error}.First enroll in social media marketing in the
                  Checklist section
                </span>
              )}

              <div>
                <Button type="submit" className="w-md mt-2" color="primary">
                  Submit
                </Button>
              </div>
            </FormikComponent>
            {!error && clicked && <Redirect to="socialAccounts" />}
            {redirect && <Redirect to="login" />}
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default Posting
