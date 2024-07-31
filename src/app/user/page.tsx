import React from 'react';
import UserComponent from '../components/UserComponent';
import { getCars } from '../../../lib/data';

const UserPage: React.FC = async () => {
  const cars = await getCars();

  return <UserComponent cars={cars} />;
};

export default UserPage;
