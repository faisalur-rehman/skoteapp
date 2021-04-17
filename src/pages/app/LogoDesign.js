import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"

const initialValues = { text: "", tagline: "", style: "" }
const LogoDesign = () => {
  const [values, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)

  //   useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         const { data } = await formGetData(
  //           "/business/usp",
  //           localStorage.getItem("token")
  //         )
  //         if (data.usp) {
  //           setId(data.usp["_id"])
  //           initialValues.description = data.usp.description
  //           initialValues.strength = data.usp.strength
  //           initialValues.reason_to_choose = data.usp.reason_to_choose
  //           setValues(initialValues)
  //         }
  //         setError(null)
  //       } catch (err) {
  //         setError(err.response)
  //       }
  //     }
  //     fetchData()
  //   }, [])
  function validate(values) {
    const errors = {}
    if (!values.text) {
      errors.text = "Required"
    }
    if (!values.tagline) {
      errors.tagline = "Required"
    }
    if (!values.style) {
      errors.style = "Required"
    }
    return errors
  }
  async function handleSubmit(data) {
    let resData
    console.log(data)
    // try {
    //   if (values) {
    //     resData = await patchData(
    //       "/business/usp",
    //       id,
    //       data,
    //       localStorage.getItem("token")
    //     )
    //   } else {
    //     resData = await formPostData(
    //       "/business/usp",
    //       data,
    //       localStorage.getItem("token")
    //     )
    //   }
    //   setError(null)
    // } catch (err) {
    //   setError(err.response)
    // }
    // setClicked(true)
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
                  <label htmlFor="description">
                    Please provide the exact Text for the logo{" "}
                  </label>
                  <Field
                    id="description"
                    name="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="text"
                    component="div"
                    style={{ color: "red" }}
                  />
                  <br />

                  <label htmlFor="strength">
                    If you have a tagline, please let us know what it is.{" "}
                  </label>
                  <Field
                    id="strength"
                    name="tagline"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="tagline"
                    component="div"
                    style={{ color: "red" }}
                  />

                  <br />

                  <label htmlFor="reason_to_choose">
                    Please describe what style of logo you are looking for?{" "}
                  </label>
                  <Field
                    type="text"
                    id="reason_to_choose"
                    name="style"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="style"
                    component="div"
                    style={{ color: "red" }}
                  />

                  <div>
                    <Button type="submit" className="w-md mt-3" color="primary">
                      Submit
                    </Button>
                  </div>
                  {!error && clicked && <Redirect to="competitors" />}
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

export default LogoDesign
