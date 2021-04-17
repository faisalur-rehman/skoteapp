import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
import { Redirect } from "react-router-dom"
import { formPostData, formGetData, patchData } from "./ApiRequest"

const initialValues = {
  extra_feature: "",
}

const WebsiteContent = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)

  //   useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         const { data } = await formGetData(
  //           "/services/wg-objective",
  //           localStorage.getItem("token")
  //         )
  //         if (data) {
  //           setId(data.objective["_id"])
  //           initialValues.indication = data.objective.indication
  //           initialValues.success = data.objective.success
  //           setValues(initialValues)
  //         }
  //         console.log(initialValues)
  //         setError(null)
  //       } catch (err) {
  //         console.log(err.response.data.message)
  //         setError(err.response.data.message)
  //       }
  //     }
  //     fetchData()
  //   }, [])

  const validate = values => {
    const errors = {}
    if (!values.extra_feature) {
      errors.extra_feature = "Required"
    }
    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (value) {
        resData = await patchData(
          "/services/advanced-features",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/advanced-features",
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
  }

  return (
    <div className="page-content">
      <div className="container">
        <Row>
          <Col sm={2}></Col>

          <Col sm={8}>
            <FormikComponent
              initialValues={initialValues}
              handleSubmit={handleSubmit}
              validate={validate}
            >
              <p>Advanced Feature:</p>
              <Field
                name="extra_feature"
                className="form-control"
                placeholder="Advanced Feature"
              />
              <ErrorMessage
                name="extra_feature"
                component="div"
                style={{ color: "red" }}
              />

              {/* {error && (
                <p style={{ color: "red" }}>
                  {error}. Please check the Web Development checkbox in
                  CheckList form section in order to submit this form.
                </p>
              )} */}

              <div>
                <Button type="submit" className="w-md mt-2" color="primary">
                  Submit
                </Button>
                {!error && clicked && <Redirect to="websiteContent" />}
              </div>
            </FormikComponent>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default WebsiteContent