/* eslint-disable react/prop-types */
const Button = ({ label, onClick }) => (
  <button className="saveBtn" onClick={onClick}>
    {label}
  </button>
);

export default Button;
