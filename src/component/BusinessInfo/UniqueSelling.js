import React from "react";

const UniqueSelling = () => {
  return (
    <form>
      <h1>Unique Selling Point</h1>
      <label htmlFor="sellingPoint">Your unique selling point: </label>
      <input type="text" id="sellingPoint" name="sellingPoint" />
      <br />

      <label htmlFor="strength">Your Strength: </label>
      <input type="text" id="strength" name="strength" />
      <br />

      <label htmlFor="whyYou">Why should customer choose you? </label>
      <input type="text" id="whyYou" name="whyYou" />
      <br />
    </form>
  );
};

export default UniqueSelling;
