import React from "react"
import { Formik, Form } from "formik"
const FormikComponent = props => {
  return (
    <Formik
      // enableReinitialize={true}
      initialValues={props.initialValues}
      validate={props.validate}
      onSubmit={props.handleSubmit}
    >
      {values => <Form>{props.children}</Form>}
    </Formik>
  )
}

export default FormikComponent
