import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
import { Redirect } from "react-router-dom"
import { formPostData, formGetData, patchData } from "./ApiRequest"

const initialValues = {
  credential: "",
  first: "",
  last: "",
}

const FacebookUrl = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setRedirect(true)
    }
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/services/social-media/fb-credential",
          localStorage.getItem("token")
        )
        console.log(data.payload)
        if (data.payload) {
          setId(data.payload["_id"])
          initialValues.credential = data.payload.credential
          initialValues.first = data.payload.first
          initialValues.last = data.payload.last
          setValues(initialValues)
        }
        setError(null)
      } catch (err) {
        console.log(err.response.data.message)
        setError(err.response.data.message)
      }
    }
    fetchData()
  }, [])

  const validate = values => {
    const errors = {}
    // if (values.indication.length < 3) {
    //   errors.indication = "Atleast 3 characters are required"
    // }
    // if (values.outline.length < 3) {
    //   errors.outline = "Atleast 3 characters are required"
    // }

    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (value) {
        resData = await patchData(
          "/services/social-media/fb-credential",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/social-media/fb-credential",
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
              handleSubmit={handleSubmit}
              validate={validate}
            >
              <p>Facebook:</p>
              <Field
                name="credential"
                className="form-control"
                placeholder="credential"
              />
              <ErrorMessage
                name="indication"
                component="div"
                style={{ color: "red" }}
              />
              <br />
              <Field
                name="first"
                className="form-control"
                placeholder="firstname"
              />
              <ErrorMessage
                name="outline"
                component="div"
                style={{ color: "red" }}
              />
              <br />
              <Field
                name="last"
                className="form-control"
                placeholder="lastname"
              />
              <ErrorMessage
                name="outline"
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
                {!error && clicked && <Redirect to="accessAccount" />}
                {redirect && <Redirect to="login" />}
              </div>
            </FormikComponent>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default FacebookUrl
