import React, { useState, useEffect } from "react"
import { Row, Col, Button } from "reactstrap"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"

const AboutForm = () => {
  const [error, setError] = useState(null)
  const [values, setValues] = useState()
  const [id, setId] = useState()

  //   useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         const { data } = await formGetData(
  //           "/about",
  //           localStorage.getItem("token")
  //         )
  //         setId(data.about["_id"])
  //         initialValues.name = data.about.name
  //         initialValues.role = data.about.role
  //         setValues(initialValues)
  //         setError(null)
  //       } catch (error) {
  //         console.log(error)
  //         setError(error.response)
  //       }
  //     }
  //     fetchData()
  //   }, [])

  function validate(values) {
    const errors = {}
    if (values.action.length < 3) {
      errors.action = "Minimum of 3 characters are required"
    }
    if (!values.siteMap) {
      errors.siteMap = "Required"
    }
    if (values.advancedFeatures.length < 3) {
      errors.advancedFeatures = "Minimum of 3 characters are required"
    }
    return errors
  }
  async function handleSubmit(data) {
    let resData
    // try {
    //   if (values) {
    //     resData = await patchData(
    //       "/aout",
    //       id,
    //       data,
    //       localStorage.getItem("token")
    //     )
    //   } else {
    //     resData = await formPostData(
    //       "/aout",
    //       data,
    //       localStorage.getItem("token")
    //     )
    //   }
    //   setError(null)
    //   console.log(resData)
    // } catch (error) {
    //   setError(error.response)
    //   console.log(error.response)
    // }
    console.log(data)
  }
  return (
    <div className="page-content">
      <div className="container">
        <Row>
          <Col sm={2}></Col>
          <Col sm={8}>
            <Formik
              initialValues={{
                action: "",
                siteMap: "",
                advancedFeatures: "",
              }}
              validate={validate}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
                  <p style={{ fontWeight: "bold" }}>Call to action:</p>
                  <label htmlFor="name">Describe the action* : </label>
                  <Field name="action" className="form-control" />
                  <ErrorMessage
                    name="action"
                    component="div"
                    style={{ color: "red" }}
                  />
                  <br />
                  <label htmlFor="name">SiteMap* : </label>
                  <Field name="siteMap" className="form-control" />
                  <ErrorMessage
                    name="siteMap"
                    component="div"
                    style={{ color: "red" }}
                  />
                  <br /> <label htmlFor="name">Advanced Features* : </label>
                  <Field name="advancedFeatures" className="form-control" />
                  <ErrorMessage
                    name="advancedFeatures"
                    component="div"
                    style={{ color: "red" }}
                  />
                  <br />
                  <div>
                    <Button type="submit" className="w-md mt-3" color="primary">
                      Submit
                    </Button>
                  </div>
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

export default AboutForm