import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import { Row, Col, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "./ApiRequest"

const initialValues = { bus_short_desc: "", company_do: "", products: [""] }

const BusinessInfo = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/business/introduction",
          localStorage.getItem("token")
        )
        console.log(data)
        if (data.introduction) {
          setId(data.introduction["_id"])
          initialValues.bus_short_desc = data.introduction.bus_short_desc
          initialValues.company_do = data.introduction.company_do
          data.introduction.products.map(
            (product, index) => (initialValues.products[index] = product)
          )
          // initialValues.webAddress2 = data.competitor.web_addresses[1]
          // initialValues.webAddress3 = data.competitor.web_addresses[2]
          setValues(initialValues)
        }
        setError(null)
      } catch (err) {
        setError(err.response)
        // console.log(err.response)
      }
    }
    fetchData()
  }, [])
  function validate(values) {
    const errors = {}
    if (!values.bus_short_desc) {
      errors.bus_short_desc = "Required"
    }
    if (values.bus_short_desc.length < 5) {
      errors.bus_short_desc = "Length must be atleast 5 characters long."
    }
    if (values.company_do.length < 5) {
      errors.company_do = "Length must be atleast 5 characters long."
    }
    if (values.bus_short_desc.length < 5) {
      errors.bus_short_desc = "Length must be atleast 5 characters long."
    }
    // if (values.products[0].length < 2) {
    //   errors.products[0] = "Required"
    // }
    return errors
  }
  async function handleSubmit(data) {
    // console.log("form data", data)
    let resData

    // console.log("Products", data.products)
    let newData = {
      bus_short_desc: data.bus_short_desc,
      company_do: data.company_do,
      products: data.products,
    }
    try {
      if (value) {
        resData = await patchData(
          "/business/introduction",
          id,
          newData,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/business/introduction",
          newData,
          localStorage.getItem("token")
        )
      }
      setError(null)
      console.log(resData)
    } catch (err) {
      setError(err.response.data.errors[0])
      // console.log(err.response.data.errors)
    }
  }
  return (
    <div className="page-content">
      <div className="container">
        <Row>
          <Col sm={3}>Track Bar Goes Here</Col>
          <Col sm={9}>
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange }) => (
                <Form>
                  <p>Introduction: </p>
                  <label htmlFor="bus_short_desc">Short Notes: </label>
                  <Field
                    name="bus_short_desc"
                    id="bus_short_desc"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="bus_short_desc"
                    component="div"
                    style={{ color: "red" }}
                  />
                  <br />
                  <label htmlFor="company_do">Your Company: </label>
                  <Field
                    name="company_do"
                    id="company_do"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="company_do"
                    component="div"
                    style={{ color: "red" }}
                  />

                  <br />
                  <label>Your Products: </label>

                  <FieldArray name="products">
                    {({ push }) => (
                      <div>
                        {values.products.map((product, index) => (
                          <div key={index}>
                            <Field
                              name={`products[${index}]`}
                              className="form-control"
                            />
                            <br />
                          </div>
                        ))}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <Button color="secondary" onClick={() => push("")}>
                          Add More Products
                        </Button>
                        <Button color="primary" className="m-2" type="submit">
                          Submit
                        </Button>
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

export default BusinessInfo
