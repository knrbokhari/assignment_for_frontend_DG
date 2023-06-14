import { Container, Typography } from '@material-ui/core'
import React from 'react'
import EmployeeDetails from '../../components/EmployeeDetails';

const EmployeeDetailsPage = () => {
    const employee = {
        empID: 3,
        firstName: 'Armans',
        lastName: 'Salehin',
        employeeType: 'Employee',
        divisionId: 1,
        districtId: 2,
        division: 'Barisal',
        district: 'Barisal',
    };
    return (
        <Container>
            <Typography variant='h4' align='center'>Employee Details</Typography>
            <EmployeeDetails employee={employee} />
        </Container>
    )
}

export default EmployeeDetailsPage