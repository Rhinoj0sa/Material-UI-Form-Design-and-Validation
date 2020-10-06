import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import * as employeeService from "../../services/employeeService";

const initialFValues = {
  id: 0,
  nombre: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  rfc: "",
  curp: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  departmentId: "",
  hireDate: new Date(),
  isPermanent: false,
};

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const PersonForm = () => {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("nombre" in fieldValues)
      temp.nombre = fieldValues.nombre ? "" : "Campo requerido.";
    if ("apellidoPaterno" in fieldValues)
      temp.apellidoPaterno = fieldValues.apellidoPaterno
        ? ""
        : "Campo requerido.";
    if ("apellidoMaterno" in fieldValues)
      temp.apellidoMaterno = fieldValues.apellidoMaterno
        ? ""
        : "Campo requerido.";
    if ("rfc" in fieldValues)
      temp.rfc = fieldValues.rfc ? "" : "Campo requerido.";
    if ("curp" in fieldValues)
      temp.curp = fieldValues.curp ? "" : "Campo requerido.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("departmentId" in fieldValues)
      temp.departmentId =
        fieldValues.departmentId.length != 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      employeeService.insertEmployee(values);
      resetForm();
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item lg={6} md={12}>
          <Controls.Input
            name="nombre"
            label="nombre(s)"
            value={values.nombre}
            onChange={handleInputChange}
            error={errors.nombre}
          />
          <Controls.Input
            name="apellidoPaterno"
            label="Apellido Paterno"
            value={values.apellidoPaterno}
            onChange={handleInputChange}
            error={errors.apellidoPaterno}
          />
          <Controls.Input
            name="apellidoMaterno"
            label="Apellido Materno"
            value={values.apellidoMaterno}
            onChange={handleInputChange}
            error={errors.apellidoMaterno}
          />
         <Controls.Input
            name="rfc"
            label="R.F.C."
            value={values.rfc}
            onChange={handleInputChange}
            error={errors.rfc}
          />
          <Controls.Input
            name="curp"
            label="C.U.R.P."
            value={values.curp}
            onChange={handleInputChange}
            error={errors.curp}
          />
          <Controls.Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Controls.Input
            label="City"
            name="city"
            value={values.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item lg={6} md={12}>
          <Controls.RadioGroup
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />
          <Controls.Select
            name="departmentId"
            label="Department"
            value={values.departmentId}
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollection()}
            error={errors.departmentId}
          />
          <Controls.DatePicker
            name="hireDate"
            label="Hire Date"
            value={values.hireDate}
            onChange={handleInputChange}
          />
          <Controls.Checkbox
            name="isPermanent"
            label="Permanent Employee"
            value={values.isPermanent}
            onChange={handleInputChange}
          />

          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};
export default PersonForm;
