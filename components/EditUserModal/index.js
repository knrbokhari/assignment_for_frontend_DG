import { Button, Dialog, DialogContent, DialogTitle, Grid, MenuItem, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useCreateEmployeeMutation, useDistrictMutation, useDivisionMutation, useUpdateEmployeeMutation } from '../../redux/services/api';
import Loading from '../Loading';

const EditUserModal = ({ open, onCloseModal, userData }) => {
    const [divisions, setDivisions] = useState([])
    const [districts, setDistricts] = useState([])
    const [division, { data: divisionData, success, isSuccess: districtSuccess }] = useDivisionMutation();
    const [district, { data: districtData }] = useDistrictMutation();
    const [createEmployee, { isLoading: createLoading }] = useCreateEmployeeMutation();
    const [updateEmployee, { isLoading: updateLoading }] = useUpdateEmployeeMutation();

    useEffect(() => {
        if (!divisionData?.isSuccess) {
            division()
        }

        if (divisionData?.isSuccess) {
            setDivisions(divisionData?.readDivisionData)
        }

        if (districtData?.isSuccess) {
            setDistricts(districtData?.readDistrictData)
        }

    }, [divisionData?.isSuccess, districtData?.isSuccess])

    const user = [
        { value: "Admin", label: "Admin" },
        { value: "Employee", label: "Employee" }
    ]

    if (createLoading || updateLoading) {
        return <Loading />
    }

    const handleCreateAndUpdate = ( data ) => {
        console.log(data)
    }

    return (
        <Dialog open={open} onClose={onCloseModal}>
            <DialogTitle style={{ textAlign: 'center' }}>{userData ? 'Edit User' : 'Add User'}</DialogTitle>
            <DialogContent style={{ paddingBottom: "30px" }}>
                <Formik
                    initialValues={{
                        firstName: userData?.firstName || '',
                        lastName: userData?.lastName || '',
                        employeeType: userData?.employeeType || '',
                        divisionId: userData?.divisionId || '',
                        districtId: userData?.districtId || '',
                    }}
                    validationSchema={Yup.object({
                        firstName: Yup.string().required('First name is required'),
                        lastName: Yup.string().required('Last name is required'),
                        employeeType: Yup.string().required('Employee type is required'),
                        divisionId: Yup.number().required('Division is required'),
                        districtId: Yup.number().required('District is required'),
                    })}
                    onSubmit={async (
                        values,
                        { setErrors, setStatus, setSubmitting }
                    ) => {
                        try {
                            handleCreateAndUpdate(values);
                        } catch (err) {
                            console.log(err)
                        }
                    }}
                >
                    {({
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue,
                        touched,
                        values,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        id="firstName"
                                        name="firstName"
                                        fullWidth
                                        label="First Name"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        error={touched.firstName && Boolean(errors.firstName)}
                                        helperText={touched.firstName && errors.firstName}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        id="lastName"
                                        fullWidth
                                        name="lastName"
                                        label="Last Name"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        error={touched.lastName && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                    />
                                </Grid>


                                <Grid item xs={6}>
                                    <TextField
                                        id="divisionId"
                                        name="divisionId"
                                        select
                                        fullWidth
                                        label="Division"
                                        value={values.divisionId}
                                        onClick={(e) => {
                                            district(e.target.value)
                                        }}
                                        onChange={handleChange}
                                        error={touched.divisionId && Boolean(errors.divisionId)}
                                        helperText={touched.divisionId && errors.divisionId}
                                    >
                                        {divisions?.map((division) => (
                                            <MenuItem key={division?.divID} value={division?.divID}>
                                                {division?.divisionName}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        id="districtId"
                                        name="districtId"
                                        select
                                        fullWidth
                                        label="District"
                                        value={values.districtId}
                                        onChange={handleChange}
                                        error={touched.districtId && Boolean(errors.districtId)}
                                        helperText={touched.districtId && errors.districtId}
                                    >
                                        {districts?.map((district) => (
                                            <MenuItem key={district.districtID} value={district.districtID}>
                                                {district.districtName}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid style={{ marginBottom: "20px" }} item xs={12}>
                                    <TextField
                                        id="employeeType"
                                        name="employeeType"
                                        select
                                        fullWidth
                                        label="Employee Type"
                                        value={values.employeeType}
                                        onChange={handleChange}
                                        error={touched.employeeType && Boolean(errors.employeeType)}
                                        helperText={touched.employeeType && errors.employeeType}
                                    >
                                        {user.map((user) => (
                                            <MenuItem key={user.value} value={user.value}>
                                                {user.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={6}>
                                    <Button fullWidth size='large' variant="contained" onClick={onCloseModal} color="primary">
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button fullWidth size='large' variant="contained" type="submit" disabled={isSubmitting} color="primary">
                                        {userData ? 'Update' : 'Save'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}

export default EditUserModal;