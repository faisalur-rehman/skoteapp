import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { Redirect } from "react-router-dom"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import Step1 from "./Step1"

const initialValues = {
  offerLocation: "",
  competitor: "",
  client: "",
  goal: "",
  targetMarket: "",
}
const ProvidingService = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [services, setServices] = useState()

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setRedirect(true)
    }
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/ad-offer",
          localStorage.getItem("token")
        )
        const response = await formGetData(
          "/checklist",
          localStorage.getItem("token")
        )
        console.log(data)

        setServices({ ...response.data.checklist })
        if (data.adOffer) {
          setId(data.adOffer["_id"])
          initialValues.goal = data.adOffer.goal
          initialValues.competitor = data.adOffer.competitor
          initialValues.targetMarket = data.adOffer.targetMarket
          initialValues.offerLocation = data.adOffer.offerLocation
          initialValues.client = data.adOffer.client
          setValues(initialValues)
        }
        console.log(data)
        setError(null)
      } catch (err) {
        console.log(err)
        setError(err.response)
      }
    }
    fetchData()
  }, [])
  services && console.log(services)
  const validate = values => {
    const errors = {}
    if (values.offerLocation.length < 3) {
      errors.region = "Atleast 3 characters are required"
    }
    if (values.competitor.length < 3) {
      errors.region = "Atleast 3 characters are required"
    }
    if (values.client.length < 3) {
      errors.region = "Atleast 3 characters are required"
    }
    if (values.goal.length < 3) {
      errors.region = "Atleast 3 characters are required"
    }
    if (values.targetMarket.length < 3) {
      errors.region = "Atleast 3 characters are required"
    }
    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (value) {
        resData = await patchData(
          "/ad-offer",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/ad-offer",
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
    setRedirect(true)
  }

  return (
    <div className="">
      <Row>
        <Step1 active={2} />
        <Col>
          <FormikComponent
            initialValues={initialValues}
            validate={validate}
            handleSubmit={handleSubmit}
          >
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
                          Providing Service To
                        </li>
                      </ol>
                    </nav>
                    <Card className="overflow-hidden">
                      <div className="bg-primary bg-soft">
                        <Row>
                          <Col xs={8}>
                            <div className="text-primary p-4">
                              <h5 className="text-primary">
                                Providing Services to!
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
                          <p>What city/country do you provide your services?</p>
                          <Field
                            name="offerLocation"
                            className="form-control"
                            placeholder="city/country"
                            as="textarea"
                          />
                          <ErrorMessage
                            name="offerLocation"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <br />
                          <label htmlFor="competitor">
                            Who are your main competitors? Please provide there
                            website addresses.{" "}
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

                          <br />
                          <label>
                            Please describe a typical customer/client of your
                            business.{" "}
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
                          <br />
                          <label>
                            Please describe a typical customer/client of your
                            business.{" "}
                          </label>
                          <Field
                            as="textarea"
                            name="goal"
                            className="form-control"
                          />
                          <ErrorMessage
                            component="div"
                            name="goal"
                            style={{ color: "red" }}
                          />
                          <div>
                            <Button
                              type="submit"
                              className="w-md mt-2"
                              color="primary"
                            >
                              Submit
                            </Button>
                            {clicked && !error && <Redirect to="dashboard" />}
                            {clicked &&
                              !error &&
                              services &&
                              services.isLogoCreation && (
                                <Redirect to="logoDesign" />
                              )}
                            {clicked &&
                              !error &&
                              services &&
                              services.isMarketing && <Redirect to="posting" />}
                            {/* {!error && clicked && (
                              <Redirect to="paCompetitors" />
                            )}
                             {redirect && <Redirect to="login" />} 
                            {redirect && <Redirect to="posting" />} */}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          </FormikComponent>
        </Col>
      </Row>
    </div>
  )
}

export default ProvidingService
