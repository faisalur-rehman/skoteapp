import React from "react";
import { Formik, Form, Field } from "formik";

const TargetMarket = () => {
  return (
    <Formik initialValues={{ market: "", audience: "" }}>
      {() => (
        <Form>
          <label htmlFor="market">Your Niche Market: </label>
          <Field type="text" name="market" id="market" />
          <br />
          <label htmlFor="audience">Your target audience: </label>
          <Field type="text" name="audience" id="audience" />
          <div>
            <button type="submit">Submit</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TargetMarket;
