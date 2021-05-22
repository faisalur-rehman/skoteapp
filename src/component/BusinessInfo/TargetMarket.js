import React from "react";
import { Field } from "formik";
import FormikComponent from "../Formik";
const initialValues = { market: "", audience: "" };

const TargetMarket = () => {
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
      <label htmlFor="market">Your Niche Market: </label>
      <Field type="text" name="market" id="market" />
      <br />
      <label htmlFor="audience">Your target audience: </label>
      <Field type="text" name="audience" id="audience" />
      <div>
        <button type="submit">Submit</button>
      </div>
    </FormikComponent>
  );
};

export default TargetMarket;
