import React, { useState, useEffect } from "react"
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { formGetData, patchData, formPostContent } from "./ApiRequest"
import { Redirect } from "react-router-dom"
import FormData from "form-data"
import Step6 from "./Step6"

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

  async function handleSubmit(dataa) {
    let data = new FormData()
    data.append("file", dataa.logo)
    // let logoDislike,logoLike;
    // console.log(data)
    // let data1 = new FormData()
    // data1.append("logo", data.logo)
    // data.logosYouLike.map((logo, index) =>
    //   data1.append(`LogoLike${index}`, data[`logoLike${index}`])
    // )
    // data.logosYouDislike.map((logo, index) =>
    //   data1.append(`LogoDislike${index}`, data[`logoDislike${index}`])
    // )
    // data1.append("content", data.content)
    console.log(data)
    // let resData
    // try {
    //   if (values) {
    //     console.log("here")
    //     resData = await patchData(
    //       "/services/logo-design/upload-logo",
    //       id,
    //       data1,
    //       localStorage.getItem("token")
    //     )
    //   } else {
    //     resData = await formPostContent(
    //       "/services/logo-design/upload-logo",
    //       data1,
    //       localStorage.getItem("token")
    //     )
    //   }
    //   setErrors(null)
    // } catch (error) {
    //   // setErrors(error.response.data.errors[0])
    //   console.log(error.response)
    // }
    setClicked(true)
  }
  return (
    <div className="container">
      <Row>
        <Step6 active={1} />
        <Col>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <div className="account-pages my-5 pt-sm-5">
                  <Container>
                    <Row className="justify-content-center">
                      <Col md={8} lg={6} xl={5}>
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              Step6
                            </li>
                            <li
                              style={{ color: "blue" }}
                              className="breadcrumb-item"
                              aria-current="page"
                            >
                              Upload Logo
                            </li>
                          </ol>
                        </nav>
                        <Card className="overflow-hidden">
                          <div className="bg-primary bg-soft">
                            <Row>
                              <Col xs={7}>
                                <div className="text-primary p-4">
                                  <h5 className="text-primary">Upload Logo!</h5>
                                </div>
                              </Col>
                              <Col className="col-5 align-self-end">
                                <img
                                  src={profile}
                                  alt=""
                                  className="img-fluid"
                                />
                              </Col>
                            </Row>
                          </div>
                          <CardBody className="pt-0">
                            <div className="p-2">
                              <label>Upload Logo:</label>
                              <Field
                                name="logo"
                                type="file"
                                // accept="image/*"
                                className="form-control"
                              />
                              <br />
                              <label htmlFor="websites">
                                Upload Logo's you like.
                              </label>
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
                                            // accept="image/*"
                                          />
                                          <br />
                                        </div>
                                      ))}
                                      <ErrorMessage
                                        name="logosYouLike"
                                        component="div"
                                        style={{ color: "red" }}
                                      />
                                      {error && (
                                        <p style={{ color: "red" }}>{error}</p>
                                      )}
                                      <div>
                                        <Button
                                          color="secondary"
                                          onClick={() => push("")}
                                        >
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
                                            // accept="image/*"
                                          />
                                          <br />
                                        </div>
                                      ))}
                                      <ErrorMessage
                                        name="logosYouDislike"
                                        component="div"
                                        style={{ color: "red" }}
                                      />
                                      {error && (
                                        <p style={{ color: "red" }}>{error}</p>
                                      )}
                                      <div>
                                        <Button
                                          color="secondary"
                                          onClick={() => push("")}
                                        >
                                          Add More Logos
                                        </Button>
                                      </div>
                                    </div>
                                  )
                                }}
                              </FieldArray>
                              <label>Upload Content:</label>
                              <Field
                                name="content"
                                type="file"
                                className="form-control"
                              />
                              <br />
                              <ErrorMessage
                                component="div"
                                style={{ color: "red" }}
                                name="content"
                              />
                              <Button
                                color="primary"
                                className="m-2"
                                type="submit"
                              >
                                Submit
                              </Button>
                              {!error && clicked && <Redirect to="dashboard" />}
                              {redirect && <Redirect to="login" />}
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
        {/* <Col sm={2}></Col> */}
      </Row>
    </div>
  )
}

export default UploadLogo
