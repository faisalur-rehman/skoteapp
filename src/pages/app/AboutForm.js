import React, { useState, useEffect } from "react"
import { Row, Col, Button } from "reactstrap"
import FormikComponent from "./Formik"
import { Field, ErrorMessage } from "formik"
import { formPostData, formGetData } from "./ApiRequest"

const AboutForm = () => {
  const [error, setError] = useState(null)
  // const [name, setName] = useState("")
  // const [role, setRole] = useState("")

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/about",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDY4NzYxOWMxMzYyMDM1ZjA3MDBhZGEiLCJuYW1lIjoiRmFpc2FsIFJlaG1hbiIsImVtYWlsIjoiZmFpc2FsQGdtYWlsLmNvbSIsImlhdCI6MTYxNzYxODgyOX0.UNpseiy7Nd8TWe2o201PnlDEY0ldaGG70GCymR6_Zwo"
        )
        console.log(data.about.name, data.about.role)
        // setName(data.about.name)
        // setRole(data.about.role)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  let initilaValues = {
    name: "",
    role: "",
  }
  function validate(values) {
    const errors = {}
    if (!values.name) {
      errors.name = "Required"
    }
    if (!values.role) {
      errors.role = "Required"
    }
    return errors
  }
  async function handleSubmit(data) {
    try {
      const resData = await formPostData(
        "/about",
        data,
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDY4NzYxOWMxMzYyMDM1ZjA3MDBhZGEiLCJuYW1lIjoiRmFpc2FsIFJlaG1hbiIsImVtYWlsIjoiZmFpc2FsQGdtYWlsLmNvbSIsImlhdCI6MTYxNzYxODgyOX0.UNpseiy7Nd8TWe2o201PnlDEY0ldaGG70GCymR6_Zwo"
      )
      setError(null)
      console.log(resData)
    } catch (error) {
      setError(err.response.data.name)
      console.log(error.response.data.name)
    }
  }
  return (
    <div className="page-content">
      <div className="container">
        <Row>
          <Col sm={3} style={{ borderRight: "1px solid black" }}>
            Track bar will go here
          </Col>
          <Col sm={9}>
            <FormikComponent
              initialValues={initilaValues}
              validate={validate}
              handleSubmit={handleSubmit}
            >
              <label htmlFor="name">Name* : </label>
              <Field
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <ErrorMessage
                name="name"
                component="div"
                style={{ color: "red" }}
              />
              <br />
              <label htmlFor="role">Role* : </label>
              <Field
                type="text"
                id="role"
                name="role"
                className="form-control"
              />
              <ErrorMessage
                name="role"
                component="div"
                style={{ color: "red" }}
              />
              <div>
                <Button type="submit" className="w-md mt-3" color="primary">
                  Submit
                </Button>
              </div>
            </FormikComponent>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default AboutForm
