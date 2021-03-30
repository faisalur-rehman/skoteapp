import React, { useState } from "react";

const AccountVerification = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = ({ target }) => {
    setEmail(target.value);
  };
  return (
    <form>
      <label htmlFor="email">Verify Email* : </label>
      <input
        type="email"
        id="email"
        onChange={handleEmailChange}
        value={email}
        required
      />
      <h1>{email}</h1>
    </form>
  );
};

export default AccountVerification;
