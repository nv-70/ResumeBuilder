import {useNavigate}from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../context/userContext'
import { cardStyles } from '../assets/dummystyle'
import React from 'react'

// PROFILE INFO CARDS
export const ProfileInfoCard = ({ title, content }) => {
  const navigate = useNavigate()
  const {user, clearUser} = useContext(userContext);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  }
  return(
    user && (
        <div className ={cardStyles.profileCard}>
            <div className = {cardStyles.profileInitialsContainer}>
                <span className = {cardStyles.profileInitialsText}>
                    {user.name?user.name.charAt(0).toUpperCase():""}
                </span>
             
            </div>
            <div>
                <div className = {cardStyles.profileName}>
                    {user.name || ""}
                </div>
                <button className={cardStyles.logoutButton} onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>

    )
  )
};
