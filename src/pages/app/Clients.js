import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
import { Redirect } from "react-router-dom"

const initialValues = { clients: "" }

const Clients = () => {
  const [values, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/business/clients",
          localStorage.getItem("token")
        )
        console.log(data)
        if (data.usp) {
          setId(data.usp["_id"])
          initialValues.market = data.usp.market
          initialValues.audience = data.usp.audience
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
    return errors
  }
  async function handleSubmit(data) {
    let resData
    console.log(values)
    try {
      if (values) {
        resData = await patchData(
          "/business/clients",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/business/clients",
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
              <label htmlFor="clients">Your Clients</label>
              <Field
                type="text"
                name="clients"
                id="clients"
                className="form-control"
              />
              <div>
                <Button type="submit" className="w-md mt-3" color="primary">
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

export default Clients
