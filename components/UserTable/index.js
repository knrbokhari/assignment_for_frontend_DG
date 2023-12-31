import { Box, Button, Container, IconButton, Tooltip } from '@material-ui/core';
import { MaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react'
import { CustomButton, EditUserModal } from '../index';
import { useRouter } from 'next/router';

const UserList = ({ data, employeeType, reload }) => {
    const [employeesData, setEmployeesData] = useState([]);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // set employees Data based on employee type
        setEmployeesData(data?.filter(i => i.employeeType.toLocaleLowerCase() === employeeType))
    }, [])


    const columns = useMemo(
        () => [
            {
                accessorKey: 'empID',
                header: 'ID',
                size: 50,
            },
            {
                accessorKey: 'firstName',
                header: 'First Name',
                size: 150,
            },
            {
                accessorKey: 'lastName',
                header: 'Last Name',
                size: 150,
            },
            {
                accessorKey: 'employeeType',
                header: 'Employee Type',
                size: 150,
            },
            {
                accessorKey: 'disvision',
                header: 'Disvision',
                size: 150,
            },
            {
                accessorKey: 'district',
                header: 'District',
                size: 150,
            },
        ],
        [],
    );

    // sent to employees details page
    const handleDetails = (e) => {
        router.push(`/employees/${e.getValue('empID')}`)
    }

    return (
        <Container>
            {!!employeesData?.length && <MaterialReactTable
                columns={columns}
                data={employeesData}
                enableFullScreenToggle={false}
                enableDensityToggle={false}
                enableColumnOrdering
                enableEditing
                positionActionsColumn="last"
                renderRowActions={({ row, table }) => (
                    <Box style={{ display: 'flex', gap: '1rem' }}>
                        <Tooltip arrow placement="left" title="Details">
                            <Button variant='contained' color="primary" onClick={() => handleDetails(row)}>Details</Button>
                        </Tooltip>
                    </Box>
                )}
                renderTopToolbarCustomActions={() => (
                    <CustomButton
                        color="primary"
                        onClick={() => setOpen(true)}
                        variant="contained"
                    >
                        Add A User
                    </CustomButton>
                )}
            />}
            <EditUserModal
                open={open}
                setOpen={setOpen}
                reload={reload}
                onCloseModal={() => setOpen(!open)}
            />
        </Container>
    )
}

export default UserList