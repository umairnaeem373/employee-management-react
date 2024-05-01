import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../data/store/createContext";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Edit = () => {
  const { id } = useParams();
  const { getSingleUser, state, updateUser } = useContext(AppContext);

  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [salary, setSalary] = useState("");
  // const [date, setDate] = useState("");

  const [inputs, setInputs] = useState({
    date: "",
    email: "",
    firstName: "",
    lastName: "",
    salary: "",
  });

  useEffect(() => {
    getSingleUser(id);
   setInputs(state.single);
   
  }, [id , state?.single?.salary]);

  useEffect(() => {
    document.title = `Edit ${inputs?.firstName} data`;
  }, []);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  console.log(state, "single", inputs);

  const handleUpdate = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, salary, date } = inputs;

    if (!firstName || !lastName || !email || !salary || !date) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    // Update api Call

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={inputs?.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={inputs?.lastName}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={inputs?.email}
          onChange={handleChange}
        />
        <label htmlFor="salary">Salary ($)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={inputs?.salary}
          onChange={handleChange}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={inputs?.date}
          onChange={handleChange}
        />
        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Update" 
            onClick={() => updateUser(id, inputs)}
          />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
