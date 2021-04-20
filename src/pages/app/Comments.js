import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import FormikComponent from "./Formik"
import { Row, Col, Button } from "reactstrap"
import { Redirect } from "react-router-dom"
import { formPostData, formGetData, patchData } from "./ApiRequest"

const initialValues = {
  comments: "",
}

const Comments = () => {
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
    if (values.comments.length < 5) {
      errors.comments = "Atleast 5 characters are required"
    }
    return errors
  }

  async function handleSubmit(data) {
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
            <FormikComponent
              initialValues={initialValues}
              handleSubmit={handleSubmit}
              validate={validate}
            >
              <p>
                Do you have any other comments or feedback regarding posting?
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
                {redirect && <Redirect to="login" />}
              </div>
            </FormikComponent>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  )
}

export default Comments
