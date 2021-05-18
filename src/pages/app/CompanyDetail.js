import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"

let initialValues = {
  logo: "",
  busName: "",
  busEmail: "",
  busPhone: "",
  busAddress: "",
  webURL: "",

  // /company-detail:  (string),  (string),  (string),  (string),  (string), logo? (file).
}
const CompanyDetail = () => {
  const [errors, setErrors] = useState(null)
  const [values, setValues] = useState()
  const [id, setId] = useState()
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setRedirect(true)
    }
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/company",
          localStorage.getItem("token")
        )
        // setId(data.company._id)
        // initialValues.logo = data.company.logo
        // initialValues.busName = data.company.busName
        // initialValues.busEmail = data.company.busEmail
        // initialValues.busPhone = data.company.busPhone
        // initialValues.busAddress = data.company.busAddress
        // initialValues.webURL = data.company.webURL
        setValues(initialValues)
      } catch (error) {
        setErrors()
      }
    }
    fetchData()
  }, [])
  function validate(values) {
    const errors = {}

    if (!values.busName) {
      errors.busName = "Required"
    }
    if (!values.busAddress) {
      errors.busAddress = "Required"
    }

    if (!values.busPhone) {
      errors.busPhone = "Required"
    }
    if (!values.busEmail) {
      errors.busEmail = "Required"
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.busEmail)
    ) {
      errors.busEmail = "Invalid email address"
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
              <Field type="file" name="logo" className="form-control" />

              <br />
              <label htmlFor="busName">Business Name* : </label>
              <Field
                as="textarea"
                name="busName"
                id="busName"
                className="form-control"
                placeholder="Name"
              />
              <ErrorMessage
                name="busName"
                component="div"
                style={{ color: "red" }}
              />

              <br />
              <label htmlFor="busEmail">Business Email* : </label>
              <Field
                as="textarea"
                name="busEmail"
                id="busEmail"
                placeholder="Email"
                className="form-control"
              />
              <ErrorMessage
                name="busEmail"
                component="div"
                style={{ color: "red" }}
              />

              <br />
              <label htmlFor="busPhone">Business Phone* : </label>
              <Field
                type="number"
                as="textarea"
                name="busPhone"
                id="busPhone"
                placeholder="Phone"
                className="form-control"
              />
              <ErrorMessage
                name="busPhone"
                component="div"
                style={{ color: "red" }}
              />

              <br />
              <label htmlFor="busAddress">Business Address* : </label>
              <Field
                name="busAddress"
                id="busAddress"
                className="form-control"
                placeholder="Address"
                as="textarea"
              />
              <ErrorMessage
                name="busAddress"
                component="div"
                style={{ color: "red" }}
              />

              <br />
              <label htmlFor="website">Website : </label>
              <Field
                as="textarea"
                name="webURL"
                id="website"
                placeholder="Website"
                className="form-control"
              />
              <ErrorMessage
                name="webURL"
                component="div"
                style={{ color: "red" }}
              />
              <div>
                <Button type="submit" className="w-md mt-3" color="primary">
                  Submit
                </Button>
              </div>
              {redirect && <Redirect to="login" />}
            </FormikComponent>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default CompanyDetail
