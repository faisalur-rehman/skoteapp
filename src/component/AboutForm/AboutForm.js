import React, { useState } from "react";

const AboutForm = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleName = ({ target }) => {
    setName(target.value);
  };

  const handleRole = ({ target }) => {
    setRole(target.value);
  };

  return (
    <form>
      <label htmlFor="name">Name* : </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={handleName}
        required
      />
      <br />
      <label htmlFor="role">Role* : </label>
      <input
        type="text"
        id="role"
        value={role}
        onChange={handleRole}
        required
      />
    </form>
  );
};

export default AboutForm;
