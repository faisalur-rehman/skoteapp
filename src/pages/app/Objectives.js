import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { Redirect } from "react-router-dom"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import Step2 from "./Step2"

const initialValues = {
  achievement: "",
  success: "",
}

const Objectives = () => {
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
          "/services/wg-objective",
          localStorage.getItem("token")
        )
        if (data) {
          setId(data.objective["_id"])
          initialValues.achievement = data.objective.achievement
          initialValues.success = data.objective.success
          setValues(initialValues)
        }
        console.log(initialValues)
        setError(null)
      } catch (err) {
        //console.log(err.response.data.errors[0])
        //setError(err.response.data.errors[0])
      }
    }
    fetchData()
  }, [])

  const validate = values => {
    const errors = {}
    if (values.achievement.length < 5) {
      errors.achievement = "Atleast 5 characters are required"
    }
    if (values.success.length < 5) {
      errors.success = "Atleast 5 characters are required"
    }

    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (value) {
        resData = await patchData(
          "/services/wg-objective",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/wg-objective",
          data,
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
        <Step2 active={1} />
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
                          Step2
                        </li>
                        <li
                          style={{ color: "blue" }}
                          className="breadcrumb-item"
                          aria-current="page"
                        >
                          Objectives
                        </li>
                      </ol>
                    </nav>
                    <Card className="overflow-hidden">
                      <div className="bg-primary bg-soft">
                        <Row>
                          <Col xs={7}>
                            <div className="text-primary p-4">
                              <h5 className="text-primary">Objectives!</h5>
                            </div>
                          </Col>
                          <Col className="col-5 align-self-end">
                            <img src={profile} alt="" className="img-fluid" />
                          </Col>
                        </Row>
                      </div>
                      <CardBody className="pt-0">
                        <div className="p-2">
                          <p>Your achievements and Success?</p>
                          <Field
                            name="achievement"
                            className="form-control"
                            placeholder="Achievements"
                          />
                          <ErrorMessage
                            name="achievement"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <br />
                          <Field
                            name="success"
                            className="form-control"
                            placeholder="Success"
                          />
                          <ErrorMessage
                            name="success"
                            component="div"
                            style={{ color: "red" }}
                          />

                          {error && (
                            <p style={{ color: "red" }}>
                              {error}. Please check the Web Development checkbox
                              in CheckList form section in order to submit this
                              form.
                            </p>
                          )}

                          <div>
                            <Button
                              type="submit"
                              className="w-md mt-2"
                              color="primary"
                            >
                              Submit
                            </Button>
                            {!error && clicked && <Redirect to="sitemap" />}
                            {redirect && <Redirect to="login" />}
                          </div>
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

export default Objectives
