import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { Redirect } from "react-router-dom"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import Step2 from "./Step2"

const initialValues = {
  objective: "",
  goal: "",
  callToAction: "",
  sitemap: "",
  advancedFeature: "",
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
    // async function fetchData() {
    //   try {
    //     const { data } = await formGetData(
    //       "/web-goal",
    //       localStorage.getItem("token")
    //     )
    //     if (data) {
    //       setId(data.objective["_id"])
    //       initialValues.objective = data.objective.objective
    //       initialValues.goal = data.objective.goal
    //       setValues(initialValues)
    //     }
    //     console.log(initialValues)
    //     setError(null)
    //   } catch (err) {
    //     console.log(err.response)
    //     //setError(err.response.data.errors[0])
    //   }
    // }
    // fetchData()
  }, [])

  const validate = values => {
    console.log(values)
    const errors = {}
    if (values.objective.length < 5) {
      errors.objective = "Atleast 5 characters are required"
    }
    if (values.goal.length < 5) {
      errors.goal = "Atleast 5 characters are required"
    }
    if (values.sitemap.length < 5) {
      errors.sitemap = "Atleast 5 characters are required"
    }
    if (values.callToAction.length < 5) {
      errors.callToAction = "Atleast 5 characters are required"
    }
    if (values.advancedFeature.length < 5) {
      errors.advancedFeature = "Atleast 5 characters are required"
    }

    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (value) {
        resData = await patchData(
          "/web-goal",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/web-goal",
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
    <div className="">
      <Row>
        <Step2 active={1} />
        <Col>
          <FormikComponent
            initialValues={initialValues}
            validate={validate}
            handleSubmit={handleSubmit}
          >
            <div className="account-pages  pt-sm-5">
              <Container>
                <Row className="justify-content-center">
                  <Col sm={8}>
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
                          <Col xs={8}>
                            <div className="text-primary p-4">
                              <h5 className="text-primary">Website Goals!</h5>
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
                        <div className="p-2 mt-3">
                          <p>
                            What does your website need to achieve for your
                            business? What will make this website a success for
                            you?
                          </p>
                          <Field
                            name="objective"
                            className="form-control"
                            placeholder="Objectives"
                            as="textarea"
                          />
                          <ErrorMessage
                            name="objective"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <br />
                          <label htmlFor="goal">
                            Please enter the most important goal of your website
                            from the list below in the area opposite: o Promote
                            a brand and image o Promote a product range o
                            Improve access to information o Create a web
                            presence o Increase sales leads o Other ??? (please
                            specify){" "}
                          </label>
                          <br />

                          <Field
                            as="textarea"
                            name="goal"
                            className="form-control"
                            placeholder="Goals"
                          />
                          <br />

                          <ErrorMessage
                            name="goal"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <br />
                          <label htmlFor="callToAction">
                            Please describe the action you would like visitors
                            to take after visiting your website. (e.g. call a
                            phone number, complete a form, make a comment etc.){" "}
                          </label>
                          <Field
                            name="callToAction"
                            className="form-control"
                            as="textarea"
                            placeholder="Call to action"
                          />
                          <ErrorMessage
                            name="callToAction"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <br />
                          <p>
                            Do you have any indication of what pages or sections
                            the website should be made of? Please outline the
                            pages and subpages required. (e.g. Home, About,
                            Services/Products, Contact etc)
                          </p>
                          <Field
                            name="sitemap"
                            as="textarea"
                            className="form-control"
                            placeholder="sitemap"
                          />
                          <ErrorMessage
                            name="sitemap"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <br />
                          <p>
                            Does your website require any specific extra
                            functionality? (e.g. online store, product
                            catalogue, online directory, advanced search
                            functionality, advanced online forms, newsletter
                            subscription, Membership login area, online booking
                            system, advanced gallery, online payment system,
                            integration with existing software)
                          </p>
                          <Field
                            name="advancedFeature"
                            className="form-control"
                            placeholder="Advanced Feature"
                            as="textarea"
                          />
                          <ErrorMessage
                            name="advancedFeature"
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
