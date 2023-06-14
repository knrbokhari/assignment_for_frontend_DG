import React from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import { Button } from '@material-ui/core';

const EmployeeDetails = ({ employee }) => {
    return (
        <Card elevation={4} sx={{ mt: 5 }} >
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            <strong>Employee ID:</strong> {employee?.empID}
                        </Typography>
                        <Typography variant="subtitle1">
                            <strong>First Name:</strong> {employee?.firstName}
                        </Typography>
                        <Typography variant="subtitle1">
                            <strong>Last Name:</strong> {employee?.lastName}
                        </Typography>
                        <Typography variant="subtitle1">
                            <strong>Employee Type:</strong> {employee?.employeeType}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            <strong>Division:</strong> {employee?.division}
                        </Typography>
                        <Typography variant="subtitle1">
                            <strong>DivisionId:</strong> {employee?.divisionId}
                        </Typography>
                        <Typography variant="subtitle1">
                            <strong>District:</strong> {employee?.district}
                        </Typography>
                        <Typography variant="subtitle1">
                            <strong>DistrictId:</strong> {employee?.districtId}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained' fullWidth color='primary'>Update</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default EmployeeDetails;