import React, { useState, useEffect } from "react"
import { Row, Col, Button } from "reactstrap"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { formPostData, formGetData, patchData } from "./ApiRequest"
import { Redirect } from "react-router-dom"

const initialValues = {
  accounts: [],
}

const SocialAccount = () => {
  const [error, setError] = useState(null)
  const [value, setValues] = useState()
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)

  //   useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         const { data } = await formGetData(
  //           "/services/checklist",
  //           localStorage.getItem("token")
  //         )
  //         if (data.checkList) {
  //           setId(data.checkList["_id"])
  //           data.checkList.services.map(service =>
  //             initialValues.services.push(service)
  //           )
  //           setValues(initialValues)
  //         }
  //         setError(null)
  //       } catch (error) {
  //         setError(error.response)
  //       }
  //     }
  //     fetchData()
  //   }, [])

  function validate(values) {
    const errors = {}
    if (values.accounts.length < 1) {
      errors.accounts = "You have to select atleast one service"
    }

    return errors
  }
  async function handleSubmit(data) {
    let resData
    // try {
    //   if (value) {
    //     resData = await patchData(
    //       "/services/checklist",
    //       id,
    //       data,
    //       localStorage.getItem("token")
    //     )
    //   } else {
    //     resData = await formPostData(
    //       "/services/checklist",
    //       data,
    //       localStorage.getItem("token")
    //     )
    //   }
    //   setError(null)
    // } catch (error) {
    //   setError(error.response)
    // }
    // setClicked(true)
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
                      <Field type="checkbox" name="accounts" value="Facebook" />{" "}
                      Facebook
                    </label>
                    <br />
                    <label>
                      <Field
                        type="checkbox"
                        name="accounts"
                        value="Instagram"
                      />{" "}
                      Instagram
                    </label>
                    <br />
                    <label>
                      <Field type="checkbox" name="accounts" value="Twitter" />{" "}
                      Twitter
                    </label>
                    <br />

                    <label>
                      <Field type="checkbox" name="accounts" value="Linkedin" />{" "}
                      Linkedin
                    </label>
                    <br />
                    <label>
                      <Field
                        type="checkbox"
                        name="accounts"
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
                  {/* {!error && clicked && <Redirect to="websiteGoals" />} */}
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
