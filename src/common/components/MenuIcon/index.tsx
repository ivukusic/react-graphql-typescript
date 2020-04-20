import React, { useContext, useState } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';

import { MenuContext } from '../../../App';

import './MenuIcon.style.scss';

interface Props {
  logout: () => void;
}

export const MenuIcon = ({ logout }: Props) => {
  const { showSidebar } = useContext(MenuContext);
  const [opened, setOpened] = useState(false);

  const onMenuClick = () => {
    setOpened(!opened);
  };

  const logoutUser = () => {
    showSidebar();
    logout();
  };

  return (
    <div className="menu-icon">
      <AiOutlineSetting size={20} color="#323232" onClick={onMenuClick} />
      <ul className={`menu${opened ? ' opened' : ''}`}>
        <li>Action</li>
        <li onClick={logoutUser}>Logout</li>
      </ul>
    </div>
  );
};

export default MenuIcon;
