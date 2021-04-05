import React from "react"
import { Formik, Form } from "formik"
const FormikComponent = props => {
  return (
    <Formik
      initialValues={props.initialValues}
      validate={props.validate}
      onSubmit={props.handleSubmit}
    >
      {() => <Form>{props.children}</Form>}
    </Formik>
  )
}

export default FormikComponent
