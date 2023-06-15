import { Tab, Tabs, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react';
import { useEmployeeDataMutation } from '../redux/services/api';
import { Loading, UserTable } from '../components';

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [reload, setReload] = useState(false);
  const [employeeData, { error, isLoading, isError, data, success, isSuccess }] =
    useEmployeeDataMutation();

  useEffect(() => {
    // fetch Employee data
    if (!isSuccess || reload) {
      employeeData();
    }
    setReload(false)
  }, [employeeData, reload]);

  if (isLoading) {
    return <Loading />
  }

  // handle Tab Change
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setReload(true)
  };

  return (
    <div>
      <Typography variant="h4" style={{ margin: "20px 0" }} component="h1" align="center">
        User Management System
      </Typography>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="User" />
        <Tab label="Employees" />
      </Tabs>
      {selectedTab === 0 && <UserTable data={data?.readEmployeeData} reload={setReload} employeeType="admin" />}
      {selectedTab === 1 && <UserTable data={data?.readEmployeeData} reload={setReload} employeeType="employee" />}
    </div>
  )
}
