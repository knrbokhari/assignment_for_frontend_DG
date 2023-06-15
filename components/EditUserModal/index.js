import { Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useCreateEmployeeMutation, useDistrictMutation, useDivisionMutation, useUpdateEmployeeMutation } from '../../redux/services/api';
import Loading from '../Loading';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { CustomButton } from '../index';

const EditUserModal = ({ open, onCloseModal, userData, setOpen, reload }) => {
    const router = useRouter();
    const [divisions, setDivisions] = useState([])
    const [districts, setDistricts] = useState([])
    const [isEmployee, setIsEmployee] = useState(userData?.employeeType || '')
    const [division, { data: divisionData, isSuccess: districtSuccess }] = useDivisionMutation();
    const [district, { data: districtData }] = useDistrictMutation();
    const [createEmployee, { isLoading: createLoading, isSuccess: userCreated }] = useCreateEmployeeMutation();
    const [updateEmployee, { isLoading: updateLoading, isSuccess: userUpdated }] = useUpdateEmployeeMutation();

    useEffect(() => {
        // if isEmployee are equal to employees then fetch division data
        if (isEmployee === "Employee") {
            division()
            setIsEmployee(null)
        }

        // set divisions data  
        if (divisionData?.isSuccess) {
            setDivisions(divisionData?.readDivisionData)
        }

        // set districts data
        if (districtData?.isSuccess) {
            setDistricts(districtData?.readDistrictData)
        }

        // send success message for create and update
        if (userCreated || userUpdated) {
            toast.success(userData ? "User Updated" : " User Added")
            router.push('/')
            setOpen(false)
        }

    }, [divisionData?.isSuccess, districtData?.isSuccess, isEmployee, userCreated, userUpdated])

    useEffect(() => {
        if (userData?.divisionId) {
            division()
            district(userData.divisionId)
        }
    }, [userData?.divisionId])

    const user = [
        { value: "Admin", label: "Admin" },
        { value: "Employee", label: "Employee" }
    ]

    // if user is updated then sent to home route 
    if (userUpdated) {
        router.push('/')
    }

    // if user is updated then refetch Employee data
    if (userCreated) {
        reload(true)
    }

    if (createLoading || updateLoading) {
        return <Loading />
    }

    // handle Create And Update 
    const handleCreateAndUpdate = (data) => {
        if (userData) {
            updateEmployee({ empID: userData.empID, data: data })
        } else {
            createEmployee(data)
        }
    }

    return (
        <>
            <Dialog open={open} onClose={onCloseModal}>
                <DialogTitle style={{ textAlign: 'center' }}>{userData ? 'Edit User' : 'Add User'}</DialogTitle>
                <DialogContent style={{ paddingBottom: "30px" }}>
                    <Formik
                        initialValues={{
                            firstName: userData?.firstName || '',
                            lastName: userData?.lastName || '',
                            employeeType: userData?.employeeType || '',
                            divisionId: userData?.divisionId || 0,
                            districeID: userData?.districeID || 0,
                        }}
                        validationSchema={
                            Yup.object({
                                firstName: Yup.string().required('First name is required'),
                                lastName: Yup.string().required('Last name is required'),
                                employeeType: Yup.string().required('Employee type is required'),
                                divisionId: Yup.number().when('employeeType', ([employeeType], schema) => {
                                    return employeeType === 'Admin' ? Yup.number() : schema.required('Division is required');
                                }),
                                districeID: Yup.number().test('districeID', 'Please select a division first.', function (value) {
                                    const { employeeType, divisionId } = this.parent;
                                    if (employeeType !== 'Admin' && !divisionId) {
                                        return this.createError({ path: 'districeID', message: 'Please select a division first.' });
                                    }
                                    return true;
                                }),
                            })
                        }
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

                                    <Grid item xs={12}>
                                        <TextField
                                            id="employeeType"
                                            name="employeeType"
                                            select
                                            fullWidth
                                            label="Employee Type"
                                            value={values.employeeType}
                                            onChange={handleChange}
                                            onClick={(e) => setIsEmployee(e.target.value)}
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
                                        <TextField
                                            id="divisionId"
                                            name="divisionId"
                                            select
                                            fullWidth
                                            label="Division"
                                            value={values.divisionId}
                                            onClick={(e) => {
                                                if (e.target.value) {
                                                    district(e.target.value)
                                                }
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
                                            id="districeID"
                                            name="districeID"
                                            select
                                            fullWidth
                                            label="District"
                                            value={values.districeID}
                                            onChange={handleChange}
                                            error={touched.districeID && Boolean(errors.districeID)}
                                            helperText={touched.districeID && errors.districeID}
                                        >
                                            {districts?.map((district) => (
                                                <MenuItem key={district.districtID} value={district.districtID}>
                                                    {district.districtName}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Button fullWidth size='large' variant="contained" onClick={onCloseModal} color="secondary">
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomButton fullWidth size='large' variant="contained" type="submit" disabled={isSubmitting}>
                                            {userData ? 'Update' : 'Save'}
                                        </CustomButton>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default EditUserModal;