import React, { useState } from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import EditUserModal from '../EditUserModal';

const EmployeeDetails = ({ employee }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);

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
                            <strong>Division:</strong> {employee?.disvision}
                        </Typography>
                        <Typography variant="subtitle1">
                            <strong>DivisionId:</strong> {employee?.divisionId}
                        </Typography>
                        <Typography variant="subtitle1">
                            <strong>District:</strong> {employee?.district}
                        </Typography>
                        <Typography variant="subtitle1">
                            <strong>DistrictId:</strong> {employee?.districeID}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant='contained' fullWidth onClick={() => router.push('/')} >Back to Home</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant='contained' fullWidth color='primary' onClick={() => {
                            setOpen(true)
                        }}>Edit</Button>
                    </Grid>
                </Grid>
            </CardContent>
            <EditUserModal
                open={open}
                onCloseModal={() => setOpen(!open)}
                setOpen={setOpen}
                userData={employee}
            />
        </Card>
    );
};

export default EmployeeDetails;