import React, { useState, useEffect } from "react"
import { Row, Col, Button } from "reactstrap"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"

const CheckList = () => {
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
                checked: [],
              }}
              //   validate={validate}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
                  <p>CheckList</p>
                  <div role="group" aria-labelledby="checkbox-group">
                    <label>
                      <Field type="checkbox" name="checked" value="One" />{" "}
                      Website Development
                    </label>
                    <br />
                    <label>
                      <Field type="checkbox" name="checked" value="Two" /> Paid
                      Advertising
                    </label>
                    <br />
                    <label>
                      <Field type="checkbox" name="checked" value="Three" />{" "}
                      Social Media Marketing
                    </label>
                    <br />
                    <label>
                      <Field type="checkbox" name="checked" value="four" /> Logo
                      Creation
                    </label>
                    <br />
                    <label>
                      <Field type="checkbox" name="checked" value="five" />{" "}
                      Graphic Design
                    </label>
                    <br />
                    <label>
                      <Field type="checkbox" name="checked" value="six" />{" "}
                      Productivity and Automation
                    </label>
                  </div>

                  <button type="submit">Submit</button>
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
