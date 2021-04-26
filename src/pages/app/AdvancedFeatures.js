import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { Redirect } from "react-router-dom"
import { formPostData, formGetData, patchData } from "./ApiRequest"

const initialValues = {
  feature: "",
}

const AdvancedFeatures = () => {
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
          "/services/wg-advanced-feature",
          localStorage.getItem("token")
        )
        console.log(data.feature)
        if (data.feature) {
          setId(data.feature["_id"])
          initialValues.feature = data.feature.feature
          setValues(initialValues)
        }
        console.log(initialValues)
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
    if (!values.feature) {
      errors.feature = "Required"
    }
    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (value) {
        resData = await patchData(
          "/services/wg-advanced-feature",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/wg-advanced-feature",
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
    //           <p>Advanced Feature:</p>
    //           <Field
    //             name="feature"
    //             className="form-control"
    //             placeholder="Advanced Feature"
    //           />
    //           <ErrorMessage
    //             name="feature"
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
    //             {!error && clicked && <Redirect to="callToAction" />}
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
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Step2
                        </li>
                        <li
                          style={{ color: "blue" }}
                          className="breadcrumb-item"
                          aria-current="page"
                        >
                          Advanced Features
                        </li>
                      </ol>
                    </nav>
                    <Card className="overflow-hidden">
                      <div className="bg-primary bg-soft">
                        <Row>
                          <Col xs={7}>
                            <div className="text-primary p-4">
                              <h5 className="text-primary">
                                Advanced Features!
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
                          <p>Advanced Feature:</p>
                          <Field
                            name="feature"
                            className="form-control"
                            placeholder="Advanced Feature"
                          />
                          <ErrorMessage
                            name="feature"
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
                              <Redirect to="callToAction" />
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

export default AdvancedFeatures
