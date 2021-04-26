import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"

import { Redirect } from "react-router-dom"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { divide } from "lodash"

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
    <div className="container">
      <Row>
        <Col>
          <FormikComponent
            initialValues={initialValues}
            validate={validate}
            handleSubmit={handleSubmit}
          >
            <div className="account-pages my-5 pt-sm-5">
              <Container>
                <Row className="justify-content-center">
                  <Col md={8} lg={6} xl={5}>
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Step5
                        </li>
                        <li
                          style={{ color: "blue" }}
                          className="breadcrumb-item"
                          aria-current="page"
                        >
                          Posting
                        </li>
                      </ol>
                    </nav>
                    <Card className="overflow-hidden">
                      <div className="bg-primary bg-soft">
                        <Row>
                          <Col xs={7}>
                            <div className="text-primary p-4">
                              <h5 className="text-primary">Posting!</h5>
                            </div>
                          </Col>
                          <Col className="col-5 align-self-end">
                            <img src={profile} alt="" className="img-fluid" />
                          </Col>
                        </Row>
                      </div>
                      <CardBody className="pt-0">
                        <div className="p-2">
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
                            Are there websites that we can use for articles/blog
                            content?
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
                            Do you have any other comments or feedback regarding
                            posting?
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
                              {error}.First enroll in social media marketing in
                              the Checklist section
                            </span>
                          )}
                          {!error && clicked && (
                            <Redirect to="socialAccounts" />
                          )}
                          {redirect && <Redirect to="login" />}
                          <div>
                            <Button
                              type="submit"
                              className="w-md mt-2"
                              color="primary"
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    <div className="mt-5 text-center">
                      <p>
                        © {new Date().getFullYear()} Sicuro Group. Crafted with{" "}
                        <i className="mdi mdi-heart text-danger" /> by
                        9thDimension
                      </p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </FormikComponent>
        </Col>
      </Row>
    </div>
  )
}

export default Posting
