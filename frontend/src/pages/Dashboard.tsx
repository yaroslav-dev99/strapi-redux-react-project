import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../features/dashboardSlice';
import { RootState } from '../app/store';

// Import Metronic components

const Dashboard: React.FC = () => {

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Example of a Metronic Card */}
      </div>
    </div>
  );
};

export default Dashboard;
