import React, { useState } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"

const initialValues = {
  diffAccount: "",
}

const AccessAccount = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validate = values => {
    const errors = {}
    if (!values.diffAccount) {
      errors.diffAccount = "Required"
    }
    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    // try {
    //   if (value) {
    //     resData = await patchData(
    //       "/business/content",
    //       id,
    //       data,
    //       localStorage.getItem("token")
    //     )
    //   } else {
    //     resData = await formPostData(
    //       "/business/content",
    //       data,
    //       localStorage.getItem("token")
    //     )
    //   }
    //   setError(null)
    //   setSubmitted(true)
    //   console.log(resData)
    // } catch (err) {
    //   setError(err.response.data.errors)
    //   console.log(err.response)
    //   setSubmitted(false)
    // }
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
              <p>
                Would you like to use a different way for Sicuro Group to access
                your account?
              </p>

              <label>
                <Field type="radio" name="diffAccount" value="Yes" />
                Yes
              </label>
              <br />
              <label>
                <Field type="radio" name="diffAccount" value="No" />
                No
              </label>
              <br />
              <ErrorMessage
                name="diffAccount"
                component="div"
                style={{ color: "red" }}
              />

              <div>
                <Button type="submit" color="primary" className="w-md mt-3">
                  Submit
                </Button>
              </div>
            </FormikComponent>
            {/* {submitted && (
              <Button color="success" onClick={() => setClicked(true)}>
                Next Section
              </Button>
            )} */}
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default AccessAccount
