import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"

const initialValues = {
  description: "",
  websites: [],
  webAddress1: "",
  webAddress2: "",
  webAddress3: "",
}
const PACompetitors = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/services/advertise/offer-competitor",
          localStorage.getItem("token")
        )
        console.log(data)
        if (data.competitor) {
          setId(data.competitor["_id"])
          initialValues.description = data.competitor.description
          initialValues.webAddress1 = data.competitor.websites[0]
          initialValues.webAddress2 = data.competitor.websites[1]
          initialValues.webAddress3 = data.competitor.websites[2]
          setValues(initialValues)
        }
        setError(null)
      } catch (err) {
        setError(err.response)
      }
    }
    fetchData()
  }, [])
  function validate(values) {
    const errors = {}
    if (values.description.length < 3) {
      errors.description = "Description should not be less than 3 characters."
    }
    return errors
  }
  async function handleSubmit(data) {
    console.log("form data", data)
    let resData
    initialValues.websites.push(data.webAddress1)
    initialValues.websites.push(data.webAddress2)
    initialValues.websites.push(data.webAddress3)
    let { description, websites } = initialValues
    let newData = {
      description: data.description,
      websites,
    }
    try {
      if (value) {
        resData = await patchData(
          "/services/advertise/offer-competitor",
          id,
          newData,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/advertise/offer-competitor",
          newData,
          localStorage.getItem("token")
        )
      }
      setError(null)
      initialValues.web_addresses = []
    } catch (err) {
      setError(err.response.data.errors[0])
      console.log(err.response)
      initialValues.web_addresses = []
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
              <label htmlFor="competitor">Your Competitors: </label>
              <Field
                type="text"
                name="description"
                id="competitor"
                className="form-control"
              />
              <br />
              <ErrorMessage
                component="div"
                style={{ color: "red" }}
                name="description"
              />
              <label>Three Website Adresses: </label>
              <Field name="webAddress1" className="form-control" />
              <br />
              <Field name="webAddress2" className="form-control" />
              <br />
              <Field name="webAddress3" className="form-control" />
              <br />
              {error && <span style={{ color: "red" }}>{error}</span>}
              <div>
                <Button type="submit" color="primary" className="w-md mt-3">
                  Submit
                </Button>
              </div>
              {/* {!error && clicked && <Redirect to="targetMarket" />} */}
            </FormikComponent>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default PACompetitors
