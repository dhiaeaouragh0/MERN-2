import React, { Fragment  } from 'react';
import MetaData from '../layout/MetaData';
import './admin.css';
import Sidebar from './Sidebar';
import DashHome from './DashHome';


const Dashboard = () => {
  
  

  return (
    <Fragment>
      <MetaData title="Dashboard" />
      <div className='grid-container'>
        <Sidebar/>
        <DashHome/>
      </div>
      
    </Fragment>
  );
};

export default Dashboard;
