import React from "react"
import { Field, ErrorMessage } from "formik"
import { Row, Col, Button } from "reactstrap"
const CompanyDetail = () => {
  return (
    <div>
      <label htmlFor="logo">Logo : </label>
      <Field type="file" name="logo" className="form-control" />

      <br />
      <label htmlFor="busName">Business Name* : </label>
      <Field
        as="textarea"
        name="busName"
        id="busName"
        className="form-control"
        placeholder="Name"
      />
      <ErrorMessage name="busName" component="div" style={{ color: "red" }} />

      <br />
      <label htmlFor="busEmail">Business Email* : </label>
      <Field
        name="busEmail"
        id="busEmail"
        placeholder="Email"
        className="form-control"
      />
      <ErrorMessage name="busEmail" component="div" style={{ color: "red" }} />

      <br />
      <label htmlFor="busPhone">Business Phone* : </label>
      <Field
        type="number"
        name="busPhone"
        id="busPhone"
        placeholder="Phone"
        className="form-control"
      />
      <ErrorMessage name="busPhone" component="div" style={{ color: "red" }} />

      <br />
      <label htmlFor="busAddress">Business Address* : </label>
      <Field
        name="busAddress"
        id="busAddress"
        className="form-control"
        placeholder="Address"
        as="textarea"
      />
      <ErrorMessage
        name="busAddress"
        component="div"
        style={{ color: "red" }}
      />

      <br />
      <label htmlFor="website">Website : </label>
      <Field
        name="webURL"
        id="website"
        placeholder="Website"
        className="form-control"
      />
      <ErrorMessage name="webURL" component="div" style={{ color: "red" }} />
      <div>
        <Button type="submit" className="w-md mt-3" color="primary">
          Submit
        </Button>
      </div>
    </div>
  )
}

export default CompanyDetail
