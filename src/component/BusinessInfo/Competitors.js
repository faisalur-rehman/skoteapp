import React from "react";
import { Formik, Form, Field } from "formik";

const Competitors = () => {
  return (
    <Formik initialValues={{ competitor: "", webAddress: [] }}>
      {() => (
        <Form>
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
        </Form>
      )}
    </Formik>
  );
};

export default Competitors;
