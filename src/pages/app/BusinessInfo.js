import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "./ApiRequest"
import { Link, Redirect } from "react-router-dom"

import profile from "../../assets/images/profile-img.png"

const initialValues = { bus_short_desc: "", company_do: "", products: [""] }

const BusinessInfo = () => {
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
          "/business/introduction",
          localStorage.getItem("token")
        )
        console.log(data)
        if (data.introduction) {
          setId(data.introduction["_id"])
          initialValues.bus_short_desc = data.introduction.bus_short_desc
          initialValues.company_do = data.introduction.company_do
          data.introduction.products.map(
            (product, index) => (initialValues.products[index] = product)
          )

          setValues(initialValues)
        }
        setError(null)
      } catch (err) {
        // setError(err.response)
        console.log(err)
      }
    }
    fetchData()
  }, [])
  function validate(values) {
    const errors = {}
    if (!values.bus_short_desc) {
      errors.bus_short_desc = "Required"
    }
    if (values.bus_short_desc.length < 5) {
      errors.bus_short_desc = "Length must be atleast 5 characters long."
    }
    if (values.company_do.length < 5) {
      errors.company_do = "Length must be atleast 5 characters long."
    }
    if (values.bus_short_desc.length < 5) {
      errors.bus_short_desc = "Length must be atleast 5 characters long."
    }
    for (let i = 0; i < values.products; i++) {
      if (!values.products[i] || values.products[i].length < 3) {
        errors.product[i] = "Length must be atleast 3 characters long."
      }
    }
    return errors
  }
  async function handleSubmit(data) {
    console.log(data)
    let resData
    let newData = {
      bus_short_desc: data.bus_short_desc,
      company_do: data.company_do,
      products: data.products,
    }
    console.log(newData)

    try {
      if (value) {
        resData = await patchData(
          "/business/introduction",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/business/introduction",
          data,
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
        {/* <Col sm={2}>Step 1:</Col> */}
        <Col sm={12}>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
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
                              Step1
                            </li>
                            <li
                              style={{ color: "blue" }}
                              className="breadcrumb-item"
                              aria-current="page"
                            >
                              Business Info
                            </li>
                          </ol>
                        </nav>
                        <Card className="overflow-hidden">
                          <div className="bg-primary bg-soft">
                            <Row>
                              <Col xs={7}>
                                <div className="text-primary p-4">
                                  <h5 className="text-primary">
                                    Introduction !
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
                              <label htmlFor="bus_short_desc">
                                Short Notes:{" "}
                              </label>
                              <Field
                                name="bus_short_desc"
                                id="bus_short_desc"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="bus_short_desc"
                                component="div"
                                style={{ color: "red" }}
                              />
                              <br />
                              <label htmlFor="company_do">Your Company: </label>
                              <Field
                                name="company_do"
                                id="company_do"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="company_do"
                                component="div"
                                style={{ color: "red" }}
                              />

                              <br />
                              <label>Your Products: </label>

                              <FieldArray name="products">
                                {({ push }) => (
                                  <div>
                                    {values.products.map((product, index) => (
                                      <div key={index}>
                                        <Field
                                          name={`products[${index}]`}
                                          className="form-control"
                                        />
                                        <br />
                                        <ErrorMessage
                                          name={`product[${index}]`}
                                          component="div"
                                          style={{ color: "red" }}
                                        />
                                      </div>
                                    ))}
                                    {error && (
                                      <p style={{ color: "red" }}>{error}</p>
                                    )}
                                    <Button
                                      color="secondary"
                                      onClick={() => push("")}
                                    >
                                      Add More Products
                                    </Button>
                                    <Button
                                      color="primary"
                                      className="m-2"
                                      type="submit"
                                    >
                                      Submit
                                    </Button>
                                    {!error && clicked && (
                                      <Redirect to="uniqueSelling" />
                                    )}
                                    {redirect && <Redirect to="login" />}
                                  </div>
                                )}
                              </FieldArray>
                            </div>
                          </CardBody>
                        </Card>
                        <div className="mt-5 text-center">
                          <p>
                            © {new Date().getFullYear()} Sicuro Group. Crafted
                            with <i className="mdi mdi-heart text-danger" /> by
                            9thDimension
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
        {/* <Col sm={2}></Col> */}
      </Row>
    </div>
    // </div>
  )
}

export default BusinessInfo
