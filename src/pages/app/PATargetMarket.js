import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
import { Redirect } from "react-router-dom"
import { formGetData, formPostData, patchData } from "./ApiRequest"

const initialValues = { niche_market: "", target_audience: "" }

const PATargetMarket = () => {
  const [values, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/services/advertise/offer-target",
          localStorage.getItem("token")
        )
        console.log(data)
        if (data.payload) {
          setId(data.payload["_id"])
          initialValues.niche_market = data.payload.niche_market
          initialValues.target_audience = data.payload.target_audience
          setValues(initialValues)
        }
        setError(null)
      } catch (err) {
        setError(err.response)
        console.log(err.response)
      }
    }
    fetchData()
  }, [])
  function validate(values) {
    const errors = {}
    if (values.target_audience.length < 3) {
      errors.target_audience = "There must be atleast 3 characters."
    }
    if (values.niche_market.length < 3) {
      errors.niche_market = "There must be atleast 3 characters."
    }
    return errors
  }
  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (values) {
        resData = await patchData(
          "/services/advertise/offer-target",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/advertise/offer-target",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
    } catch (err) {
      setError(err.response)
      console.log(err.response)
    }
    setClicked(true)
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
              <label htmlFor="niche_market">Your Niche Market: </label>
              <Field
                name="niche_market"
                id="niche_market"
                className="form-control"
              />
              <ErrorMessage
                component="div"
                name="niche_market"
                style={{ color: "red" }}
              />
              <br />
              <label htmlFor="target_audience">Your target audience: </label>
              <Field
                name="target_audience"
                id="target_audience"
                className="form-control"
              />
              <ErrorMessage
                component="div"
                name="target_audience"
                style={{ color: "red" }}
              />

              <div>
                <Button type="submit" className="w-md mt-3" color="primary">
                  Submit
                </Button>
              </div>
              {/* {!error && clicked && <Redirect to="clients" />} */}
            </FormikComponent>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default PATargetMarket
