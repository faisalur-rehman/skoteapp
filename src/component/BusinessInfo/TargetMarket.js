import React from "react";

const TargetMarket = () => {
  return (
    <form>
      <label htmlFor="market">Your Niche Market: </label>
      <input type="text" name="market" id="market" />
      <br />
      <label htmlFor="audience">Your target audience: </label>
      <input type="text" name="audience" id="audience" />
    </form>
  );
};

export default TargetMarket;
