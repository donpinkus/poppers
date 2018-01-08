import React from "react";

const Footer = props => {
  return (
    <footer className="Footer">
      <p style={{ opacity: 0.7 }}>&copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
