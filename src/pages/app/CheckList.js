import React, { useState, useEffect } from "react"
import { Row, Col, Button } from "reactstrap"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"

const initialValues = {
  services: [],
}

const CheckList = () => {
  const [error, setError] = useState(null)
  const [value, setValues] = useState()
  const [id, setId] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/services/checklist",
          localStorage.getItem("token")
        )
        if (data.checkList) {
          setId(data.checkList["_id"])
          data.checkList.services.map(service =>
            initialValues.services.push(service)
          )
          setValues(initialValues)
        }
        setError(null)
      } catch (error) {
        setError(error.response)
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
    try {
      if (value) {
        resData = await patchData(
          "/services/checklist",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/checklist",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
    } catch (error) {
      setError(error.response)
    }
  }
  return (
    <div className="page-content">
      <div className="container">
        <Row>
          <Col sm={2}></Col>
          <Col sm={8}>
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
                  <p>CheckList</p>
                  <div role="group" aria-labelledby="checkbox-group">
                    <label>
                      <Field
                        type="checkbox"
                        name="services"
                        value="web_development"
                      />{" "}
                      Website Development
                    </label>
                    <br />
                    <label>
                      <Field
                        type="checkbox"
                        name="services"
                        value="paid_advertising"
                      />{" "}
                      Paid Advertising
                    </label>
                    <br />
                    <label>
                      <Field
                        type="checkbox"
                        name="services"
                        value="social_media_marketing"
                      />{" "}
                      Social Media Marketing
                    </label>
                    <br />
                    <label>
                      <Field
                        type="checkbox"
                        name="services"
                        value="logo_creation"
                      />{" "}
                      Logo Creation
                    </label>
                    <br />
                    <label>
                      <Field
                        type="checkbox"
                        name="services"
                        value="graphic_designing"
                      />{" "}
                      Graphic Design
                    </label>
                    <br />
                    <label>
                      <Field
                        type="checkbox"
                        name="services"
                        value="productivity_and_automation"
                      />{" "}
                      Productivity and Automation
                    </label>
                    <ErrorMessage
                      component="div"
                      style={{ color: "red" }}
                      name="services"
                    />
                  </div>

                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
            <Col sm={2}></Col>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default CheckList
