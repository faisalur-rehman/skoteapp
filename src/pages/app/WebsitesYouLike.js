import React, { useState, useEffect } from "react"
import { Formik, Field, FieldArray, ErrorMessage, Form } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { Redirect } from "react-router-dom"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import Step3 from "./Step3"

const initialValues = { websites: [""] }

const WebsitesYouLike = () => {
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
          "/services/design/like",
          localStorage.getItem("token")
        )
        console.log(data.like)
        if (data.like) {
          setId(data.like["_id"])
          data.like.websites.map((website, index) => {
            initialValues[`website${index}`] = website
            initialValues.websites[index] = website
          })
          setValues(initialValues)
          setError(null)
        }
        // console.log(initialValues)
      } catch (error) {
        console.log(error.response)
        setError(error.response.data.message)
      }
    }
    fetchData()
  }, [])

  function validate(values) {
    const errors = {}
    if (values.websites.length < 3) {
      errors.websites = "Minimum 3 websites required."
    }

    return errors
  }
  async function handleSubmit(data) {
    let resData
    console.log(data)
    let websites = []
    data.websites.map((website, index) =>
      websites.push(data[`website${index}`])
    )
    let newData = {
      websites,
    }
    console.log(websites, newData)
    try {
      if (value) {
        resData = await patchData(
          "/services/design/like",
          id,
          newData,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/design/like",
          newData,
          localStorage.getItem("token")
        )
      }
      setError(null)
    } catch (err) {
      setError(err.response.data.errors[0])
      console.log(err.response)
    }
    setClicked(true)
  }
  return (
    <div className="container">
      <Row>
        <Step3 active={0} />
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
                              Websites You Like
                            </li>
                          </ol>
                        </nav>
                        <Card className="overflow-hidden">
                          <div className="bg-primary bg-soft">
                            <Row>
                              <Col xs={7}>
                                <div className="text-primary p-4">
                                  <h5 className="text-primary">
                                    Websites You Like!
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
                                Please send us links to websites you really
                                like. (Minimum 3) If you have one in particular
                                you would like to emulate, let us know.
                              </label>
                              <Field
                                name="like"
                                id="bus_short_desc"
                                className="form-control"
                                as="textarea"
                              />
                              <ErrorMessage
                                name="like"
                                component="div"
                                style={{ color: "red" }}
                              />
                              <div>
                                <Button
                                  type="submit"
                                  color="primary"
                                  className="mt-3"
                                >
                                  Submit
                                </Button>
                              </div>
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

export default WebsitesYouLike
