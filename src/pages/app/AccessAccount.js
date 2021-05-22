import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"

import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import Step5 from "./Step5"

const initialValues = {
  has_difference_access: "",
  info: "",
}

const AccessAccount = () => {
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
          "/services/social-media/account-info",
          localStorage.getItem("token")
        )
        console.log(data.payload)
        if (data.payload) {
          setId(data.payload["_id"])
          if (data.payload.has_difference_access) {
            initialValues.has_difference_access = "true"
          } else {
            initialValues.has_difference_access = "false"
          }
          initialValues.info = data.payload.info
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
    if (!values.has_difference_access) {
      errors.has_difference_access = "Required"
    }
    if (!values.info) {
      errors.info = "Required"
    }
    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    if (data.has_difference_access === "true") {
      data.has_difference_access = true
    } else {
      data.has_difference_access = false
    }
    try {
      if (value) {
        resData = await patchData(
          "/services/social-media/account-info",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/social-media/account-info",
          data,
          localStorage.getItem("token")
        )
      }
      if (data.has_difference_access) {
        data.has_difference_access = "true"
      } else {
        data.has_difference_access = "false"
      }
      setError(null)
      console.log(resData)
    } catch (err) {
      setError(err.response.data.errors)
      console.log(err.response)
    }
    setClicked(true)
    console.log(error)
  }

  return (
    <div className="container">
      <Row>
        <Step5 active={3} />
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
                          Access Account
                        </li>
                      </ol>
                    </nav>
                    <Card className="overflow-hidden">
                      <div className="bg-primary bg-soft">
                        <Row>
                          <Col xs={7}>
                            <div className="text-primary p-4">
                              <h5 className="text-primary">Website Style!</h5>
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
                            Would you like to use a different way for Sicuro
                            Group to access your account?
                          </p>

                          <label>
                            <Field
                              type="radio"
                              name="has_difference_access"
                              value="true"
                            />
                            Yes
                          </label>
                          <br />
                          <label>
                            <Field
                              type="radio"
                              name="has_difference_access"
                              value="false"
                            />
                            No
                          </label>
                          <br />
                          <ErrorMessage
                            name="has_difference_access"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <p>Do you have an Ad account ID?</p>
                          <label>
                            <Field
                              type="radio"
                              name="info"
                              value="Yes I have an ad account number"
                            />
                            Yes I have an ad account number
                          </label>
                          <br />
                          <label>
                            <Field
                              type="radio"
                              name="info"
                              value="I am not sure"
                            />
                            I’m not sure
                          </label>
                          <br />

                          <label>
                            <Field
                              type="radio"
                              name="info"
                              value="I don't have an ad account number"
                            />
                            No
                          </label>
                          <br />
                          <ErrorMessage
                            name="info"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <div>
                            <Button
                              type="submit"
                              color="primary"
                              className="w-md mt-3"
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                        {!error && clicked && <Redirect to="webInfo" />}
                        {redirect && <Redirect to="login" />}
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
