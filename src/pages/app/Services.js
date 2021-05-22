import React, { useState, useEffect } from "react"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { Formik, Form, Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"

import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"
import Step1 from "./Step1"

const initialValues = {
  service: "",
}

const CheckList = () => {
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
          "/ad-service",
          localStorage.getItem("token")
        )
        console.log(data)
        if (data.adService) {
          setId(data.adService["_id"])

          initialValues.service = data.adService.service

          setValues(initialValues)
        }
        setError(null)
      } catch (err) {
        // setError(err.response.data.message)
        console.log(err.response)
      }
    }
    fetchData()
  }, [])

  function validate(values) {
    const errors = {}
    if (values.service.length < 3) {
      errors.service = "Should be atleast 3 characters long."
    }

    return errors
  }
  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (value) {
        resData = await patchData(
          "/ad-service",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/ad-service",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
    } catch (err) {
      setError(err.response.data.message)
      console.log(err.response)
    }
    setClicked(true)
    setRedirect(true)
  }
  return (
    <div className="">
      <Row>
        <Step1 active={1} />
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
                          Services
                        </li>
                      </ol>
                    </nav>
                    <Card className="overflow-hidden">
                      <div className="bg-primary bg-soft">
                        <Row>
                          <Col xs={8}>
                            <div className="text-primary p-4">
                              <h5 className="text-primary">Services!</h5>
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
                          <p>
                            Please choose the services you will be using with
                            Sicuro Group
                          </p>
                          <p>○ Social Media Advertising</p>
                          <p>○ Google Advertising</p>
                          <Field
                            name="service"
                            className="form-control"
                            placeholder="Services"
                            as="textarea"
                          />
                          <ErrorMessage
                            name="service"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <br />
                          <Button type="submit" color="primary">
                            Submit
                          </Button>
                          {/* {!error && clicked && (
                            <Redirect to="providingService" />
                          )} */}
                          {/* {redirect && <Redirect to="providingService" />} */}
                          {/* {redirect && <Redirect to="login" />} */}
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

export default CheckList
