import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const AccountVerification = () => {
  return (
    <Formik
      initialValues={{ email: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid Email Address";
        }
        return errors;
      }}
      onSubmit={(data) => console.log(data)}
    >
      {() => (
        <Form>
          <label htmlFor="email">Verify Email* : </label>
          <Field name="email" type="email" id="email" />
          <ErrorMessage name="email" component="div" style={{ color: "red" }} />
          <div>
            <button type="submit">Submit</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AccountVerification;
