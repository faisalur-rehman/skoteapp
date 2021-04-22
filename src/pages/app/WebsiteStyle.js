import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { Redirect } from "react-router-dom"
import { formPostData, formGetData, patchData } from "./ApiRequest"

const initialValues = {
  style: "",
  perceive: "",
}

const WebsiteStyle = () => {
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
          "/services/design/style",
          localStorage.getItem("token")
        )
        console.log(data.style)
        if (data.style) {
          setId(data.style["_id"])

          initialValues.style = data.style.style
          initialValues.perceive = data.style.perceive

          setValues(initialValues)
          setError(null)
        }
        console.log(initialValues)
      } catch (error) {
        // setError(error.response)
      }
    }
    fetchData()
  }, [])

  const validate = values => {
    const errors = {}
    if (!values.style) {
      errors.style = "Required"
    }
    if (!values.perceive) {
      errors.perceive = "Required"
    }
    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (value) {
        resData = await patchData(
          "/services/design/style",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/design/style",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
      console.log(resData)
    } catch (err) {
      setError(err.response.data.errors)
      console.log(err.response)
    }
    setClicked(true)
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
                    <Card className="overflow-hidden">
                      <div className="bg-primary bg-soft">
                        <Row>
                          <Col xs={7}>
                            <div className="text-primary p-4">
                              <h5 className="text-primary">Website Style!</h5>
                            </div>
                          </Col>
                          <Col className="col-5 align-self-end">
                            <img src={profile} alt="" className="img-fluid" />
                          </Col>
                        </Row>
                      </div>
                      <CardBody className="pt-0">
                        <div className="p-2">
                          <p>Style of Website you are looking for?</p>
                          <Field
                            type="text"
                            name="style"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="style"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <p>
                            How would you like your visitors to perceive your
                            new website?
                          </p>
                          <Field
                            type="text"
                            name="perceive"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="perceive"
                            component="div"
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
                            {!error && clicked && (
                              <Redirect to="websiteContent" />
                            )}
                            {redirect && <Redirect to="login" />}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    <div className="mt-5 text-center">
                      <p>
                        © {new Date().getFullYear()} Skote. Crafted with{" "}
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

export default WebsiteStyle
