import { Box, Button, Container, IconButton, Tooltip } from '@material-ui/core';
import { MaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react'
import { EditUserModal } from '../index';
import { useRouter } from 'next/router';

const UserList = ({ data, employeeType }) => {
    const [employeesData, setEmployeesData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
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
                accessorKey: 'district',
                header: 'District',
                size: 150,
            },
            {
                accessorKey: 'disvision',
                header: 'Disvision',
                size: 150,
            },
        ],
        [],
    );

    const handleDetails = (e) => {
        router.push(`/employees/${e.getValue('empID')}`)
    }

    return (
        <Container>
            {employeesData?.length && <MaterialReactTable
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
                            <Button variant='contained' onClick={() => handleDetails(row)}>Details</Button>
                        </Tooltip>
                    </Box>
                )}
                renderTopToolbarCustomActions={() => (
                    <Button
                        color="primary"
                        onClick={() => setOpen(true)}
                        variant="contained"
                    >
                        Add A User
                    </Button>
                )}
            />}
            <EditUserModal
                open={open}
                onCloseModal={() => setOpen(!open)}
            />
        </Container>
    )
}

export default UserList