import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
import { Redirect } from "react-router-dom"
import { formPostData, formGetData, patchData } from "./ApiRequest"

const initialValues = {
  tone: "",
  cantTalk: "",
  comments: "",
  picked: "",
  website: "",
}

const Posting = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)

  //   useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         const { data } = await formGetData(
  //           "/services/wg-sitemap",
  //           localStorage.getItem("token")
  //         )
  //         console.log(data.sitemap)
  //         if (data.sitemap) {
  //           setId(data.sitemap["_id"])
  //           initialValues.indication = data.sitemap.indication
  //           initialValues.outline = data.sitemap.outline
  //           setValues(initialValues)
  //         }
  //         console.log(initialValues)
  //         setError(null)
  //       } catch (err) {
  //         console.log(err.response.data.message)
  //         setError(err.response.data.message)
  //       }
  //     }
  //     fetchData()
  //   }, [])

  const validate = values => {
    const errors = {}
    if (values.tone.length < 3) {
      errors.tone = "Atleast 3 characters are required"
    }
    if (values.cantTalk.length < 3) {
      errors.cantTalk = "Atleast 3 characters are required"
    }
    if (values.comments.length < 5) {
      errors.comments = "Atleast 5 characters are required"
    }
    if (!values.picked) {
      errors.picked = "Required"
    }
    if (!values.website) {
      errors.website = "Required"
    }
    return errors
  }

  function handleSubmit(data) {
    let resData
    console.log(data)
    // try {
    //   if (value) {
    //     resData = await patchData(
    //       "/services/wg-sitemap",
    //       id,
    //       data,
    //       localStorage.getItem("token")
    //     )
    //   } else {
    //     resData = await formPostData(
    //       "/services/wg-sitemap",
    //       data,
    //       localStorage.getItem("token")
    //     )
    //   }
    //   setError(null)
    //   console.log(resData)
    // } catch (err) {
    //   setError(err.response)
    //   console.log(err.response)
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
                  <p>What tone of voice would you like?</p>
                  <Field
                    name="tone"
                    className="form-control"
                    placeholder="E.g. playful, fun, professional"
                  />
                  <ErrorMessage
                    name="tone"
                    component="div"
                    style={{ color: "red" }}
                  />
                  <br />
                  <p>What can't we talk about?</p>
                  <Field
                    name="cantTalk"
                    className="form-control"
                    placeholder="Please specify what we can’t post"
                  />
                  <ErrorMessage
                    name="cantTalk"
                    component="div"
                    style={{ color: "red" }}
                  />
                  <br />
                  <p id="my-radio-group">
                    Are there websites that we can use for articles/blog
                    content?
                  </p>

                  <label>
                    <Field type="radio" name="picked" value="Yes" />
                    Yes
                  </label>
                  <br />
                  <label>
                    <Field type="radio" name="picked" value="No" />
                    No
                  </label>
                  <br />
                  <ErrorMessage
                    name="picked"
                    component="div"
                    style={{ color: "red" }}
                  />
                  {values.picked === "Yes" && (
                    <div>
                      <p>Website:</p>
                      <Field
                        type="text"
                        name="website"
                        className="form-control"
                      />
                      <br />
                      <ErrorMessage
                        name="website"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  )}
                  <br />
                  <p>
                    Do you have any other comments or feedback regarding
                    posting?
                  </p>
                  <Field
                    name="comments"
                    className="form-control"
                    placeholder="Your comments"
                  />
                  <ErrorMessage
                    name="comments"
                    component="div"
                    style={{ color: "red" }}
                  />
                  <br />

                  {/* {error && (
                <p style={{ color: "red" }}>
                  {error}. Please check the Web Development checkbox in
                  CheckList form section in order to submit this form.
                </p>
              )} */}

                  <div>
                    <Button type="submit" className="w-md mt-2" color="primary">
                      Submit
                    </Button>
                    {/* {!error && clicked && <Redirect to="advancedFeatures" />} */}
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default Posting
