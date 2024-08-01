import { useState } from "react";
import "./style.css";

export default function LoanApp01() {
  const [formInput, setFormInput] = useState({
    name: "",
    phoneNumber: "",
    Age: "",
    checkBox: false,
    salary: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [stop, setStop] = useState(false);

  const isFormValid = () => {
    const age = parseInt(formInput.Age, 10);
    const isAgeValid = age >= 18 && age <= 100;

    return (
      formInput.name !== "" && formInput.phoneNumber.length === 10 && isAgeValid
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      setStop(true);

      setTimeout(() => {
        setShowPopup(true);
        setFormInput({
          name: "",
          phoneNumber: "",
          Age: "",
          checkBox: false,
          salary: "",
        });
        setStop(false);
      }, 3000);
    }
  };

  const handleCloseModal = () => setShowPopup(false);

  const handleChangePhoneNumber = (e) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setFormInput({ ...formInput, phoneNumber: value });
      setError(
        value.length < 10 ? "Phone number must be exactly 10 digits." : ""
      );
    } else {
      setError("Phone number must be exactly 10 digits.");
    }
  };

  const handleChangeAge = (e) => {
    const { value } = e.target;
    const age = parseInt(value, 10);
    setFormInput({ ...formInput, Age: value });
    setMessage(
      isNaN(age)
        ? "Please enter a valid age."
        : age > 100
        ? "You can't request a loan. Age must be 100 or below."
        : age < 18
        ? "You can't request a loan. You must be at least 18 years old."
        : ""
    );
  };

  return (
    <div className="container">
      <h1>Requesting a Loan</h1>
      <hr />
      <form onSubmit={handleSubmit} className="formContainer">
        <label>Name:</label>
        <input
          type="text"
          value={formInput.name}
          onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />
        <label>Phone Number:</label>
        <input
          type="number"
          value={formInput.phoneNumber}
          onChange={handleChangePhoneNumber}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label>Age:</label>
        <input type="number" value={formInput.Age} onChange={handleChangeAge} />
        <p style={{ color: "red" }}>{message}</p>
        <label>Are you an employee?</label>
        <input
          type="checkbox"
          checked={formInput.checkBox}
          onChange={(event) =>
            setFormInput((prevData) => ({
              ...prevData,
              checkBox: event.target.checked,
            }))
          }
        />
        <label>Salary:</label>
        <select
          className="options"
          value={formInput.salary}
          onChange={(event) =>
            setFormInput((prevData) => ({
              ...prevData,
              salary: event.target.value,
            }))
          }
        >
          <option value="">Select an option</option>
          <option value="More than 500$">More than 500$</option>
          <option value="Less than 500$">Less than 500$</option>
        </select>
        <button
          type="submit"
          disabled={!isFormValid() || stop}
          style={{
            backgroundColor: isFormValid() && !stop ? "blue" : "gray",
            color: "white",
            cursor: isFormValid() && !stop ? "pointer" : "not-allowed",
          }}
        >
          {stop ? "Please wait..." : "Submit"}
        </button>
      </form>
      {showPopup && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <p>Form submitted successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
}
