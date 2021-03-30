import React from "react";

const BusinessInfo = () => {
  return (
    <form>
      <p>Introduction: </p>
      <label htmlFor="notes">Short Notes: </label>
      <input type="text" name="notes" id="notes" />
      <br />
      <label htmlFor="company">Your Company: </label>
      <input type="text" name="company" id="company" />
      <br />
      <label htmlFor="products">Your Products: </label>
      <input type="text" name="products" id="products" />
    </form>
  );
};

export default BusinessInfo;
