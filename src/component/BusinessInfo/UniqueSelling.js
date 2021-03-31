import React from "react";
import { Formik, Form, Field } from "formik";
const UniqueSelling = () => {
  return (
    <Formik initialValues={{ sellingPoint: "", strength: "", whyYou: "" }}>
      {() => (
        <Form>
          <h1>Unique Selling Point</h1>
          <label htmlFor="sellingPoint">Your unique selling point: </label>
          <Field type="text" id="sellingPoint" name="sellingPoint" />
          <br />

          <label htmlFor="strength">Your Strength: </label>
          <Field type="text" id="strength" name="strength" />
          <br />

          <label htmlFor="whyYou">Why should customer choose you? </label>
          <Field type="text" id="whyYou" name="whyYou" />
          <br />
        </Form>
      )}
    </Formik>
  );
};

export default UniqueSelling;
