import React from "react";
import { Field } from "formik";
import FormikComponent from "../Formik";

const initialValues = { clients: "" };

const Clients = () => {
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
      <h1>Clients</h1>
      <label htmlFor="clients">Your Clients</label>
      <Field type="text" name="clients" id="clients" />
      <div>
        <button type="submit">Submit</button>
      </div>
    </FormikComponent>
  );
};

export default Clients;
