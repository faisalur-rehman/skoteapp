import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { formGetData, formPostData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"
import VerticalLinearStepper from "./Stepper"

const initialValues = { description: "", strength: "", reason_to_choose: "" }
const UniqueSelling = () => {
  const [values, setValues] = useState()
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
          "/business/usp",
          localStorage.getItem("token")
        )
        if (data.usp) {
          setId(data.usp["_id"])
          initialValues.description = data.usp.description
          initialValues.strength = data.usp.strength
          initialValues.reason_to_choose = data.usp.reason_to_choose
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
    if (!values.description) {
      errors.description = "Required"
    }
    if (!values.strength) {
      errors.strength = "Required"
    }
    if (!values.reason_to_choose) {
      errors.reason_to_choose = "Required"
    }
    return errors
  }
  async function handleSubmit(data) {
    let resData
    try {
      if (values) {
        resData = await patchData(
          "/business/usp",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/business/usp",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
    } catch (err) {
      setError(err.response)
    }
    setClicked(true)
  }
  return (
    <div className="container">
      <Row>
        <Col sm={2}>
          <div className="account-pages mt-10 my-5 pt-sm-5">
            <Container>
              <Row>
                <Col>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        <VerticalLinearStepper active={1} step={steps} />
                      </li>
                    </ol>
                  </nav>
                </Col>
              </Row>
            </Container>
          </div>
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
                          Unique Selling
                        </li>
                      </ol>
                    </nav>
                    <Card className="overflow-hidden">
                      <div className="bg-primary bg-soft">
                        <Row>
                          <Col xs={7}>
                            <div className="text-primary p-4">
                              <h5 className="text-primary">Unique Selling!</h5>
                            </div>
                          </Col>
                          <Col className="col-5 align-self-end">
                            <img src={profile} alt="" className="img-fluid" />
                          </Col>
                        </Row>
                      </div>
                      <CardBody className="pt-0">
                        <div className="p-2">
                          <label htmlFor="description">
                            Your unique selling point:{" "}
                          </label>
                          <Field
                            type="text"
                            id="description"
                            name="description"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="description"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <br />

                          <label htmlFor="strength">Your Strength: </label>
                          <Field
                            type="text"
                            id="strength"
                            name="strength"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="strength"
                            component="div"
                            style={{ color: "red" }}
                          />

                          <br />

                          <label htmlFor="reason_to_choose">
                            Why should customer choose you?{" "}
                          </label>
                          <Field
                            type="text"
                            id="reason_to_choose"
                            name="reason_to_choose"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="reason_to_choose"
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
                          {!error && clicked && <Redirect to="competitors" />}
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

export default UniqueSelling
