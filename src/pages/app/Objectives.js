import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
import { Redirect } from "react-router-dom"
import { formPostData, formGetData, patchData } from "./ApiRequest"

const initialValues = {
  achievement: "",
  success: "",
}

const WebsiteContent = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/services/wg-objective",
          localStorage.getItem("token")
        )
        if (data) {
          setId(data.objective["_id"])
          initialValues.achievement = data.objective.achievement
          initialValues.success = data.objective.success
          setValues(initialValues)
        }
        console.log(initialValues)
        setError(null)
      } catch (err) {
        console.log(err.response)
        setError(err.response)
      }
    }
    fetchData()
  }, [])

  const validate = values => {
    const errors = {}
    if (!values.achievement) {
      errors.achievement = "Required"
    }
    if (!values.success) {
      errors.success = "Required"
    }
    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (value) {
        resData = await patchData(
          "/services/wg-objective",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/wg-objective",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
      console.log(resData)
    } catch (err) {
      setError(err.response)
      console.log(err.response)
    }
  }

  return (
    <div className="page-content">
      <div className="container">
        <Row>
          <Col sm={2}></Col>

          <Col sm={8}>
            <FormikComponent
              initialValues={initialValues}
              handleSubmit={handleSubmit}
              validate={validate}
            >
              <p>Your achievements and Success?</p>
              <Field
                name="achievement"
                className="form-control"
                placeholder="Achievements"
              />
              <ErrorMessage
                name="achievement"
                component="div"
                style={{ color: "red" }}
              />
              <br />
              <Field
                name="success"
                className="form-control"
                placeholder="Success"
              />
              <ErrorMessage
                name="success"
                component="div"
                style={{ color: "red" }}
              />

              <div>
                <Button type="submit" className="w-md mt-2" color="primary">
                  Submit
                </Button>
                {!error && clicked && <Redirect to="websiteContent" />}
              </div>
            </FormikComponent>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default WebsiteContent