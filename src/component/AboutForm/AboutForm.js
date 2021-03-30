import React from "react";

const AboutForm = () => {
  return (
    <form>
      <label htmlFor="name">Name* : </label>
      <input type="text" id="name" />
      <br />
      <label htmlFor="role">Role* : </label>
      <input type="text" id="role" required />
    </form>
  );
};

export default AboutForm;
