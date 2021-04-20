import React, { useState, useEffect } from "react"
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik"
import { Row, Col, Button } from "reactstrap"
import { Redirect } from "react-router-dom"
import { formGetData, formPostData, patchData } from "./ApiRequest"

const initialValues = { customers: [""] }

const PAClients = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/services/advertise/offer-customer",
          localStorage.getItem("token")
        )
        console.log(data)
        if (data.payload) {
          setId(data.payload["_id"])
          data.payload.customers.map(
            (customer, index) => (initialValues.customers[index] = customer)
          )
          setValues(initialValues)
        }
        setError(null)
      } catch (err) {
        // setError(err.response)
        console.log(err.response)
      }
    }
    fetchData()
  }, [])

  function validate(values) {
    const errors = {}
    for (let i = 0; i < values.length; i++) {
      if (values.customers[i].length <= 0) {
        errors.customers[i] = "Required"
      }
    }
    return errors
  }
  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (value) {
        resData = await patchData(
          "/services/advertise/offer-customer",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/advertise/offer-customer",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
    } catch (err) {
      setError(err.response.data.errors)
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
                  <label>Your Clients: </label>
                  <FieldArray name="customers">
                    {({ push }) => (
                      <div>
                        {values.customers.map((customer, index) => (
                          <div key={index}>
                            <Field
                              name={`customers[${index}]`}
                              className="form-control"
                            />
                            <br />
                            <ErrorMessage
                              name={`customers[${index}]`}
                              component="div"
                              style={{ color: "red" }}
                            />
                          </div>
                        ))}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <Button color="secondary" onClick={() => push("")}>
                          Add More Clients
                        </Button>
                        <Button color="primary" className="m-2" type="submit">
                          Submit
                        </Button>
                        {!error && clicked && <Redirect to="/paGoals" />}
                      </div>
                    )}
                  </FieldArray>
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

export default PAClients
