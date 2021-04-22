import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
import { Redirect } from "react-router-dom"
import { formPostData, formGetData, patchData } from "./ApiRequest"

const initialValues = {
  region: "",
}

const ProvidingService = () => {
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
          "/services/advertise/offer-info",
          localStorage.getItem("token")
        )
        if (data.payload) {
          setId(data.payload["_id"])
          initialValues.region = data.payload.region
          setValues(initialValues)
        }
        console.log(initialValues)
        setError(null)
      } catch (err) {
        console.log(err.response)
        setError(err.response)
      }
    }
    fetchData()
  }, [])

  const validate = values => {
    const errors = {}
    if (values.region.length < 3) {
      errors.region = "Atleast 3 characters are required"
    }
    return errors
  }

  async function handleSubmit(data) {
    let resData
    console.log(data)
    try {
      if (value) {
        resData = await patchData(
          "/services/advertise/offer-info",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/advertise/offer-info",
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
    // <div className="page-content">
    //   <div className="container">
    //     <Row>
    //       <Col sm={2}></Col>

    //       <Col sm={8}>
    //         <FormikComponent
    //           initialValues={initialValues}
    //           handleSubmit={handleSubmit}
    //           validate={validate}
    //         >
    //           <p>What city/country do you provide your services?</p>
    //           <Field
    //             name="region"
    //             className="form-control"
    //             placeholder="city/country"
    //           />
    //           <ErrorMessage
    //             name="region"
    //             component="div"
    //             style={{ color: "red" }}
    //           />
    //           {/* {error && (
    //             <p style={{ color: "red" }}>
    //               {error}. Please check the Web Development checkbox in
    //               CheckList form section in order to submit this form.
    //             </p>
    //           )} */}

    //           <div>
    //             <Button type="submit" className="w-md mt-2" color="primary">
    //               Submit
    //             </Button>
    //             {!error && clicked && <Redirect to="paCompetitors" />}
    //             {redirect && <Redirect to="login" />}
    //           </div>
    //         </FormikComponent>
    //       </Col>
    //       <Col sm={2}></Col>
    //     </Row>
    //   </div>
    // </div>
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
                          <p>What city/country do you provide your services?</p>
                          <Field
                            name="region"
                            className="form-control"
                            placeholder="city/country"
                          />
                          <ErrorMessage
                            name="region"
                            component="div"
                            style={{ color: "red" }}
                          />
                          {/* {error && (
                <p style={{ color: "red" }}>
                  {error}. Please check the Web Development checkbox in
                  CheckList form section in order to submit this form.
                </p>
              )} */}

                          <div>
                            <Button
                              type="submit"
                              className="w-md mt-2"
                              color="primary"
                            >
                              Submit
                            </Button>
                            {!error && clicked && (
                              <Redirect to="paCompetitors" />
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

export default ProvidingService
