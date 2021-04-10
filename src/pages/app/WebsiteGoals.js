import React, { useState, useEffect } from "react"
import { Row, Col, Button } from "reactstrap"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"

const AboutForm = () => {
  const [error, setError] = useState(null)
  const [values, setValues] = useState()
  const [id, setId] = useState()

  //   useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         const { data } = await formGetData(
  //           "/about",
  //           localStorage.getItem("token")
  //         )
  //         setId(data.about["_id"])
  //         initialValues.name = data.about.name
  //         initialValues.role = data.about.role
  //         setValues(initialValues)
  //         setError(null)
  //       } catch (error) {
  //         console.log(error)
  //         setError(error.response)
  //       }
  //     }
  //     fetchData()
  //   }, [])

  function validate(values) {
    const errors = {}
    if (!values.objectives) {
      errors.objectives = "Required"
    }
    if (!values.goals) {
      errors.goals = "Required"
    }
    if (!values.otherGoals) {
      errors.otherGoals = "Required"
    }
    return errors
  }
  async function handleSubmit(data) {
    let resData
    // try {
    //   if (values) {
    //     resData = await patchData(
    //       "/aout",
    //       id,
    //       data,
    //       localStorage.getItem("token")
    //     )
    //   } else {
    //     resData = await formPostData(
    //       "/aout",
    //       data,
    //       localStorage.getItem("token")
    //     )
    //   }
    //   setError(null)
    //   console.log(resData)
    // } catch (error) {
    //   setError(error.response)
    //   console.log(error.response)
    // }
    console.log(data)
  }
  return (
    <div className="page-content">
      <div className="container">
        <Row>
          <Col sm={2}></Col>
          <Col sm={8}>
            <Formik
              initialValues={{
                objectives: "",
                goals: "",
                otherGoals: "",
              }}
              validate={validate}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
                  <label htmlFor="name">Objectives* : </label>
                  <Field name="objectives" className="form-control" />
                  <ErrorMessage
                    name="objectives"
                    component="div"
                    style={{ color: "red" }}
                  />
                  <br />
                  <label htmlFor="role">Goals: </label>
                  <br />
                  <label>
                    <Field
                      type="radio"
                      name="goals"
                      value="Promote a brand and image"
                    />
                    Promote a brand and image
                  </label>
                  <br />
                  <label>
                    <Field
                      type="radio"
                      name="goals"
                      value="Promote a product range"
                    />
                    Promote a product range
                  </label>
                  <br />

                  <label>
                    <Field
                      type="radio"
                      name="goals"
                      value="Promote a brand and image"
                    />
                    Improve access information
                  </label>
                  <br />
                  <label>
                    <Field
                      type="radio"
                      name="goals"
                      value="Promote a product range"
                    />
                    Create a web presence
                  </label>
                  <br />

                  <label>
                    <Field
                      type="radio"
                      name="goals"
                      value="Promote a product range"
                    />
                    Increase sales lead
                  </label>
                  <br />
                  <label>
                    <Field type="radio" name="goals" value="other" />
                    Other
                  </label>
                  {values.goals === "other" && (
                    <div>
                      <p>Please specify</p>
                      <Field
                        type="text"
                        name="otherGoals"
                        className="form-control"
                      />
                      <br />
                      <ErrorMessage
                        name="otherGoals"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  )}
                  <ErrorMessage
                    name="goals"
                    component="div"
                    style={{ color: "red" }}
                  />
                  <div>
                    <Button type="submit" className="w-md mt-3" color="primary">
                      Submit
                    </Button>
                  </div>
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

export default AboutForm
