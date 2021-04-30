import React, { useState, useEffect } from "react"
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"

import { Redirect } from "react-router-dom"
import Step1 from "./Step1"
import { formGetData, formPostData, patchData } from "./ApiRequest"

const initialValues = { customers: [""] }

const Clients = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setRedirect(true)
    }
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/business/customer",
          localStorage.getItem("token")
        )
        if (data.customer) {
          setId(data.customer["_id"])
          data.customer.customers.map(
            (customer, index) => (initialValues.customers[index] = customer)
          )
          setValues(initialValues)
        }
        setError(null)
      } catch (err) {
        // setError(err.response)
        console.log(err.response)
      }
    }
    fetchData()
  }, [])
  function validate(values) {
    const errors = {}
    for (let i = 0; i < values.length; i++) {
      if (values.customers[i].length <= 0) {
        errors.customers[i] = "Required"
      }
    }
    return errors
  }
  async function handleSubmit(data) {
    let resData
    try {
      if (value) {
        resData = await patchData(
          "/business/customer",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/business/customer",
          data,
          localStorage.getItem("token")
        )
      }
      console.log(resData)
      setError(null)
      setSubmitted(true)
    } catch (err) {
      console.log(err.response)
      setError(err.response.data.errors)
      setSubmitted(false)
    }
  }
  return (
    <div className="container">
      <Row>
        <Step1 active={4} />

        <Col sm={10}>
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
                              Step1
                            </li>
                            <li
                              style={{ color: "blue" }}
                              className="breadcrumb-item"
                              aria-current="page"
                            >
                              Cients
                            </li>
                          </ol>
                        </nav>
                        <Card className="overflow-hidden">
                          <div className="bg-primary bg-soft">
                            <Row>
                              <Col xs={7}>
                                <div className="text-primary p-4">
                                  <h5 className="text-primary">Clients!</h5>
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
                              <label>Your Clients: </label>
                              <FieldArray name="customers">
                                {({ push }) => (
                                  <div>
                                    {values.customers.map((customer, index) => (
                                      <div key={index}>
                                        <Field
                                          name={`customers[${index}]`}
                                          className="form-control"
                                        />
                                        <br />
                                        <ErrorMessage
                                          name={`customers[${index}]`}
                                          component="div"
                                          style={{ color: "red" }}
                                        />
                                      </div>
                                    ))}
                                    {error && (
                                      <p style={{ color: "red" }}>{error}</p>
                                    )}
                                    <Button
                                      color="secondary"
                                      onClick={() => push("")}
                                    >
                                      Add More Clients
                                    </Button>
                                    <Button
                                      color="primary"
                                      className="m-2"
                                      type="submit"
                                    >
                                      Submit
                                    </Button>
                                    {!error && clicked && (
                                      <Redirect to="/checklist" />
                                    )}
                                  </div>
                                )}
                              </FieldArray>
                              {submitted && (
                                <Button
                                  color="success"
                                  onClick={() => setClicked(true)}
                                >
                                  Next Section
                                </Button>
                              )}
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
      </Row>
    </div>
  )
}

export default Clients
