import React, { useState, useEffect } from "react"
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"

let initialValues = {
  logo: "",
  logosYouLike: [""],
  logosYouDislike: [""],
  content: "",
}
const UploadLogo = () => {
  const [error, setErrors] = useState(null)
  const [values, setValues] = useState()
  const [id, setId] = useState()
  const [redirect, setRedirect] = useState(false)
  const [clicked, setClicked] = useState(false)

  // useEffect(() => {
  //   if (localStorage.getItem("token") === null) {
  //     setRedirect(true)
  //   }
  //   async function fetchData() {
  //     try {
  //       const { data } = await formGetData(
  //         "/company",
  //         localStorage.getItem("token")
  //       )
  //       setId(data.company._id)
  //       // initialValues.logo = data.company.logo
  //       // initialValues.bus_name = data.company.bus_name
  //       // initialValues.bus_email = data.company.bus_email
  //       // initialValues.bus_phone = data.company.bus_phone
  //       // initialValues.bus_address = data.company.bus_address
  //       // initialValues.website_link = data.company.website_link
  //       // setValues(initialValues)
  //     } catch (error) {
  //       setErrors()
  //     }
  //   }
  //   fetchData()
  // }, [])
  function validate(values) {
    const errors = {}
    if (values.logosYouLike.length < 3) {
      errors.logosYouLike = "Minimum 3 logos are required"
    }
    if (values.logosYouDislike.length < 3) {
      errors.logosYouDislike = "Minimum 3 logos are required"
    }
    if (!values.content) {
      errors.content = "Required"
    }
    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (values) {
        console.log("here")
        resData = await patchData(
          "/services/logo-design/upload-logo",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/logo-design/upload-logo",
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
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <label>Upload Logo:</label>
                  <Field
                    name="logo"
                    type="file"
                    accept="image/*"
                    className="form-control"
                  />
                  <br />
                  <label htmlFor="websites">Upload Logo's you like.</label>
                  <FieldArray name="logosYouLike">
                    {props => {
                      const { form, push } = props
                      const { values } = form
                      const { logosYouLike } = values

                      return (
                        <div>
                          {logosYouLike.map((website, index) => (
                            <div key={index}>
                              <Field
                                name={`logoLike${index}`}
                                type="file"
                                className="form-control"
                                accept="image/*"
                              />
                              <br />
                            </div>
                          ))}
                          <ErrorMessage
                            name="logosYouLike"
                            component="div"
                            style={{ color: "red" }}
                          />
                          {error && <p style={{ color: "red" }}>{error}</p>}
                          <div>
                            <Button color="secondary" onClick={() => push("")}>
                              Add More Logos
                            </Button>
                          </div>
                        </div>
                      )
                    }}
                  </FieldArray>
                  <br />
                  <FieldArray name="logosYouDislike">
                    {props => {
                      const { form, push } = props
                      const { values } = form
                      const { logosYouDislike } = values

                      return (
                        <div>
                          {logosYouDislike.map((website, index) => (
                            <div key={index}>
                              <Field
                                name={`logoDislike${index}`}
                                type="file"
                                className="form-control"
                                accept="image/*"
                              />
                              <br />
                            </div>
                          ))}
                          <ErrorMessage
                            name="logosYouDislike"
                            component="div"
                            style={{ color: "red" }}
                          />
                          {error && <p style={{ color: "red" }}>{error}</p>}
                          <div>
                            <Button color="secondary" onClick={() => push("")}>
                              Add More Logos
                            </Button>
                          </div>
                        </div>
                      )
                    }}
                  </FieldArray>
                  <label>Upload Content:</label>
                  <Field name="content" type="file" className="form-control" />
                  <br />
                  <ErrorMessage
                    component="div"
                    style={{ color: "red" }}
                    name="content"
                  />
                  <Button color="primary" className="m-2" type="submit">
                    Submit
                  </Button>
                  {!error && clicked && <Redirect to="websitesYouDisLike" />}
                  {redirect && <Redirect to="login" />}
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

export default UploadLogo
