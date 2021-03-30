import React from "react";

const CompanyDetails = () => {
  return (
    <form>
      <label htmlFor="logo">Logo : </label>
      <input type="file" name="logo" />
      <br />
      <label htmlFor="busName">Business Name* : </label>
      <input type="text" name="busName" id="busName" required />
      <br />
      <label htmlFor="busEmail">Business Email* : </label>
      <input type="email" name="busEmail" id="busEmail" required />
      <br />
      <label htmlFor="busPhone">Business Phone* : </label>
      <input type="number" name="busPhone" id="busPhone" required />
      <br />
      <label htmlFor="website">Website : </label>
      <input type="text" name="website" id="website" />
    </form>
  );
};

export default CompanyDetails;
