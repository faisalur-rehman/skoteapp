import React, { useState, useEffect } from "react"
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"

import { Redirect } from "react-router-dom"
import { formGetData, formPostData, patchData } from "./ApiRequest"
import Step4 from "./Step4"

const initialValues = { customers: [""] }

const PAClients = () => {
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
          "/services/advertise/offer-customer",
          localStorage.getItem("token")
        )
        console.log(data)
        if (data.payload) {
          setId(data.payload["_id"])
          data.payload.customers.map(
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
    console.log(data)
    try {
      if (value) {
        resData = await patchData(
          "/services/advertise/offer-customer",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/advertise/offer-customer",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
    } catch (err) {
      setError(err.response.data.errors)
      console.log(err.response)
    }
    setClicked(true)
  }
  return (
    <div className="container">
      <Row>
        <Step4 active={3} />
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
                              Step4
                            </li>
                            <li
                              style={{ color: "blue" }}
                              className="breadcrumb-item"
                              aria-current="page"
                            >
                              Clients
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
                              <label>
                                Please describe a typical customer/client of
                                your business.{" "}
                              </label>
                              <Field
                                as="textarea"
                                name="customers"
                                id="niche_market"
                                className="form-control"
                              />
                              <ErrorMessage
                                component="div"
                                name="customers"
                                style={{ color: "red" }}
                              />
                              <Button
                                color="primary"
                                className="m-2"
                                type="submit"
                              >
                                Submit
                              </Button>
                              {error && <p style={{ color: "red" }}>{error}</p>}
                              {!error && clicked && <Redirect to="/paGoals" />}
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

export default PAClients
