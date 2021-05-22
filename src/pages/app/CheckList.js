import React, { useState, useEffect } from "react"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"

const initialValues = {
  services: [],
  isWebDev: [],
  isLogoCreation: [],
  isMarketing: [],
  isPaidAd: [],
}

const CheckList = () => {
  const [error, setError] = useState(null)
  const [value, setValues] = useState()
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [services, setServices] = useState()

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setRedirect(true)
    }
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/checklist",
          localStorage.getItem("token")
        )
        console.log(data)
        if (data.checklist) {
          setId(data.checklist._id)
          data.checklist.isLogoCreation &&
            initialValues.isLogoCreation.push("isLogoCreation")
          data.checklist.isMarketing &&
            initialValues.isMarketing.push("isMarketing")

          data.checklist.isPaidAd && initialValues.isPaidAd.push("isPaidAd")
          data.checklist.isWebDev && initialValues.isWebDev.push("isWebDev")
          setServices({ ...data.checklist })
          setValues(initialValues)
        }
        setError(null)
      } catch (error) {
        setError(error.response)
      }
    }
    fetchData()
  }, [])

  services && console.log(services)
  function validate(values) {
    const errors = {}
    if (
      !values.isMarketing &&
      !values.isWebDev &&
      !values.isPaidAd &&
      !values.isLogoCreation
    ) {
      errors.services = "Required"
    }
    // if (values.services.length < 1) {
    //   errors.services = "You have to select atleast one service"
    // }

    return errors
  }
  async function handleSubmit(data) {
    console.log(initialValues)
    let newData = {}
    if (data.isWebDev.length > 0) {
      newData.isWebDev = true
    } else {
      newData.isWebDev = false
    }
    if (data.isLogoCreation.length > 0) {
      newData.isLogoCreation = true
    } else {
      newData.isLogoCreation = false
    }
    if (data.isMarketing.length > 0) {
      newData.isMarketing = true
    } else {
      newData.isMarketing = false
    }
    if (data.isPaidAd.length > 0) {
      newData.isPaidAd = true
    } else {
      newData.isPaidAd = false
    }

    let resData
    try {
      if (value) {
        resData = await patchData(
          "/checklist",
          id,
          newData,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/checklist",
          newData,
          localStorage.getItem("token")
        )
      }
      console.log(resData)
      setServices({ ...resData.data.checklist })
      // console.log(resData.data.checkList.services)
      // setServices([...resData.data.checkList.services])
      setError(null)
      services.length > 0 && console.log(services)
    } catch (error) {
      setError(error.response)
      console.log(error.response)
    }
    setClicked(true)
  }
  return (
    <div className="container">
      <Row>
        <Col sm={12}>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
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
                              Step2
                            </li>
                            <li
                              style={{ color: "blue" }}
                              className="breadcrumb-item"
                              aria-current="page"
                            >
                              Checklist
                            </li>
                          </ol>
                        </nav>
                        <Card className="overflow-hidden">
                          <div className="bg-primary bg-soft">
                            <Row>
                              <Col xs={7}>
                                <div className="text-primary p-4">
                                  <h5 className="text-primary">Checklist!</h5>
                                </div>
                              </Col>
                              <Col className="col-5 align-self-end">
                                <img
                                  src={profile}
                                  alt=""
                                  className="img-fluid"
                                />
                              </Col>
                            </Row>
                          </div>
                          <CardBody className="pt-0">
                            <div className="p-2">
                              <p>
                                Choose the services you want to engage in...
                              </p>
                              <div
                                role="group"
                                aria-labelledby="checkbox-group"
                              >
                                <label>
                                  <Field
                                    type="checkbox"
                                    name="isWebDev"
                                    value="isWebDev"
                                  />{" "}
                                  Website Development
                                </label>
                                <br />
                                <label>
                                  <Field
                                    type="checkbox"
                                    name="isPaidAd"
                                    value="isPaidAd"
                                  />{" "}
                                  Paid Advertising
                                </label>
                                <br />
                                <label>
                                  <Field
                                    type="checkbox"
                                    name="isMarketing"
                                    value="isMarketing"
                                  />{" "}
                                  Social Media Marketing
                                </label>
                                <br />
                                <label>
                                  <Field
                                    type="checkbox"
                                    name="isLogoCreation"
                                    value="isLogoCreation"
                                  />{" "}
                                  Logo Creation
                                </label>
                                <br />
                                <ErrorMessage
                                  component="div"
                                  style={{ color: "red" }}
                                  name="services"
                                />
                              </div>

                              <Button type="submit" color="primary">
                                Submit
                              </Button>
                              {clicked &&
                                !error &&
                                services &&
                                services.isLogoCreation && (
                                  <Redirect to="logoDesign" />
                                )}

                              {clicked &&
                                !error &&
                                services &&
                                services.isMarketing && (
                                  <Redirect to="posting" />
                                )}
                              {clicked &&
                                !error &&
                                services &&
                                services.isPaidAd && <Redirect to="services" />}
                              {clicked &&
                                !error &&
                                services &&
                                services.isWebDev && (
                                  <Redirect to="websiteGoals" />
                                )}

                              {redirect && <Redirect to="login" />}
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
        {/* <Col sm={2}></Col> */}
      </Row>
    </div>
  )
}

export default CheckList
