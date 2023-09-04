"use client"

import { useSelector } from 'react-redux';

import HomeAdmin from './components/HomeAdmin';
import HomeStudents from './components/HomeStudents';
import HomeUser from './components/HomeUser';

const Home = () => {

  const user = useSelector((state) => state.user.user);
  const {hierarchy} = user; 
  
  if(hierarchy === 'Admin') return <HomeAdmin/>;
  if(hierarchy === 'Student') return <HomeStudents/>;
  return <HomeUser/>;
}

export default Home