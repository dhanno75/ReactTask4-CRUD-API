import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";

let intialFormValues = {
  name: "",
  image: "",
  country: "",
  email: "",
  company: "",
};

// const ariaLabel = { "aria-label": "description" };

export default function Action() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const [formValues, setFormValues] = useState(intialFormValues);

  const handleChange = (e) => {
    e.preventDefault();
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    console.log(formValues);
  };

  const handleSubmit = async () => {
    // if id exists then update or else create
    if (id) {
      try {
        const data = await fetch(
          `https://6375bd527e93bcb006b86ba6.mockapi.io/users/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues),
          }
        );
        await data.json();
        // To make the input fields empty after submitting the form
        setFormValues(intialFormValues);
        toast.success("User details updated sucessfully!");
        navigate(-1);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const data = await fetch(
          "https://6375bd527e93bcb006b86ba6.mockapi.io/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues),
          }
        );
        await data.json();
        // To make the input fields empty after submitting the form
        setFormValues(intialFormValues);
        toast.success("User details added sucessfully!");
        navigate(-1);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // update
  const updateField = async (id) => {
    try {
      const data = await fetch(
        `https://6375bd527e93bcb006b86ba6.mockapi.io/users/${id}`
      );
      const user = await data.json();
      setFormValues(user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    updateField(id);
  }, [id]);

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "30rem" },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <Typography
          variant="h2"
          component="h2"
          className="center"
          color="GrayText"
        >
          User Form
        </Typography>
        <div>
          <TextField
            id="outlined"
            label="Username"
            color="secondary"
            type="text"
            placeholder="Username"
            disabled={state.isView === "true" ? true : false}
            name="name"
            onChange={handleChange}
            value={formValues.name}
          />
        </div>
        <div>
          <TextField
            id="outlined"
            label="ImageUrl"
            type="text"
            color="secondary"
            autoComplete="current-password"
            disabled={state.isView === "true" ? true : false}
            placeholder="Your image url"
            name="image"
            value={formValues.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="outlined"
            label="Country"
            color="secondary"
            value={formValues.country}
            disabled={state.isView === "true" ? true : false}
            placeholder="Country"
            name="country"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="outlined"
            label="Email"
            type="email"
            color="secondary"
            disabled={state.isView === "true" ? true : false}
            value={formValues.email}
            placeholder="Email ID"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="outlined"
            label="Company"
            type="text"
            color="secondary"
            disabled={state.isView === "true" ? true : false}
            placeholder="Company"
            name="company"
            onChange={handleChange}
            value={formValues.company}
          />
        </div>
        <div className="center">
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={() => navigate(-1)}>Back</Button>
          </ButtonGroup>
          &nbsp;&nbsp;&nbsp;
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            color="secondary"
          >
            <Button onClick={handleSubmit}>Submit</Button>
          </ButtonGroup>
        </div>
      </div>
    </Box>
  );
}
