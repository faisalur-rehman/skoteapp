import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { Redirect } from "react-router-dom"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import Step5 from "./Step5"

const initialValues = {
  credential: "",
  first: "",
  last: "",
}

const FacebookUrl = () => {
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
          "/services/social-media/fb-credential",
          localStorage.getItem("token")
        )
        console.log(data.payload)
        if (data.payload) {
          setId(data.payload["_id"])
          initialValues.credential = data.payload.credential
          initialValues.first = data.payload.first
          initialValues.last = data.payload.last
          setValues(initialValues)
        }
        setError(null)
      } catch (err) {
        console.log(err.response.data.message)
        setError(err.response.data.message)
      }
    }
    fetchData()
  }, [])

  const validate = values => {
    const errors = {}
    // if (values.indication.length < 3) {
    //   errors.indication = "Atleast 3 characters are required"
    // }
    // if (values.outline.length < 3) {
    //   errors.outline = "Atleast 3 characters are required"
    // }

    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (value) {
        resData = await patchData(
          "/services/social-media/fb-credential",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/social-media/fb-credential",
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
  }

  return (
    <div className="">
      <Row>
        <Step5 active={2} />
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
                          Step5
                        </li>
                        <li
                          style={{ color: "blue" }}
                          className="breadcrumb-item"
                          aria-current="page"
                        >
                          Facebook Credentials
                        </li>
                      </ol>
                    </nav>
                    <Card className="overflow-hidden">
                      <div className="bg-primary bg-soft">
                        <Row>
                          <Col xs={8}>
                            <div className="text-primary p-4">
                              <h5 className="text-primary">
                                Facebook Credentials!
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
                          <p>
                            What social media platforms will Sicuro Group be
                            managing/advertising{" "}
                          </p>
                          <Field
                            name="credential"
                            className="form-control"
                            placeholder="credential"
                            as="textarea"
                          />
                          <ErrorMessage
                            name="indication"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <br />
                          <p>Facebook:</p>
                          <Field
                            name="credential"
                            className="form-control"
                            as="textarea"
                            placeholder="credential"
                          />
                          <ErrorMessage
                            name="indication"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <br />
                          <p>
                            Would you like to use a different way for Sicuro
                            Group to access your account?
                          </p>
                          <Field
                            name="credential"
                            className="form-control"
                            as="textarea"
                            placeholder="credential"
                          />
                          <ErrorMessage
                            name="indication"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <br />
                          <p>Do you have an Ad account ID?</p>
                          <Field
                            name="adAccount"
                            className="form-control"
                            as="textarea"
                            placeholder="ad account id"
                          />
                          <ErrorMessage
                            name="adAccount"
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
                              <Redirect to="accessAccount" />
                            )}
                            {redirect && <Redirect to="login" />}
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

export default FacebookUrl
