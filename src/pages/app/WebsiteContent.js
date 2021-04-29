import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"

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
  const [services, setServices] = useState([])
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setRedirect(true)
    }
    // async function fetchData1() {
    //   try {
    //     const { data } = await formGetData(
    //       "/services/checklist",
    //       localStorage.getItem("token")
    //     )
    //     setServices([...data.checkList.services])
    //     console.log(services)
    //     // console.log(data.checkList.services)
    //   } catch (error) {
    //     setError(error.response)
    //   }
    // }
    // fetchData1()
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/services/design/content",
          localStorage.getItem("token")
        )
        const response = await formGetData(
          "/services/checklist",
          localStorage.getItem("token")
        )
        setServices([...response.data.checkList.services])
        // console.log(data.content)
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
        // setError(error.response)
      }
    }
    fetchData()
  }, [])
  services.length > 0 && console.log(services)
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
                          Step3
                        </li>
                        <li
                          style={{ color: "blue" }}
                          className="breadcrumb-item"
                          aria-current="page"
                        >
                          Website Content
                        </li>
                      </ol>
                    </nav>
                    <Card className="overflow-hidden">
                      <div className="bg-primary bg-soft">
                        <Row>
                          <Col xs={7}>
                            <div className="text-primary p-4">
                              <h5 className="text-primary">Website Content!</h5>
                            </div>
                          </Col>
                          <Col className="col-5 align-self-end">
                            <img src={profile} alt="" className="img-fluid" />
                          </Col>
                        </Row>
                      </div>
                      <CardBody className="pt-0">
                        <div className="p-2">
                          <p>Do you have upcoming website content ready?</p>

                          <label>
                            <Field
                              type="radio"
                              name="has_content_ready"
                              value="true"
                            />
                            Yes
                          </label>
                          <br />
                          <label>
                            <Field
                              type="radio"
                              name="has_content_ready"
                              value="false"
                            />
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
                            <Field
                              type="radio"
                              name="need_help"
                              value="false"
                            />
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
                          {clicked && <Redirect to="dashboard" />}
                          {submitted && (
                            <Button
                              color="success"
                              onClick={() => setClicked(true)}
                            >
                              Next Section
                            </Button>
                          )}

                          {clicked &&
                            services.length > 0 &&
                            services.includes("logo_creation") && (
                              <Redirect to="logoDesign" />
                            )}
                          {clicked &&
                            services.length > 0 &&
                            services.includes("paid_advertising") && (
                              <Redirect to="services" />
                            )}
                          {redirect && <Redirect to="login" />}
                        </div>
                      </CardBody>
                    </Card>
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

export default WebsiteContent
