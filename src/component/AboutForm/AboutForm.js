import React from "react";
import { Field, ErrorMessage } from "formik";
import FormikComponent from "../Formik";

const AboutForm = () => {
  let initilaValues = {
    name: "",
    role: "",
  };
  function validate(values) {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.role) {
      errors.role = "Required";
    }
    return errors;
  }
  function handleSubmit(data) {
    console.log(data);
  }
  return (
    <FormikComponent
      initialValues={initilaValues}
      validate={validate}
      handleSubmit={handleSubmit}
    >
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
    </FormikComponent>

    // <Formik
    //   initialValues={{ name: "", role: "" }}
    //   validate={(values) => {
    //     const errors = {};
    //     if (!values.name) {
    //       errors.name = "Required";
    //     }
    //     if (!values.role) {
    //       errors.role = "Required";
    //     }
    //     return errors;
    //   }}
    //   onSubmit={(data) => console.log(data)}
    // >
    //   {(errors) => (
    //     <Form>
    //       <label htmlFor="name">Name* : </label>
    //       <Field type="text" name="name" id="name" />
    //       <ErrorMessage name="name" component="div" />
    //       <br />
    //       <label htmlFor="role">Role* : </label>
    //       <Field type="text" id="role" name="role" />
    //       <ErrorMessage name="role" component="div" />
    //       <div>
    //         <button type="submit">Submit</button>
    //       </div>
    //       {/* <pre>{JSON.stringify(errors.values, null, 2)}</pre> */}
    //     </Form>
    //   )}
    // </Formik>
  );
};

export default AboutForm;
