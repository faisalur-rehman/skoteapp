import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"

const initialValues = {
  login_url: "",
  username: "",
  password: "",
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
          "/services/social-media/web-info",
          localStorage.getItem("token")
        )
        const response = await formGetData(
          "/services/checklist",
          localStorage.getItem("token")
        )
        setServices([...response.data.checkList.services])
        console.log(data.payload)
        if (data.payload) {
          setId(data.payload["_id"])
          initialValues.login_url = data.payload.login_url
          initialValues.username = data.payload.username
          initialValues.password = data.payload.password
          setValues(initialValues)
        }
        setError(null)
      } catch (error) {
        setError(error.response)
      }
    }
    fetchData()
  }, [])

  const validate = values => {
    const errors = {}
    if (!values.login_url) {
      errors.login_url = "Required"
    }
    if (!values.username) {
      errors.username = "Required"
    }
    if (!values.password) {
      errors.password = "Required"
    }
    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)

    try {
      if (value) {
        resData = await patchData(
          "/services/social-media/web-info",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/social-media/web-info",
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
                          Web Info
                        </li>
                      </ol>
                    </nav>
                    <Card className="overflow-hidden">
                      <div className="bg-primary bg-soft">
                        <Row>
                          <Col xs={7}>
                            <div className="text-primary p-4">
                              <h5 className="text-primary">Website Info!</h5>
                            </div>
                          </Col>
                          <Col className="col-5 align-self-end">
                            <img src={profile} alt="" className="img-fluid" />
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
                            name="login_url"
                            className="form-control"
                            placeholder="e.g. https://sicurogroup.com"
                          />
                          <br />
                          <ErrorMessage
                            name="login_url"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <p>Username:</p>
                          <Field
                            name="username"
                            className="form-control"
                            placeholder="Username"
                          />
                          <ErrorMessage
                            name="username"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <p>Password:</p>
                          <Field
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="password"
                          />
                          <ErrorMessage
                            name="password"
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
                          {clicked && <Redirect to="dashboard" />}
                          {clicked &&
                            services.length > 0 &&
                            services.includes("logo_creation") && (
                              <Redirect to="logoDesign" />
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

export default AccessAccount
