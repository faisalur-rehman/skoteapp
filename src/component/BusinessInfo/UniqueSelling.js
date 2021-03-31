import React from "react";
import { Field } from "formik";
import FormikComponent from "../Formik";

const initialValues = { sellingPoint: "", strength: "", whyYou: "" };

const UniqueSelling = () => {
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
      <h1>Unique Selling Point</h1>
      <label htmlFor="sellingPoint">Your unique selling point: </label>
      <Field type="text" id="sellingPoint" name="sellingPoint" />
      <br />

      <label htmlFor="strength">Your Strength: </label>
      <Field type="text" id="strength" name="strength" />
      <br />

      <label htmlFor="whyYou">Why should customer choose you? </label>
      <Field type="text" id="whyYou" name="whyYou" />
      <div>
        <button type="submit">Submit</button>
      </div>
      <br />
    </FormikComponent>
  );
};

export default UniqueSelling;
