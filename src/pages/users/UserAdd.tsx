import React, { useState } from "react";
import { Grid, Paper, Button, Typography, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import moment from "moment";
import { RootState } from "../../redux/configureStore";
import { addUser } from "../../redux/modules/users";
const { v4: uuidv4 } = require("uuid");
const { moment } = require("moment");

const UserAdd = () => {
  const paperStyle = { padding: "0 15px 40px 15px", width: 250 };
  const btnStyle = { marginTop: 10 };
  const phoneRegExp = /^[2-9]{2}[0-9]{8}/;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [initialValues, setIntialvalues] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    createdAt: "",
  });
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Enter valid Phone number")
      .required("Required"),
  });
  //   const numberofUsers = useSelector((state:RootState) => state.users.users.length);
  //   console.log("numberofUsers", numberofUsers);

  const onSubmit = (values: any) => {
    setIntialvalues(values);
    const id = uuidv4();
    const name = values.name;
    const email = values.email;
    const phone = values.phone;
    const createdAt = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

    const user = { id, name, email, phone, createdAt };
    // fetch("http://localhost:3008/userDetails", {
    //   method: "POST",
    //   body: JSON.stringify(user),
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    // });

    dispatch(addUser(user));
    navigate("/all-users");
  };
  console.log("initialValues", initialValues);
  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid>
          <Typography variant="caption">Fill new user details here</Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, values, setFieldValue, errors, touched }) => (
            <Form onSubmit={handleSubmit} noValidate>
              <Field
                as={TextField}
                name="name"
                label="Name"
                fullWidth
                error={errors.name && touched.name}
                helperText={<ErrorMessage name="name" />}
                required
                onChange={(e: any) => {
                  setFieldValue(e.target.name, e.target.value);
                }}
              />

              <Field
                as={TextField}
                name="email"
                label="Email"
                fullWidth
                error={errors.email && touched.email}
                helperText={<ErrorMessage name="email" />}
                required
              />

              <Field
                as={TextField}
                name="phone"
                label="Phone Number"
                fullWidth
                error={errors.phone && touched.phone}
                helperText={<ErrorMessage name="phone" />}
                required
              />

              <Button
                type="submit"
                style={btnStyle}
                variant="contained"
                color="primary"
              >
                Save User
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default UserAdd;
