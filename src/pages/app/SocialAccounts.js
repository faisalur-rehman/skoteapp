import React, { useState, useEffect } from "react"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import FormikComponent from "./Formik"

import { Formik, Form, Field, ErrorMessage } from "formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"

const initialValues = {
  platforms: [],
}

const SocialAccount = () => {
  const [error, setError] = useState(null)
  const [value, setValues] = useState()
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
          "/services/social-media/platform",
          localStorage.getItem("token")
        )
        console.log(data.payload)
        if (data.payload) {
          setId(data.payload["_id"])
          data.payload.platforms.map(
            (platform, index) => (initialValues.platforms[index] = platform)
          )
          setValues(initialValues)
        }
        setError(null)
      } catch (error) {
        setError(error.response)
      }
    }
    fetchData()
  }, [])

  function validate(values) {
    const errors = {}
    if (values.platforms.length < 1) {
      errors.accounts = "You have to select atleast one service"
    }

    return errors
  }
  async function handleSubmit(data) {
    let resData
    try {
      if (value) {
        resData = await patchData(
          "/services/social-media/platform",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/social-media/platform",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
    } catch (err) {
      console.log(err.response)
      setError(err.response)
    }
    setClicked(true)
  }
  return (
    // <div className="page-content">
    //   <div className="container">
    //     <Row>
    //       <Col sm={2}></Col>
    //       <Col sm={8}>
    //         <Formik
    //           initialValues={initialValues}
    //           validate={validate}
    //           onSubmit={handleSubmit}
    //         >
    //           {({ values }) => (
    //             <Form>
    //               <p>Accounts</p>
    //               <div role="group" aria-labelledby="checkbox-group">
    //                 <label>
    //                   <Field
    //                     type="checkbox"
    //                     name="platforms"
    //                     value="Facebook"
    //                   />{" "}
    //                   Facebook
    //                 </label>
    //                 <br />
    //                 <label>
    //                   <Field
    //                     type="checkbox"
    //                     name="platforms"
    //                     value="Instagram"
    //                   />{" "}
    //                   Instagram
    //                 </label>
    //                 <br />
    //                 <label>
    //                   <Field type="checkbox" name="platforms" value="Twitter" />{" "}
    //                   Twitter
    //                 </label>
    //                 <br />

    //                 <label>
    //                   <Field
    //                     type="checkbox"
    //                     name="platforms"
    //                     value="Linkedin"
    //                   />{" "}
    //                   Linkedin
    //                 </label>
    //                 <br />
    //                 <label>
    //                   <Field
    //                     type="checkbox"
    //                     name="platforms"
    //                     value="Google Ads/My Business"
    //                   />{" "}
    //                   Google Ads/My Business
    //                 </label>
    //                 <ErrorMessage
    //                   component="div"
    //                   style={{ color: "red" }}
    //                   name="accounts"
    //                 />
    //               </div>

    //               <Button type="submit" color="primary">
    //                 Submit
    //               </Button>
    //               {!error && clicked && <Redirect to="fbUrl" />}
    //               {redirect && <Redirect to="login" />}
    //             </Form>
    //           )}
    //         </Formik>
    //         <Col sm={2}></Col>
    //       </Col>
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
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Step5
                        </li>
                        <li
                          style={{ color: "blue" }}
                          className="breadcrumb-item"
                          aria-current="page"
                        >
                          Social Accounts
                        </li>
                      </ol>
                    </nav>
                    <Card className="overflow-hidden">
                      <div className="bg-primary bg-soft">
                        <Row>
                          <Col xs={7}>
                            <div className="text-primary p-4">
                              <h5 className="text-primary">Social Accounts!</h5>
                            </div>
                          </Col>
                          <Col className="col-5 align-self-end">
                            <img src={profile} alt="" className="img-fluid" />
                          </Col>
                        </Row>
                      </div>
                      <CardBody className="pt-0">
                        <div className="p-2">
                          <p>Accounts</p>
                          <div role="group" aria-labelledby="checkbox-group">
                            <label>
                              <Field
                                type="checkbox"
                                name="platforms"
                                value="Facebook"
                              />{" "}
                              Facebook
                            </label>
                            <br />
                            <label>
                              <Field
                                type="checkbox"
                                name="platforms"
                                value="Instagram"
                              />{" "}
                              Instagram
                            </label>
                            <br />
                            <label>
                              <Field
                                type="checkbox"
                                name="platforms"
                                value="Twitter"
                              />{" "}
                              Twitter
                            </label>
                            <br />

                            <label>
                              <Field
                                type="checkbox"
                                name="platforms"
                                value="Linkedin"
                              />{" "}
                              Linkedin
                            </label>
                            <br />
                            <label>
                              <Field
                                type="checkbox"
                                name="platforms"
                                value="Google Ads/My Business"
                              />{" "}
                              Google Ads/My Business
                            </label>
                            <ErrorMessage
                              component="div"
                              style={{ color: "red" }}
                              name="accounts"
                            />
                          </div>

                          <Button type="submit" color="primary">
                            Submit
                          </Button>
                          {!error && clicked && <Redirect to="fbUrl" />}
                          {redirect && <Redirect to="login" />}
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

export default SocialAccount
