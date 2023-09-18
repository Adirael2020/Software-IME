"use client"

import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';

import HomeAdmin from './components/HomeAdmin';
import HomeStudents from './components/HomeStudents';
import HomeUser from './components/HomeUser';

const Home = () => {

  const {data , status} = useSession();
  const user = useSelector((state) => state.user.user);

  console.log(data,status);
  //const {hierarchy} = user;
  const hierarchy = 'Admin'

  if(hierarchy === 'Admin') return <HomeAdmin/>;
  if(hierarchy === 'Student') return <HomeStudents/>;
  return <HomeUser/>;
}

export default Home