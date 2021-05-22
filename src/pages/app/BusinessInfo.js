import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "./ApiRequest"
import { Link, Redirect } from "react-router-dom"

import profile from "../../assets/images/profile-img.png"
import Step1 from "./Step1"

const initialValues = {
  introduction: "",
  sellingPoint: "",
  competitor: "",
  targetMarket: "",
  client: "",
}

const BusinessInfo = () => {
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
          "/bus-detail",
          localStorage.getItem("token")
        )
        console.log(data)
        if (data.busDetail) {
          setId(data.busDetail["_id"])
          initialValues.introduction = data.busDetail.introduction
          initialValues.sellingPoint = data.busDetail.sellingPoint
          initialValues.competitor = data.busDetail.competitor
          initialValues.targetMarket = data.busDetail.targetMarket
          initialValues.client = data.busDetail.client
          setValues(initialValues)
        }
        setError(null)
      } catch (err) {
        // setError(err.response)
        console.log(err)
      }
    }
    fetchData()
  }, [])
  function validate(values) {
    const errors = {}
    if (!values.introduction) {
      errors.introduction = "Required"
    }
    if (!values.sellingPoint) {
      errors.sellingPoint = "Required"
    }
    if (!values.targetMarket) {
      errors.targetMarket = "Required"
    }
    if (!values.client) {
      errors.client = "Required"
    }
    if (!values.competitor) {
      errors.competitor = "Required"
    }
    return errors
  }
  async function handleSubmit(data) {
    console.log(data)
    let resData
    let newData = {
      introduction: data.introduction,
    }
    console.log(newData)

    try {
      if (value) {
        resData = await patchData(
          "/bus-detail",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/bus-detail",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
    } catch (err) {
      setError(err.response.data.errors[0])
      console.log(err.response)
    }
    setRedirect(true)
    setClicked(true)
  }
  return (
    <div className="">
      <Row>
        <Col sm={2}>
          <Step1 active={0} />
        </Col>
        <Col sm={10}>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <div className="account-pages  pt-sm-5">
                  <div>
                    <Row className="justify-content-center">
                      <Col sm={8}>
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
                              Business Info
                            </li>
                          </ol>
                        </nav>
                        <Card className="overflow-hidden">
                          <div className="bg-primary bg-soft">
                            <Row>
                              <Col xs={8}>
                                <div className="text-primary p-4">
                                  <h5 className="text-primary">
                                    Business Info!
                                  </h5>
                                </div>
                              </Col>
                              <Col className="col-4 align-self-end">
                                <img
                                  src={profile}
                                  alt=""
                                  className="img-fluid"
                                  style={{ height: 100 }}
                                />
                              </Col>
                            </Row>
                          </div>
                          <CardBody className="pt-0">
                            <div className="p-2">
                              <label htmlFor="introduction" className="mt-3">
                                Give us a bit of context about your business.
                                What does your company do? What are your
                                products and/or services?
                              </label>
                              <Field
                                name="introduction"
                                id="introduction"
                                className="form-control"
                                as="textarea"
                              />
                              <ErrorMessage
                                name="introduction"
                                component="div"
                                style={{ color: "red" }}
                              />
                              <br />
                              <label htmlFor="competitor">
                                Who are your main competitors? Please provide
                                there website addresses.{" "}
                              </label>
                              <Field
                                as="textarea"
                                name="competitor"
                                id="competitor"
                                className="form-control"
                              />
                              <br />
                              <ErrorMessage
                                component="div"
                                style={{ color: "red" }}
                                name="competitor"
                              />
                              <br />
                              <label htmlFor="targetMarket">
                                What is your niche market? Who is your target
                                audience? (e.g. age, gender, location, socio
                                economic status)
                              </label>
                              <Field
                                as="textarea"
                                id="targetMarket"
                                name="targetMarket"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="targetMarket"
                                component="div"
                                style={{ color: "red" }}
                              />
                              <br />
                              <label htmlFor="sellingPoint">
                                What are your unique selling points? What is the
                                strength of your proposition? Why would a
                                customer choose you over one of your
                                competitors?
                              </label>
                              <Field
                                as="textarea"
                                id="sellingPoint"
                                name="sellingPoint"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="sellingPoint"
                                component="div"
                                style={{ color: "red" }}
                              />
                              <br />
                              <label>
                                Please describe a typical customer/client of
                                your business.{" "}
                              </label>
                              <Field
                                as="textarea"
                                name="client"
                                className="form-control"
                              />
                              <ErrorMessage
                                component="div"
                                name="client"
                                style={{ color: "red" }}
                              />
                            </div>
                            <br />

                            <Button
                              type="submit"
                              color="primary"
                              className="mt-3"
                            >
                              Submit
                            </Button>
                            {redirect && <Redirect to="services" />}
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
        {/* <Col sm={2}></Col> */}
      </Row>
    </div>
    // </div>
  )
}

export default BusinessInfo
