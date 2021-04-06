import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
import { formPostData, formGetData } from "./ApiRequest"
import axios from "axios"

const initialValues = {
  logo: "",
  bus_name: "",
  bus_email: "",
  bus_phone: "",
  bus_address: "",
  website_link: "",
}

const CompanyDetail = () => {
  const [errors, setErrors] = useState(null)
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/company",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDY4NzYxOWMxMzYyMDM1ZjA3MDBhZGEiLCJuYW1lIjoiRmFpc2FsIFJlaG1hbiIsImVtYWlsIjoiZmFpc2FsQGdtYWlsLmNvbSIsImlhdCI6MTYxNzYxODgyOX0.UNpseiy7Nd8TWe2o201PnlDEY0ldaGG70GCymR6_Zwo"
        )
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  function validate(values) {
    const errors = {}

    if (!values.bus_name) {
      errors.bus_name = "Required"
    }
    if (!values.bus_address) {
      errors.bus_address = "Required"
    }

    if (!values.bus_phone) {
      errors.bus_phone = "Required"
    }
    if (!values.bus_email) {
      errors.bus_email = "Required"
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.bus_email)
    ) {
      errors.bus_email = "Invalid email address"
    }
    return errors
  }

  async function handleSubmit(data) {
    console.log(data)
    try {
      console.log(data)
      const resData = await formPostData(
        "/company",
        data,
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDY4NzYxOWMxMzYyMDM1ZjA3MDBhZGEiLCJuYW1lIjoiRmFpc2FsIFJlaG1hbiIsImVtYWlsIjoiZmFpc2FsQGdtYWlsLmNvbSIsImlhdCI6MTYxNzYxODgyOX0.UNpseiy7Nd8TWe2o201PnlDEY0ldaGG70GCymR6_Zwo"
      )
      setErrors(null)
      console.log(resData)
    } catch (error) {
      setErrors(error.response.data.errors[0])
      console.log(error.response)
    }
  }
  return (
    <div className="page-content">
      <div className="container">
        <Row>
          <Col sm={3}>Track Bar Goes Here</Col>
          <Col sm={9}>
            <FormikComponent
              initialValues={initialValues}
              validate={validate}
              handleSubmit={handleSubmit}
            >
              {errors && <p style={{ color: "red" }}>{errors}</p>}
              <label htmlFor="logo">Logo : </label>
              <Field type="text" name="logo" className="form-control" />

              <br />
              <label htmlFor="busName">Business Name* : </label>
              <Field
                type="text"
                name="bus_name"
                id="busName"
                className="form-control"
              />
              <ErrorMessage
                name="bus_name"
                component="div"
                style={{ color: "red" }}
              />

              <br />
              <label htmlFor="busEmail">Business Email* : </label>
              <Field
                type="text"
                name="bus_email"
                id="busEmail"
                className="form-control"
              />
              <ErrorMessage
                name="bus_email"
                component="div"
                style={{ color: "red" }}
              />

              <br />
              <label htmlFor="busPhone">Business Phone* : </label>
              <Field
                type="number"
                name="bus_phone"
                id="busPhone"
                className="form-control"
              />
              <ErrorMessage
                name="bus_phone"
                component="div"
                style={{ color: "red" }}
              />

              <br />
              <label htmlFor="busAddress">Business Address* : </label>
              <Field
                name="bus_address"
                id="busAddress"
                className="form-control"
              />
              <ErrorMessage
                name="bus_address"
                component="div"
                style={{ color: "red" }}
              />

              <br />
              <label htmlFor="website">Website : </label>
              <Field
                type="text"
                name="website_link"
                id="website"
                className="form-control"
              />
              <ErrorMessage
                name="website_link"
                component="div"
                style={{ color: "red" }}
              />
              <div>
                <Button
                  type="submit"
                  // onClick={handleSubmit}
                  className="w-md mt-3"
                  color="primary"
                >
                  Submit
                </Button>
              </div>
            </FormikComponent>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default CompanyDetail
