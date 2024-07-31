import React from 'react';
import AdminComponent from '../components/AdminComponent';
import { getCars } from '../../../lib/data';

const UserPage: React.FC = async () => {
  const cars = await getCars();

  return <AdminComponent cars={cars} />;
};

export default UserPage;
