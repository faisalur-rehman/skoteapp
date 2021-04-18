import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
import { formPostData, formGetData, patchData } from "./ApiRequest"

const initialValues = {
  has_content_ready: "",
  need_help: "",
}

const WebsiteContent = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/services/design/content",
          localStorage.getItem("token")
        )
        console.log(data.content)
        if (data.content) {
          setId(data.content["_id"])
          if (data.content.has_content_ready) {
            initialValues.has_content_ready = "true"
          } else {
            initialValues.has_content_ready = "false"
          }
          if (data.content.need_help) {
            initialValues.need_help = "true"
          } else {
            initialValues.need_help = "false"
          }

          setValues(initialValues)
          setError(null)
        }
        console.log(initialValues)
      } catch (error) {
        setError(error.response)
      }
    }
    fetchData()
  }, [])

  const validate = values => {
    const errors = {}
    if (!values.has_content_ready) {
      errors.has_content_ready = "Required"
    }
    if (!values.need_help) {
      errors.need_help = "Required"
    }
    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    if (data.has_content_ready === "true") {
      data.has_content_ready = true
    } else {
      data.has_content_ready = false
    }
    if (data.need_help === "true") {
      data.need_help = true
    } else {
      data.need_help = false
    }
    try {
      if (value) {
        resData = await patchData(
          "/services/design/content",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/design/content",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
      setSubmitted(true)
      if (data.has_content_ready) {
        data.has_content_ready = "true"
      } else {
        data.has_content_ready = "false"
      }
      if (data.need_help) {
        data.need_help = "true"
      } else {
        data.need_help = "false"
      }
      console.log(resData)
    } catch (err) {
      setError(err.response.data.errors)
      console.log(err.response)
      setSubmitted(false)
    }
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
              validate={validate}
            >
              <p>Do you have upcoming website content ready?</p>

              <label>
                <Field type="radio" name="has_content_ready" value="true" />
                Yes
              </label>
              <br />
              <label>
                <Field type="radio" name="has_content_ready" value="false" />
                No
              </label>
              <br />
              <ErrorMessage
                name="has_content_ready"
                component="div"
                style={{ color: "red" }}
              />
              <p>Do you need help for website content creation?</p>

              <label>
                <Field type="radio" name="need_help" value="true" />
                Yes
              </label>
              <br />
              <label>
                <Field type="radio" name="need_help" value="false" />
                No
              </label>
              <br />
              <ErrorMessage
                name="need_help"
                component="div"
                style={{ color: "red" }}
              />

              <div>
                <Button
                  type="submit"
                  color="primary"
                  className="w-md mt-3"
                  WebsiteContent
                >
                  Submit
                </Button>
              </div>
            </FormikComponent>
            {submitted && (
              <Button color="success" onClick={() => setClicked(true)}>
                Next Section
              </Button>
            )}
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default WebsiteContent
