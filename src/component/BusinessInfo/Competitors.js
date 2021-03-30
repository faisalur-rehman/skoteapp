import React from "react";

const Competitors = () => {
  return (
    <form>
      <h1>Competitors</h1>
      <label htmlFor="competitor">Your Competitors: </label>
      <input type="text" name="competitor" id="competitor" />
      <br />
      <label htmlFor="webAddress">Three Website Adresses: </label>
      <input type="text" name="webAddress" id="webAddress" />
      <input type="text" name="webAddress" />
      <input type="text" name="webAddress" />
    </form>
  );
};

export default Competitors;
