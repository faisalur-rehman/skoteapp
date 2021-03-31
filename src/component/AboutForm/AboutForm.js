import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const AboutForm = () => {
  return (
    <Formik
      initialValues={{ name: "", role: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Required";
        }
        if (!values.role) {
          errors.role = "Required";
        }
        return errors;
      }}
      onSubmit={(data) => console.log(data)}
    >
      {(errors) => (
        <Form>
          <label htmlFor="name">Name* : </label>
          <Field type="text" name="name" id="name" />
          <ErrorMessage name="name" component="div" />
          <br />
          <label htmlFor="role">Role* : </label>
          <Field type="text" id="role" name="role" />
          <ErrorMessage name="role" component="div" />
          <div>
            <button type="submit">Submit</button>
          </div>
          {/* <pre>{JSON.stringify(errors.values, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};

export default AboutForm;
