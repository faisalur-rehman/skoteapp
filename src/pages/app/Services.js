import React, { useState, useEffect } from "react"
import { Row, Col, Button } from "reactstrap"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"

const initialValues = {
  services: [],
}

const CheckList = () => {
  const [error, setError] = useState(null)
  const [value, setValues] = useState()
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/services/advertise/service",
          localStorage.getItem("token")
        )
        console.log(data.payload)
        if (data.payload) {
          setId(data.payload["_id"])
          data.payload.services.map(
            (service, index) => (initialValues.services[index] = service)
          )
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
    if (values.services.length < 1) {
      errors.services = "You have to select atleast one service"
    }

    return errors
  }
  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (value) {
        resData = await patchData(
          "/services/advertise/service",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/advertise/service",
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
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
                  <p>Services</p>
                  <div role="group" aria-labelledby="checkbox-group">
                    <label>
                      <Field
                        type="checkbox"
                        name="services"
                        value="Social Media Advertising"
                      />{" "}
                      Social Media Advertising
                    </label>
                    <br />
                    <label>
                      <Field
                        type="checkbox"
                        name="services"
                        value="Google Advertising"
                      />{" "}
                      Google Advertising
                    </label>

                    <ErrorMessage
                      component="div"
                      style={{ color: "red" }}
                      name="services"
                    />
                  </div>

                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                  {/* {!error && clicked && <Redirect to="websiteGoals" />} */}
                </Form>
              )}
            </Formik>
            <Col sm={2}></Col>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default CheckList
