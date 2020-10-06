import React from 'react'
import EmployeeForm from "./EmployeeForm";
import PersonForm from './../Persons/PersonForm'
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import PersonAddSharpIcon from '@material-ui/icons/PersonAddSharp';
import { Paper,makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Employees() {

    const classes = useStyles();

    return (
        <>
            <PageHeader
                title="Titulo"
                subTitle="Sub-titulo "
                icon={<PersonAddSharpIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <PersonForm />
            </Paper>
        </>
    )
}
