import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const CompanyDetails = () => {
  return (
    <Formik
      initialValues={{
        logo: "",
        busName: "",
        busEmail: "",
        busPhone: "",
        website: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.logo) {
          errors.logo = "Required";
        }
        if (!values.busName) {
          errors.busName = "Required";
        }

        if (!values.busPhone) {
          errors.busPhone = "Required";
        }
        if (!values.busEmail) {
          errors.busEmail = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.busEmail)
        ) {
          errors.busEmail = "Invalid email address";
        }
        return errors;
      }}
    >
      {(errors) => (
        <Form>
          <label htmlFor="logo">Logo : </label>
          <Field type="file" name="logo" />
          <ErrorMessage name="logo" component="div" />
          <br />
          <label htmlFor="busName">Business Name* : </label>
          <Field type="text" name="busName" id="busName" />
          <ErrorMessage name="busName" component="div" />

          <br />
          <label htmlFor="busEmail">Business Email* : </label>
          <Field type="text" name="busEmail" id="busEmail" />
          <ErrorMessage name="busEmail" component="div" />

          <br />
          <label htmlFor="busPhone">Business Phone* : </label>
          <Field type="number" name="busPhone" id="busPhone" />
          <ErrorMessage name="busPhone" component="div" />

          <br />
          <label htmlFor="website">Website : </label>
          <Field type="text" name="website" id="website" />
          <ErrorMessage name="website" component="div" />
          <div>
            <button type="submit">Submit</button>
          </div>
          {/* <pre>{JSON.stringify(errors.values)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};

export default CompanyDetails;
