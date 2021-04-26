import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"

import { Redirect } from "react-router-dom"
import { formGetData, formPostData, patchData } from "./ApiRequest"

const initialValues = { niche_market: "", target_audience: "" }

const PATargetMarket = () => {
  const [values, setValues] = useState()
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
          "/services/advertise/offer-target",
          localStorage.getItem("token")
        )
        console.log(data)
        if (data.payload) {
          setId(data.payload["_id"])
          initialValues.niche_market = data.payload.niche_market
          initialValues.target_audience = data.payload.target_audience
          setValues(initialValues)
        }
        setError(null)
      } catch (err) {
        setError(err.response)
        console.log(err.response)
      }
    }
    fetchData()
  }, [])
  function validate(values) {
    const errors = {}
    if (values.target_audience.length < 3) {
      errors.target_audience = "There must be atleast 3 characters."
    }
    if (values.niche_market.length < 3) {
      errors.niche_market = "There must be atleast 3 characters."
    }
    return errors
  }
  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (values) {
        resData = await patchData(
          "/services/advertise/offer-target",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/advertise/offer-target",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
      setSubmitted(true)
    } catch (err) {
      setSubmitted(false)
      setError(err.response)
      console.log(err.response)
    }
    setClicked(true)
  }
  console.l
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
                          Step4
                        </li>
                        <li
                          style={{ color: "blue" }}
                          className="breadcrumb-item"
                          aria-current="page"
                        >
                          Target Market
                        </li>
                      </ol>
                    </nav>
                    <Card className="overflow-hidden">
                      <div className="bg-primary bg-soft">
                        <Row>
                          <Col xs={7}>
                            <div className="text-primary p-4">
                              <h5 className="text-primary">
                                Paid Advertising Target Market!
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
                          <label htmlFor="niche_market">
                            Your Niche Market:{" "}
                          </label>
                          <Field
                            name="niche_market"
                            id="niche_market"
                            className="form-control"
                          />
                          <ErrorMessage
                            component="div"
                            name="niche_market"
                            style={{ color: "red" }}
                          />
                          <br />
                          <label htmlFor="target_audience">
                            Your target audience:{" "}
                          </label>
                          <Field
                            name="target_audience"
                            id="target_audience"
                            className="form-control"
                          />
                          <ErrorMessage
                            component="div"
                            name="target_audience"
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
                          {!error && clicked && <Redirect to="posting" />}
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

export default PATargetMarket
