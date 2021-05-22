import React, { useState, useEffect } from "react"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"
import Step2 from "./Step2"

const initialValues = {
  goal: "",
  objective: "",
  sitemap: "",
  callToAction: "",
  AdvancedFeature: "",
}

const WebsiteGoals = () => {
  const [error, setError] = useState(null)
  const [values, setValues] = useState()
  const [services, setServices] = useState()
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
          "/web-goal",
          localStorage.getItem("token")
        )
        const response = await formGetData(
          "/checklist",
          localStorage.getItem("token")
        )
        console.log(response)
        setServices({ ...response.data.checklist })
        console.log(data)
        if (data.webGoal) {
          setId(data.webGoal["_id"])

          initialValues.goal = data.webGoal.goal
          initialValues.advancedFeature = data.webGoal.advancedFeature
          initialValues.sitemap = data.webGoal.sitemap
          initialValues.callToAction = data.webGoal.callToAction
          initialValues.objective = data.webGoal.objective

          setValues(initialValues)
        }
        setError(null)
      } catch (error) {
        console.log(error)
        setError(error.response)
      }
    }
    fetchData()
  }, [])

  function validate(values) {
    const errors = {}
    if (!values.goal) {
      errors.goal = "Required"
    }

    if (!values.objective) {
      errors.objective = "Required"
    }
    if (!values.sitemap) {
      errors.sitemap = "Required"
    }
    if (!values.callToAction) {
      errors.callToAction = "Required"
    }
    if (!values.advancedFeature) {
      errors.advancedFeature = "Required"
    }
    // if (!values.otherGoal && values.goal === "other") {
    //   errors.otherGoal = "Required"
    // }
    return errors
  }
  async function handleSubmit(data) {
    let newData = {
      goal: "",
    }
    // console.log(data)
    // if (data.goal !== "other") {
    //   newData.goal = data.goal
    // } else {
    //   newData.goal = data.otherGoal
    // }
    console.log(newData)
    let resData
    try {
      if (values) {
        resData = await patchData(
          "/web-goal",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/web-goal",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
      console.log(resData)
    } catch (error) {
      setError(error.response)
      console.log(error.response)
    }
    setClicked(true)
  }
  return (
    <div className="container">
      <Row>
        <Step2 active={0} />
        <Col>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <div className="account-pages  pt-sm-5">
                  <Container>
                    <Row className="justify-content-center">
                      <Col sm={8}>
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
                              Goals
                            </li>
                          </ol>
                        </nav>
                        <Card className="overflow-hidden">
                          <div className="bg-primary bg-soft">
                            <Row>
                              <Col xs={8}>
                                <div className="text-primary p-4">
                                  <h5 className="text-primary">
                                    Website Goals!
                                  </h5>
                                </div>
                              </Col>
                              <Col className="col-4 align-self-end"></Col>
                            </Row>
                          </div>
                          <CardBody className="pt-0">
                            <div className="p-2">
                              <label htmlFor="role">
                                Please enter the most important goal of your
                                website from the list below in the area
                                opposite: o Promote a brand and image o Promote
                                a product range o Improve access to information
                                o Create a web presence o Increase sales leads o
                                Other – (please specify){" "}
                              </label>
                              <br />

                              <Field
                                as="textarea"
                                name="goal"
                                className="form-control"
                                placeholder="goal"
                              />
                              <br />

                              <ErrorMessage
                                name="goal"
                                component="div"
                                style={{ color: "red" }}
                              />
                              <br />
                              <p>
                                Does your website require any specific extra
                                functionality? (e.g. online store, product
                                catalogue, online directory, advanced search
                                functionality, advanced online forms)
                              </p>
                              <Field
                                name="advancedFeature"
                                className="form-control"
                                placeholder="Advanced Feature"
                                as="textarea"
                              />
                              <ErrorMessage
                                name="advancedFeature"
                                component="div"
                                style={{ color: "red" }}
                              />
                              <br />
                              <label htmlFor="name">
                                Please describe the action you would like
                                visitors to take after visiting your website.
                                (e.g. call a phone number, complete a form, make
                                a comment etc.){" "}
                              </label>
                              <Field
                                name="callToAction"
                                className="form-control"
                                as="textarea"
                                placeholder="action"
                              />
                              <ErrorMessage
                                name="callToAction"
                                component="div"
                                style={{ color: "red" }}
                              />
                              <br />
                              <p>
                                What does your website need to achieve for your
                                business? What will make this website a success
                                for you?
                              </p>
                              <Field
                                name="objective"
                                as="textarea"
                                className="form-control"
                                placeholder="Indication"
                              />
                              <ErrorMessage
                                name="objective"
                                component="div"
                                style={{ color: "red" }}
                              />
                              <br />
                              <p>
                                Do you have any indication of what pages or
                                sections the website should be made of? Please
                                outline the pages and subpages required. (e.g.
                                Home, About, Services/Products, Contact etc)
                              </p>
                              <Field
                                name="sitemap"
                                as="textarea"
                                className="form-control"
                                placeholder="sitemap"
                              />
                              <ErrorMessage
                                name="sitemap"
                                component="div"
                                style={{ color: "red" }}
                              />
                              <br />
                              <div>
                                <Button
                                  type="submit"
                                  className="w-md mt-3"
                                  color="primary"
                                >
                                  Submit
                                </Button>
                              </div>
                              {clicked && !error && <Redirect to="dashboard" />}
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

                              {/* {!error && clicked && (
                                <Redirect to="objectives" />
                              )} */}
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

export default WebsiteGoals
