import { Container, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import EmployeeDetails from '../../components/EmployeeDetails';
import { useRouter } from 'next/router';
import { useIndividualEmployeeMutation } from '../../redux/services/api';
import { Loading } from '../../components';

const EmployeeDetailsPage = () => {
    const router = useRouter();
    const [individualEmployee, { error, isLoading, isError, data, success, isSuccess }] =
    useIndividualEmployeeMutation();

    useEffect(() => {
        individualEmployee(router?.query?.id)
    }, [])

    if (isLoading) {
        return <Loading />
      }

    return (
        <Container>
            <Typography variant='h4' align='center'>Employee Details</Typography>
            <EmployeeDetails employee={data?.readEmployeeData[0]} />
        </Container>
    )
}

export default EmployeeDetailsPage