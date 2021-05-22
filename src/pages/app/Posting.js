import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"

import { Redirect } from "react-router-dom"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { divide } from "lodash"
import Step1 from "./Step1"

const initialValues = {
  posting: "",
  excludePostContent: "",
  feedback: "",
  webRefContent: "",
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
          "/social-media-post",
          localStorage.getItem("token")
        )
        data && console.log(data)
        if (data.post) {
          setId(data.post["_id"])
          initialValues.feedback = data.post.feedback
          initialValues.posting = data.post.posting

          initialValues.webRefContent = data.post.webRefContent

          initialValues.excludePostContent = data.post.excludePostContent

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
    if (values.posting.length < 3) {
      errors.posting = "Atleast 3 characters are required"
    }
    if (values.excludePostContent.length < 3) {
      errors.excludePostContent = "Atleast 3 characters are required"
    }
    if (values.feedback.length < 5) {
      errors.feedback = "Atleast 5 characters are required"
    }
    if (!values.webRefContent) {
      errors.webRefContent = "Required"
    }
    // if (!values.website) {
    //   errors.website = "Required"
    // }
    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    // if (data.webRefContent === "true") {
    //   data.webRefContent = true
    // } else {
    //   data.webRefContent = false
    // }
    try {
      if (value) {
        resData = await patchData(
          "/social-media-post",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/social-media-post",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
      // if (data.webRefContent) {
      //   data.webRefContent = "true"
      // } else {
      //   data.webRefContent = "false"
      // }
      console.log(resData)
    } catch (err) {
      // setError(err.response)
      console.log(err.response)
    }
    setRedirect(true)
    setClicked(true)
  }

  return (
    <div className="">
      <Row>
        {/* <Step1 active={3} /> */}
        <Col>
          <FormikComponent
            initialValues={initialValues}
            validate={validate}
            handleSubmit={handleSubmit}
          >
            <div className="account-pages  pt-sm-5">
              <div>
                <Row className="justify-content-center">
                  <Col sm={8}>
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Step1
                        </li>
                        <li
                          style={{ color: "blue" }}
                          className="breadcrumb-item"
                          aria-current="page"
                        >
                          Social Media Posting
                        </li>
                      </ol>
                    </nav>
                    <Card className="overflow-hidden">
                      <div className="bg-primary bg-soft">
                        <Row>
                          <Col xs={8}>
                            <div className="text-primary p-4">
                              <h5 className="text-primary">
                                Social Media Posting!
                              </h5>
                            </div>
                          </Col>
                          <Col className="col-4 align-self-end">
                            <img
                              src={profile}
                              alt=""
                              className="img-fluid"
                              style={{ height: 100 }}
                            />
                          </Col>
                        </Row>
                      </div>
                      <CardBody className="pt-0">
                        <div className="p-2">
                          <p>What tone of voice would you like?</p>
                          <Field
                            name="posting"
                            className="form-control"
                            placeholder="E.g. playful, fun, professional"
                            as="textarea"
                          />
                          <ErrorMessage
                            name="posting"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <br />
                          <p>What can't we talk about?</p>
                          <Field
                            as="textarea"
                            name="excludePostContent"
                            className="form-control"
                            placeholder="Please specify what we can’t post"
                          />
                          <ErrorMessage
                            name="excludePostContent"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <br />
                          <p id="my-radio-group">
                            Are there websites that we can use for articles/blog
                            content?
                          </p>

                          <Field
                            as="textarea"
                            name="webRefContent"
                            className="form-control"
                            placeholder="Please specify what we can’t post"
                          />

                          <br />
                          <ErrorMessage
                            name="webRefContent"
                            component="div"
                            style={{ color: "red" }}
                          />

                          <br />
                          <p>
                            Do you have any other comments or feedback regarding
                            posting?
                          </p>
                          <Field
                            as="textarea"
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

                          {/* {!error && clicked && (
                            <Redirect to="socialAccounts" />
                          )} */}
                          {/* {redirect && <Redirect to="login" />} */}
                          {redirect && <Redirect to="fbUrl" />}
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
                  </Col>
                </Row>
              </div>
            </div>
          </FormikComponent>
        </Col>
      </Row>
    </div>
  )
}

export default Posting
