import "./form.scss";
import { useState } from "react";

const Form = ({ className, setAccess, setRoomName, setUserName }) => {
  const [formData, setFormData] = useState({ name: "", room: "" });
  const [formError, setFormError] = useState({ name: false, room: false });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError({ ...formError, [e.target.name]: false });
  };

  const validateForm = () => {
    let error = false;
    for (const property in formData) {
      if (formData[property] === "") {
        error = { ...error, [property]: true };
      }
    }
    setFormError({ ...formError, ...error });
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setAccess(true);
      setUserName(formData.name);
      setRoomName(formData.room);
    }
  };

  return (
    <form className={`join-form ${className}`} onSubmit={handleSubmit}>
      <input
        className={`join-form__input ${
          formError.name ? "join-form__input--error" : ""
        }`}
        value={formData.name}
        onChange={handleChange}
        name="name"
        type="text"
        placeholder="Enter your join"
      />
      <input
        className={`join-form__input ${
          formError.room ? "join-form__input--error" : ""
        }`}
        value={formData.room}
        onChange={handleChange}
        name="room"
        type="text"
        placeholder="Enter the room name you want to enter"
      />
      <button className="join-form__button">Join</button>
      {(formError.name || formError.room) && (
        <p style={{ color: "red", textAlign: "center" }}>
          Please enter all the data
        </p>
      )}
    </form>
  );
};

export default Form;
