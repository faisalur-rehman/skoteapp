import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
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
    // <div className="page-content">
    //   <div className="container">
    //     <Row>
    //       <Col sm={2}></Col>

    //       <Col sm={8}>
    //         <FormikComponent
    //           initialValues={initialValues}
    //           handleSubmit={handleSubmit}
    //           validate={validate}
    //         >
    //           <p>Facebook:</p>
    //           <Field
    //             name="credential"
    //             className="form-control"
    //             placeholder="credential"
    //           />
    //           <ErrorMessage
    //             name="indication"
    //             component="div"
    //             style={{ color: "red" }}
    //           />
    //           <br />
    //           <Field
    //             name="first"
    //             className="form-control"
    //             placeholder="firstname"
    //           />
    //           <ErrorMessage
    //             name="outline"
    //             component="div"
    //             style={{ color: "red" }}
    //           />
    //           <br />
    //           <Field
    //             name="last"
    //             className="form-control"
    //             placeholder="lastname"
    //           />
    //           <ErrorMessage
    //             name="outline"
    //             component="div"
    //             style={{ color: "red" }}
    //           />

    //           {/* {error && (
    //             <p style={{ color: "red" }}>
    //               {error}. Please check the Web Development checkbox in
    //               CheckList form section in order to submit this form.
    //             </p>
    //           )} */}

    //           <div>
    //             <Button type="submit" className="w-md mt-2" color="primary">
    //               Submit
    //             </Button>
    //             {!error && clicked && <Redirect to="accessAccount" />}
    //             {redirect && <Redirect to="login" />}
    //           </div>
    //         </FormikComponent>
    //       </Col>
    //       <Col sm={2}></Col>
    //     </Row>
    //   </div>
    // </div>
    <div className="container">
      <Row>
        <Col>
          <FormikComponent
            initialValues={initialValues}
            validate={validate}
            handleSubmit={handleSubmit}
          >
            <div className="account-pages my-5 pt-sm-5">
              <Container>
                <Row className="justify-content-center">
                  <Col md={8} lg={6} xl={5}>
                    <Card className="overflow-hidden">
                      <div className="bg-primary bg-soft">
                        <Row>
                          <Col xs={7}>
                            <div className="text-primary p-4">
                              <h5 className="text-primary">
                                Facebook Credentials!
                              </h5>
                            </div>
                          </Col>
                          <Col className="col-5 align-self-end">
                            <img src={profile} alt="" className="img-fluid" />
                          </Col>
                        </Row>
                      </div>
                      <CardBody className="pt-0">
                        <div className="p-2">
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
                            <Button
                              type="submit"
                              className="w-md mt-2"
                              color="primary"
                            >
                              Submit
                            </Button>
                            {!error && clicked && (
                              <Redirect to="accessAccount" />
                            )}
                            {redirect && <Redirect to="login" />}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    <div className="mt-5 text-center">
                      <p>
                        © {new Date().getFullYear()} Sicuro Group. Crafted with{" "}
                        <i className="mdi mdi-heart text-danger" /> by
                        9thDimension
                      </p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </FormikComponent>
        </Col>
      </Row>
    </div>
  )
}

export default FacebookUrl
