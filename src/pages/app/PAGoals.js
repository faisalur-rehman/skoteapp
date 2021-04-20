import React, { useState, useEffect } from "react"
import { Row, Col, Button } from "reactstrap"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"

const initialValues = {
  goal: "",
  otherGoal: "",
}

const PAGoals = () => {
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
          "/services/advertise/offer-goal",
          localStorage.getItem("token")
        )
        console.log(data)
        if (data.payload) {
          setId(data.payload["_id"])
          if (
            data.payload.goal === "Promote a brand and image" ||
            data.payload.goal === "Promote a product range" ||
            data.payload.goal === "Improve access information" ||
            data.payload.goal === "Create a web presence" ||
            data.payload.goal === "Increase sales lead"
          ) {
            initialValues.goal = data.payload.goal
          } else {
            initialValues.goal = "other"
            initialValues.otherGoal = data.payload.goal
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
          "/services/advertise/offer-goal",
          id,
          newData,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/advertise/offer-goal",
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
    <div className="page-content">
      <div className="container">
        <Row>
          <Col sm={2}></Col>
          <Col sm={8}>
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
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
                    <Button type="submit" className="w-md mt-3" color="primary">
                      Submit
                    </Button>
                  </div>
                  {!error && clicked && <Redirect to="paTargetMarket" />}
                  {redirect && <Redirect to="login" />}
                </Form>
              )}
            </Formik>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default PAGoals
