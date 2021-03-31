import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Clients = () => {
  return (
    <Formik
      initialValues={{ clients: "" }}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(data) => console.log(data)}
    >
      {() => (
        <Form>
          <h1>Clients</h1>
          <label htmlFor="clients">Your Clients</label>
          <Field type="text" name="clients" id="clients" />
        </Form>
      )}
    </Formik>
  );
};

export default Clients;
