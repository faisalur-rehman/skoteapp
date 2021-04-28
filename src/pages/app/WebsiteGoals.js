import React, { useState, useEffect } from "react"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"

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
                              <label htmlFor="role">Goals: </label>
                              <br />
                              <label>
                                <Field
                                  type="radio"
                                  name="goal"
                                  value="Promote a brand and image"
                                />
                                Promote a brand and image
                              </label>
                              <br />
                              <label>
                                <Field
                                  type="radio"
                                  name="goal"
                                  value="Promote a product range"
                                />
                                Promote a product range
                              </label>
                              <br />

                              <label>
                                <Field
                                  type="radio"
                                  name="goal"
                                  value="Improve access information"
                                />
                                Improve access information
                              </label>
                              <br />
                              <label>
                                <Field
                                  type="radio"
                                  name="goal"
                                  value="Create a web presence"
                                />
                                Create a web presence
                              </label>
                              <br />

                              <label>
                                <Field
                                  type="radio"
                                  name="goal"
                                  value="Increase sales lead"
                                />
                                Increase sales lead
                              </label>
                              <br />
                              <label>
                                <Field type="radio" name="goal" value="other" />
                                Other
                              </label>
                              {values.goal === "other" && (
                                <div>
                                  <p>Please specify</p>
                                  <Field
                                    type="text"
                                    name="otherGoal"
                                    className="form-control"
                                  />
                                  <br />
                                  <ErrorMessage
                                    name="otherGoal"
                                    component="div"
                                    style={{ color: "red" }}
                                  />
                                </div>
                              )}
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
