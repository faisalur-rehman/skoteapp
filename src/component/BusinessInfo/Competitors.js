import React from "react";
import { Field } from "formik";
import FormikComponent from "../Formik";

const initialValues = { competitor: "", webAddress: [] };

const Competitors = () => {
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
      <h1>Competitors</h1>
      <label htmlFor="competitor">Your Competitors: </label>
      <Field type="text" name="competitor" id="competitor" />
      <br />
      <label htmlFor="webAddress">Three Website Adresses: </label>
      <Field type="text" name="webAddress" id="webAddress" />
      <Field type="text" name="webAddress" />
      <Field type="text" name="webAddress" />
      <div>
        <button type="submit">Submit</button>
      </div>
    </FormikComponent>
  );
};

export default Competitors;
