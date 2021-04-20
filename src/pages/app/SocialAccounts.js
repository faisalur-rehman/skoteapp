import React, { useState, useEffect } from "react"
import { Row, Col, Button } from "reactstrap"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"

const initialValues = {
  platforms: [],
}

const SocialAccount = () => {
  const [error, setError] = useState(null)
  const [value, setValues] = useState()
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          "/services/social-media/platform",
          localStorage.getItem("token")
        )
        console.log(data.payload)
        if (data.payload) {
          setId(data.payload["_id"])
          data.payload.platforms.map(
            (platform, index) => (initialValues.platforms[index] = platform)
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
    if (values.platforms.length < 1) {
      errors.accounts = "You have to select atleast one service"
    }

    return errors
  }
  async function handleSubmit(data) {
    let resData
    try {
      if (value) {
        resData = await patchData(
          "/services/social-media/platform",
          id,
          data,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          "/services/social-media/platform",
          data,
          localStorage.getItem("token")
        )
      }
      setError(null)
    } catch (err) {
      console.log(err.response)
      setError(err.response)
    }
    setClicked(true)
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
                  <p>Accounts</p>
                  <div role="group" aria-labelledby="checkbox-group">
                    <label>
                      <Field
                        type="checkbox"
                        name="platforms"
                        value="Facebook"
                      />{" "}
                      Facebook
                    </label>
                    <br />
                    <label>
                      <Field
                        type="checkbox"
                        name="platforms"
                        value="Instagram"
                      />{" "}
                      Instagram
                    </label>
                    <br />
                    <label>
                      <Field type="checkbox" name="platforms" value="Twitter" />{" "}
                      Twitter
                    </label>
                    <br />

                    <label>
                      <Field
                        type="checkbox"
                        name="platforms"
                        value="Linkedin"
                      />{" "}
                      Linkedin
                    </label>
                    <br />
                    <label>
                      <Field
                        type="checkbox"
                        name="platforms"
                        value="Google Ads/My Business"
                      />{" "}
                      Google Ads/My Business
                    </label>
                    <ErrorMessage
                      component="div"
                      style={{ color: "red" }}
                      name="accounts"
                    />
                  </div>

                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                  {!error && clicked && <Redirect to="fbUrl" />}
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

export default SocialAccount
