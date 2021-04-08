import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "./ApiRequest"

const initialValues = {
  description: "",
  web_addresses: [],
  webAddress1: "",
  webAddress2: "",
  webAddress3: "",
}
const Competitors = () => {
  const [values, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/business/competitor",
          localStorage.getItem("token")
        )
        if (data.competitor) {
          setId(data.competitor["_id"])
          initialValues.description = data.competitor.description
          initialValues.webAddress1 = data.competitor.web_addresses[0]
          initialValues.webAddress2 = data.competitor.web_addresses[1]
          initialValues.webAddress3 = data.competitor.web_addresses[2]
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
    return errors
  }
  async function handleSubmit(data) {
    console.log("form data", data)
    let resData
    initialValues.web_addresses.push(data.webAddress1)
    initialValues.web_addresses.push(data.webAddress2)
    initialValues.web_addresses.push(data.webAddress3)

    let { description, web_addresses } = initialValues
    console.log("Web Address", initialValues.web_addresses)
    let newData = {
      description,
      web_addresses,
    }
    console.log("new data", newData)
    try {
      if (values) {
        resData = await patchData(
          "/business/competitor",
          id,
          newData,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/business/competitor",
          newData,
          localStorage.getItem("token")
        )
      }
      setError(null)
      initialValues.web_addresses = []
    } catch (err) {
      setError(err.response.data.errors[0])
      initialValues.web_addresses = []
      console.log(err.response.data.errors)
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
              <label htmlFor="competitor">Your Competitors: </label>
              <Field
                type="text"
                name="description"
                id="competitor"
                className="form-control"
              />
              <br />
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
            </FormikComponent>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default Competitors
