import React from "react";

const AccountVerification = () => {
  return (
    <form>
      <label htmlFor="email">Verify Email* : </label>
      <input type="email" id="email" required />
    </form>
  );
};

export default AccountVerification;
