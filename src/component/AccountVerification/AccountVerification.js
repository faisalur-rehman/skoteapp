import React from "react";
import { Field, ErrorMessage } from "formik";
import FormikComponent from "../Formik";

const values = {
  email: "",
};

const AccountVerification = () => {
  function validate(values) {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid Email Address";
    }
    return errors;
  }
  function handleSubmit(data) {
    console.log(data);
  }
  return (
    <FormikComponent
      initialValues={values}
      validate={validate}
      handleSubmit={handleSubmit}
    >
      <label htmlFor="email">Verify Email* : </label>
      <Field name="email" type="email" id="email" />
      <ErrorMessage name="email" component="div" style={{ color: "red" }} />
      <div>
        <button type="submit">Submit</button>
      </div>
    </FormikComponent>
  );
};

export default AccountVerification;
