import { Tab, Tabs, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react';
import { useEmployeeDataMutation } from '../redux/services/api';
import { Loading, UserTable } from '../components';

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [employeeData, { error, isLoading, isError, data, success, isSuccess }] =
    useEmployeeDataMutation();


  useEffect(() => {
    employeeData()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Typography variant="h4" component="h1" align="center">
        User Management System
      </Typography>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="User" />
        <Tab label="Employees" />
      </Tabs>
      {selectedTab === 0 && <UserTable data={data?.readEmployeeData} employeeType="admin" />}
      {selectedTab === 1 && <UserTable data={data?.readEmployeeData} employeeType="employee" />}
    </div>
  )
}
