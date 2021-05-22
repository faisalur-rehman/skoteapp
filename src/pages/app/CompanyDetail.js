import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"
import Details from "../Forms/CompanyDetail"

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
  const [clicked, setClicked] = useState()
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setRedirect(true)
    }
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/company-detail",
          localStorage.getItem("token")
        )
        console.log(data)
        if (data.about) {
          setId(data.about._id)
          // initialValues.logo = data.about.logo
          initialValues.busName = data.about.busName
          initialValues.busEmail = data.about.busEmail
          initialValues.busPhone = data.about.busPhone
          initialValues.busAddress = data.about.busAddress
          initialValues.webURL = data.about.webURL
          setValues(initialValues)
        }
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
    console.log(data)
    let resData
    try {
      if (values) {
        console.log("here")
        resData = await patchData(
          "/company-detail",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/company-detail",
          data,
          localStorage.getItem("token")
        )
      }
      setErrors(null)
    } catch (error) {
      setErrors(error.response.data.errors[0])
      console.log(error.response)
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
              <Details />
              {errors && <p style={{ color: "red" }}>{errors}</p>}

              {redirect && <Redirect to="login" />}
              {clicked && !errors && <Redirect to="checklist" />}
            </FormikComponent>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default CompanyDetail
