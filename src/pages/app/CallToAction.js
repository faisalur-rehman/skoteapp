import React, { useState, useEffect } from "react"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import FormikComponent from "./Formik"

// import profile from "../../assets/images/profile-img.png"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"

const initialValues = {
  action: "",
}

const CallToAction = () => {
  const [error, setError] = useState(null)
  const [values, setValues] = useState()
  const [id, setId] = useState()
  const [submitted, setSubmitted] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setRedirect(true)
    }
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/services/wg-action",
          localStorage.getItem("token")
        )
        console.log(data.action)
        if (data.action) {
          setId(data.action["_id"])
          initialValues.action = data.action.action
          setValues(initialValues)
        }
        setError(null)
      } catch (error) {
        console.log(error)
        setError(error.response)
      }
    }
    fetchData()
  }, [])

  function validate(values) {
    const errors = {}
    if (values.action.length < 3) {
      errors.action = "Minimum of 3 characters are required"
    }

    return errors
  }
  async function handleSubmit(data) {
    let resData
    try {
      if (values) {
        resData = await patchData(
          "/services/wg-action",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/wg-action",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
      setSubmitted(true)
      console.log(resData)
    } catch (error) {
      setError(error.response)
      setSubmitted(false)
      console.log(error.response)
    }
  }
  return (
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
                          Action
                        </li>
                      </ol>
                    </nav>
                    <Card className="overflow-hidden">
                      <div className="bg-primary bg-soft">
                        <Row>
                          <Col xs={7}>
                            <div className="text-primary p-4">
                              <h5 className="text-primary">Call To Action!</h5>
                            </div>
                          </Col>
                          <Col className="col-5 align-self-end">
                            <img src={profile} alt="" className="img-fluid" />
                          </Col>
                        </Row>
                      </div>
                      <CardBody className="pt-0">
                        <div className="p-2">
                          <p style={{ fontWeight: "bold" }}>Call to action:</p>
                          <label htmlFor="name">Describe the action* : </label>
                          <Field name="action" className="form-control" />
                          <ErrorMessage
                            name="action"
                            component="div"
                            style={{ color: "red" }}
                          />

                          <div>
                            <Button
                              type="submit"
                              className="w-md mt-3"
                              color="primary"
                            >
                              Submit
                            </Button>
                          </div>
                          {submitted && (
                            <Button
                              className="mt-3"
                              color="success"
                              onClick={() => setClicked(true)}
                            >
                              Next Section
                            </Button>
                          )}
                          {!error && clicked && (
                            <Redirect to="/websitesYouLike" />
                          )}
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

export default CallToAction
