import React, { useState } from "react";
import EmployeeForm from "./EmployeeForm";
// import PersonForm from './../Persons/PersonForm'
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import PersonAddSharpIcon from "@material-ui/icons/PersonAddSharp";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import { useTable } from "./../../components/useTable";
import * as employeeService from "./../../services/employeeService";
import Controls from "./../../components/controls/Controls";
import Search from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
}));
const headCells = [
  { id: "fullName", label: "Employee Name" },
  { id: "email", label: "Email Address" },
  { id: "mobile", label: "Mobile ", disableSorting: true },
  { id: "department", label: "Department", disableSorting: true },
];

export default function Employees() {
  const classes = useStyles();
  const [records, setRecords] = useState(employeeService.getAllEmployees());
  const [filterFn, setFilterFn] = useState({fn:i=>i});
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else return items.filter((i) => i.fullName.toLowerCase().includes(target.value));
      },
    });
  };

  return (
    <>
      <PageHeader
        title="Titulo"
        subTitle="Sub-titulo "
        icon={<PersonAddSharpIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <Toolbar>
          <Controls.Input
            className={classes.searchInput}
            label="search employees"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
            onChange={ handleSearch }
          ></Controls.Input>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email} </TableCell>
                <TableCell>{item.mobile} </TableCell>
                <TableCell>{item.department} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  );

  // InputProps={{
  //   startAdornment: (
  //     <InputAdornment position="start">
  //       <AccountCircle />
  //     </InputAdornment>
  //   ),
}
