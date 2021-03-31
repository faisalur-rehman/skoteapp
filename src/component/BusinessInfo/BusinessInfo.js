import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const BusinessInfo = () => {
  return (
    <Formik
      initialValues={{ notes: "", company: "", products: "" }}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(data) => console.log(data)}
    >
      {() => (
        <Form>
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
        </Form>
      )}
    </Formik>
  );
};

export default BusinessInfo;
