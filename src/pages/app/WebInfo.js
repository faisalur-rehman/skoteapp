import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import Step1 from "./Step1"

const initialValues = {
  loginURL: "",

  loginDetail: "",
}

const AccessAccount = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  const [services, setServices] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setRedirect(true)
    }
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/social-media-web",
          localStorage.getItem("token")
        )
        const response = await formGetData(
          "/checklist",
          localStorage.getItem("token")
        )
        // response && setServices([...response.data.checkList.services])
        console.log(data)
        if (data.webDetail) {
          setId(data.webDetail["_id"])
          initialValues.loginURL = data.webDetail.loginURL
          initialValues.loginDetail = data.webDetail.loginDetail
          setValues(initialValues)
        }
        setError(null)
      } catch (error) {
        setError(error.response)
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const validate = values => {
    const errors = {}
    if (!values.loginURL) {
      errors.loginURL = "Required"
    }
    if (!values.loginDetail) {
      errors.loginDetail = "Required"
    }

    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)

    try {
      if (value) {
        resData = await patchData(
          "/social-media-web",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/social-media-web",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
      setSubmitted(true)

      console.log(resData)
    } catch (err) {
      setError(err.response.data.errors)
      console.log(err.response)
      setSubmitted(false)
    }
    setRedirect(true)
  }

  return (
    <div className="">
      <Row>
        <Step1 active={5} />
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
                          Web Info
                        </li>
                      </ol>
                    </nav>
                    <Card className="overflow-hidden">
                      <div className="bg-primary bg-soft">
                        <Row>
                          <Col xs={8}>
                            <div className="text-primary p-4">
                              <h5 className="text-primary">Website Info!</h5>
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
                          <p>
                            In order to add analytics, we need access to the
                            backend of your website.Please include your login
                            url
                          </p>

                          <Field
                            name="loginURL"
                            className="form-control"
                            placeholder="e.g. https://sicurogroup.com"
                            as="textarea"
                          />
                          <br />
                          <ErrorMessage
                            name="loginURL"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <p>Login Details:</p>
                          <Field
                            name="loginDetail"
                            className="form-control"
                            placeholder="login details"
                            as="textarea"
                          />
                          <ErrorMessage
                            name="loginDetail"
                            component="div"
                            style={{ color: "red" }}
                          />

                          <br />
                          <div>
                            <Button
                              type="submit"
                              color="primary"
                              className="w-md mt-3"
                            >
                              Submit
                            </Button>
                          </div>
                          {submitted && (
                            <Button
                              color="success"
                              onClick={() => setClicked(true)}
                            >
                              Next Section
                            </Button>
                          )}
                          {/* {clicked && <Redirect to="dashboard" />}
                          {clicked &&
                            services.length > 0 &&
                            services.includes("logo_creation") && (
                              <Redirect to="logoDesign" />
                            )} */}
                          {/* {redirect && <Redirect to="login" />} */}
                          {/* {redirect && <Redirect to="logoDesign" />} */}
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

export default AccessAccount
