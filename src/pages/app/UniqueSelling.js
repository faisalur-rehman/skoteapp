import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "./ApiRequest"

const initialValues = { description: "", strength: "", reason_to_choose: "" }
const UniqueSelling = () => {
  const [values, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/business/usp",
          localStorage.getItem("token")
        )
        console.log(data)
        if (data.usp) {
          setId(data.usp["_id"])
          initialValues.description = data.usp.description
          initialValues.strength = data.usp.strength
          initialValues.reason_to_choose = data.usp.reason_to_choose
          setValues(initialValues)
        }
        setError(null)
      } catch (err) {
        console.log(err)
        setError(err.response)
      }
    }
    fetchData()
  }, [])
  function validate(values) {
    const errors = {}
    if (!values.description) {
      errors.description = "Required"
    }
    if (!values.strength) {
      errors.strength = "Required"
    }
    if (!values.reason_to_choose) {
      errors.reason_to_choose = "Required"
    }
    return errors
  }
  async function handleSubmit(data) {
    let resData
    console.log(values)
    try {
      if (values) {
        resData = await patchData(
          "/business/usp",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/business/usp",
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
              validate={validate}
              handleSubmit={handleSubmit}
            >
              <label htmlFor="description">Your unique selling point: </label>
              <Field
                type="text"
                id="description"
                name="description"
                className="form-control"
              />
              <ErrorMessage
                name="description"
                component="div"
                style={{ color: "red" }}
              />
              <br />

              <label htmlFor="strength">Your Strength: </label>
              <Field
                type="text"
                id="strength"
                name="strength"
                className="form-control"
              />
              <ErrorMessage
                name="strength"
                component="div"
                style={{ color: "red" }}
              />

              <br />

              <label htmlFor="reason_to_choose">
                Why should customer choose you?{" "}
              </label>
              <Field
                type="text"
                id="reason_to_choose"
                name="reason_to_choose"
                className="form-control"
              />
              <ErrorMessage
                name="reason_to_choose"
                component="div"
                style={{ color: "red" }}
              />

              <div>
                <Button type="submit" className="w-md mt-3" color="primary">
                  Submit
                </Button>
              </div>
            </FormikComponent>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default UniqueSelling
