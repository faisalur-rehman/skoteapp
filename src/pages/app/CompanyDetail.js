import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
import { formPostData, formGetData, patchData } from "./ApiRequest"

let initialValues = {
  logo: "",
  bus_name: "",
  bus_email: "",
  bus_phone: "",
  bus_address: "",
  website_link: "",
}
const CompanyDetail = () => {
  const [errors, setErrors] = useState(null)
  const [values, setValues] = useState()
  const [id, setId] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/company",
          localStorage.getItem("token")
        )
        setId(data.company._id)
        console.log(data)
        initialValues.logo = data.company.logo
        initialValues.bus_name = data.company.bus_name
        initialValues.bus_email = data.company.bus_email
        initialValues.bus_phone = data.company.bus_phone
        initialValues.bus_address = data.company.bus_address
        initialValues.website_link = data.company.website_link
        setValues(initialValues)
        console.log(initialValues)
      } catch (error) {
        setErrors()
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
    let resData
    try {
      if (values) {
        console.log("here")
        resData = await patchData(
          "/company",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/company",
          data,
          localStorage.getItem("token")
        )
      }
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
          <Col sm={2}></Col>
          <Col sm={8}>
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

export default CompanyDetail
