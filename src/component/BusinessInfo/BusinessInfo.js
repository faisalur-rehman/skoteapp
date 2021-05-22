import React from "react";
import { Field, ErrorMessage } from "formik";
import FormikComponent from "../Formik";

const initialValues = { notes: "", company: "", products: "" };
const BusinessInfo = () => {
  function validate(values) {
    const errors = {};
    return errors;
  }
  function handleSubmit(data) {
    console.log(data);
  }
  return (
    <FormikComponent
      initialValues={initialValues}
      validate={validate}
      handleSubmit={handleSubmit}
    >
      <p>Introduction: </p>
      <label htmlFor="notes">Short Notes: </label>
      <Field type="text" name="notes" id="notes" />
      <br />
      <label htmlFor="company">Your Company: </label>
      <Field type="text" name="company" id="company" />
      <br />
      <label htmlFor="products">Your Products: </label>
      <Field type="text" name="products" id="products" />
      <div>
        <button type="submit">Submit</button>
      </div>
    </FormikComponent>
  );
};

export default BusinessInfo;
