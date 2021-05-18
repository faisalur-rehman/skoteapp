import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"

import FormikComponent from "./Formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"

import { formGetData, formPostData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"
import VerticalLinearStepper from "./Stepper"

import profile from "../../assets/images/profile-img.png"
import Step1 from "./Step1"

const initialValues = {
  description: "",
  web_addresses: [],
  webAddress1: "",
  webAddress2: "",
  webAddress3: "",
}
const Competitors = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const steps = [
    "Introduction",
    "Unique Selling Point",
    "Competitors",
    "Target Market",
    "Clients",
  ]

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setRedirect(true)
    }
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/business/competitor",
          localStorage.getItem("token")
        )
        if (data.competitor !== null) {
          setId(data.competitor["_id"])
          initialValues.description = data.competitor.description
          initialValues.webAddress1 = data.competitor.web_addresses[0]
          initialValues.webAddress2 = data.competitor.web_addresses[1]
          initialValues.webAddress3 = data.competitor.web_addresses[2]
          setValues(initialValues)
        }
        setError(null)
      } catch (err) {
        // setError(err.response)
      }
    }
    fetchData()
  }, [])
  function validate(values) {
    const errors = {}
    if (values.description.length < 3) {
      errors.description = "Description should not be less than 3 characters."
    }
    return errors
  }
  async function handleSubmit(data) {
    // console.log("form data", data)
    let resData
    initialValues.web_addresses.push(data.webAddress1)
    initialValues.web_addresses.push(data.webAddress2)
    initialValues.web_addresses.push(data.webAddress3)

    let { description, web_addresses } = initialValues
    let newData = {
      description: data.description,
      web_addresses,
    }
    try {
      if (value) {
        resData = await patchData(
          "/business/competitor",
          id,
          newData,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/business/competitor",
          newData,
          localStorage.getItem("token")
        )
      }
      setError(null)
      initialValues.web_addresses = []
    } catch (err) {
      setError(err.response.data.errors[0])
      initialValues.web_addresses = []
    }
    setClicked(true)
  }
  return (
    <div className="container">
      <Row>
        <Col sm={2}>
          <Step1 active={2} />
        </Col>
        <Col sm={10}>
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
                          Step1
                        </li>
                        <li
                          style={{ color: "blue" }}
                          className="breadcrumb-item"
                          aria-current="page"
                        >
                          Competitor
                        </li>
                      </ol>
                    </nav>
                    <Card className="overflow-hidden">
                      <div className="bg-primary bg-soft">
                        <Row>
                          <Col xs={7}>
                            <div className="text-primary p-4">
                              <h5 className="text-primary">Competitors!</h5>
                            </div>
                          </Col>
                          <Col className="col-5 align-self-end">
                            <img src={profile} alt="" className="img-fluid" />
                          </Col>
                        </Row>
                      </div>
                      <CardBody className="pt-0">
                        <div className="p-2">
                          <label htmlFor="competitor">
                            Who are your main competitors? Please provide there
                            website addresses.{" "}
                          </label>
                          <Field
                            as="textarea"
                            name="description"
                            id="competitor"
                            className="form-control"
                          />
                          <br />
                          <ErrorMessage
                            component="div"
                            style={{ color: "red" }}
                            name="description"
                          />

                          <div>
                            <Button
                              type="submit"
                              color="primary"
                              className="w-md mt-3"
                            >
                              Submit
                            </Button>
                          </div>
                          {!error && clicked && <Redirect to="targetMarket" />}
                          {redirect && <Redirect to="login" />}
                        </div>
                      </CardBody>
                    </Card>
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

export default Competitors
