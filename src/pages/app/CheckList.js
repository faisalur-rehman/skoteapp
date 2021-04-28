import React, { useState, useEffect } from "react"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"

const initialValues = {
  services: [],
}

const CheckList = () => {
  const [error, setError] = useState(null)
  const [value, setValues] = useState()
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
          "/services/checklist",
          localStorage.getItem("token")
        )
        if (data.checkList) {
          setId(data.checkList["_id"])
          data.checkList.services.map(service =>
            initialValues.services.push(service)
          )
          setValues(initialValues)
        }
        setError(null)
      } catch (error) {
        setError(error.response)
      }
    }
    fetchData()
  }, [])

  function validate(values) {
    const errors = {}
    if (values.services.length < 1) {
      errors.services = "You have to select atleast one service"
    }

    return errors
  }
  async function handleSubmit(data) {
    let resData
    try {
      if (value) {
        resData = await patchData(
          "/services/checklist",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/checklist",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
    } catch (error) {
      setError(error.response)
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
                              <p>CheckList</p>
                              <div
                                role="group"
                                aria-labelledby="checkbox-group"
                              >
                                <label>
                                  <Field
                                    type="checkbox"
                                    name="services"
                                    value="web_development"
                                  />{" "}
                                  Website Development
                                </label>
                                <br />
                                <label>
                                  <Field
                                    type="checkbox"
                                    name="services"
                                    value="paid_advertising"
                                  />{" "}
                                  Paid Advertising
                                </label>
                                <br />
                                <label>
                                  <Field
                                    type="checkbox"
                                    name="services"
                                    value="social_media_marketing"
                                  />{" "}
                                  Social Media Marketing
                                </label>
                                <br />
                                <label>
                                  <Field
                                    type="checkbox"
                                    name="services"
                                    value="logo_creation"
                                  />{" "}
                                  Logo Creation
                                </label>
                                <br />
                                <label>
                                  <Field
                                    type="checkbox"
                                    name="services"
                                    value="graphic_designing"
                                  />{" "}
                                  Graphic Design
                                </label>
                                <br />
                                <label>
                                  <Field
                                    type="checkbox"
                                    name="services"
                                    value="productivity_and_automation"
                                  />{" "}
                                  Productivity and Automation
                                </label>
                                <ErrorMessage
                                  component="div"
                                  style={{ color: "red" }}
                                  name="services"
                                />
                              </div>

                              <Button type="submit" color="primary">
                                Submit
                              </Button>
                              {!error && clicked && (
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
