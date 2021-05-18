import React, { useState, useEffect } from "react"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"
import Step2 from "./Step2"

const initialValues = {
  goal: "",
  otherGoal: "",
}

const WebsiteGoals = () => {
  const [error, setError] = useState(null)
  const [values, setValues] = useState()
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
          "/services/wg-goal",
          localStorage.getItem("token")
        )
        console.log(data.goal)
        if (data.goal) {
          setId(data.goal["_id"])
          if (
            data.goal.goal === "Promote a brand and image" ||
            data.goal.goal === "Promote a product range" ||
            data.goal.goal === "Improve access information" ||
            data.goal.goal === "Create a web presence" ||
            data.goal.goal === "Increase sales lead"
          ) {
            initialValues.goal = data.goal.goal
          } else {
            initialValues.goal = "other"
            initialValues.otherGoal = data.goal.goal
          }
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
    if (!values.otherGoal && values.goal === "other") {
      errors.otherGoal = "Required"
    }
    return errors
  }
  async function handleSubmit(data) {
    let newData = {
      goal: "",
    }
    console.log(data)
    if (data.goal !== "other") {
      newData.goal = data.goal
    } else {
      newData.goal = data.otherGoal
    }
    console.log(newData)
    let resData
    try {
      if (values) {
        resData = await patchData(
          "/services/wg-goal",
          id,
          newData,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/wg-goal",
          newData,
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
        <Col sm={10}>
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
                              Goals
                            </li>
                          </ol>
                        </nav>
                        <Card className="overflow-hidden">
                          <div className="bg-primary bg-soft">
                            <Row>
                              <Col xs={7}>
                                <div className="text-primary p-4">
                                  <h5 className="text-primary">
                                    Website Goals!
                                  </h5>
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
                              />
                              <br />

                              <ErrorMessage
                                name="goal"
                                component="div"
                                style={{ color: "red" }}
                              />
                              <div>
                                <Button
                                  type="submit"
                                  className="w-md mt-3"
                                  color="primary"
                                >
                                  Submit
                                </Button>
                              </div>
                              {!error && clicked && (
                                <Redirect to="objectives" />
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

export default WebsiteGoals
