import React, { useState, useEffect } from "react"
import { Formik, Field, FieldArray, Form } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { Redirect } from "react-router-dom"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import Step3 from "./Step3"

const initialValues = {
  websites: [""],
}

const WebsitesYouDisLike = () => {
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
          "/services/design/dislike",
          localStorage.getItem("token")
        )
        console.log(data.dislike)
        if (data.dislike) {
          setId(data.dislike["_id"])
          data.dislike.websites.map((website, index) => {
            initialValues[`website${index}`] = website
            initialValues.websites[index] = website
          })
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

  const validate = () => {
    const errors = {}
    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    let websites = []
    data.websites.map((website, index) =>
      websites.push(data[`website${index}`])
    )
    console.log(websites)
    let newData = {
      websites,
    }
    try {
      if (value) {
        resData = await patchData(
          "/services/design/dislike",
          id,
          newData,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/design/dislike",
          newData,
          localStorage.getItem("token")
        )
      }
      setError(null)
      console.log(resData)
    } catch (err) {
      setError(err.response.data.errors[0])
      console.log(err.response)
    }
    setClicked(true)
  }

  return (
    <div className="container">
      <Row>
        <Step3 active={1} />
        <Col>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {() => (
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
                              Step3
                            </li>
                            <li
                              style={{ color: "blue" }}
                              className="breadcrumb-item"
                              aria-current="page"
                            >
                              Websites You Dislike
                            </li>
                          </ol>
                        </nav>
                        <Card
                          className="overflow-hidden"
                          style={{ minHeight: "300px" }}
                        >
                          <div className="bg-primary bg-soft">
                            <Row>
                              <Col xs={7}>
                                <div className="text-primary p-4">
                                  <h5 className="text-primary">
                                    Websites You DisLike!
                                  </h5>
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
                              <label htmlFor="websites">
                                Enter website's name you dislike.
                              </label>
                              <FieldArray name="websites">
                                {props => {
                                  const { form, push, remove } = props
                                  const { values } = form
                                  const { websites } = values

                                  return (
                                    <div>
                                      {websites.map((website, index) => (
                                        <Field
                                          name={`website${index}`}
                                          type="text"
                                          key={index}
                                          className="form-control"
                                        />
                                      ))}
                                      {error && (
                                        <p style={{ color: "red" }}>{error}</p>
                                      )}

                                      <Button
                                        color="secondary"
                                        onClick={() => push("")}
                                      >
                                        Add Website
                                      </Button>
                                      <Button
                                        color="primary"
                                        className="m-2"
                                        type="submit"
                                      >
                                        Submit
                                      </Button>
                                      {!error && clicked && (
                                        <Redirect to="websiteColor" />
                                      )}
                                      {redirect && <Redirect to="login" />}
                                    </div>
                                  )
                                }}
                              </FieldArray>
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

export default WebsitesYouDisLike
