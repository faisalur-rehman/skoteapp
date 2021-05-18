import React, { useState, useEffect } from "react"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { Formik, Form, Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"

import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"
import Step4 from "./Step4"

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
          "/services/advertise/service",
          localStorage.getItem("token")
        )
        console.log(data.payload)
        if (data.payload) {
          setId(data.payload["_id"])
          data.payload.services.map(
            (service, index) => (initialValues.services[index] = service)
          )
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
    if (values.services.length < 1) {
      errors.services = "You have to select atleast one service"
    }

    return errors
  }
  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (value) {
        resData = await patchData(
          "/services/advertise/service",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/advertise/service",
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
  }
  return (
    <div className="">
      <Row>
        <Step4 active={0} />
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
                          Step4
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
                            Please click the services you will be using with
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

                          {/* {error && (
                            <p style={{ color: "red" }}>
                              {error}.Go to Checklist form in Services Section
                              and check Paid Advertising in order to proceed.
                            </p>
                          )} */}
                          <Button type="submit" color="primary">
                            Submit
                          </Button>
                          {!error && clicked && (
                            <Redirect to="providingService" />
                          )}
                          {redirect && <Redirect to="login" />}
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
