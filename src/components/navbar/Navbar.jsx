import React from "react";
import styles from "./Navbar.module.css";
import kkoin from "../../assets/logo.jpeg";
import { FaUserCircle } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';

const Navbar=()=>{
  const isAdmin=localStorage.getItem("user")==="admin"; 
  const navigate=useNavigate();
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_left}>
        <img src={kkoin} alt="Website Logo" className={styles.navbar_logo} />
      </div>
      <div className={styles.navbar_right}>
        {isAdmin ? (
          <ul className={styles.navbar_links}>
            <li href='/my-submissions' className={styles.navbar_link}>Pending Requests</li>
          </ul>
        ) : (
          <ul className={styles.navbar_links}>
            <li onClick={()=>navigate('/my-submissions')} className={styles.navbar_link}>My Submissions</li>
          </ul>
        )}
        <div className={styles.profile}>
          <FaUserCircle size={25} onClick={()=>navigate('/profile')}/>
        </div>
        <button className={styles.btn}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
