import styles from '../styles/Home.module.css'
import { Tab, Tabs, Typography } from '@material-ui/core'
import { useState } from 'react';

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(0);

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
      {selectedTab === 0 && "User List"}
      {selectedTab === 1 && "Employee List"}
    </div>
  )
}
