import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';

import { Card } from '..';
import { UserType } from '../../types';

import './UserCard.style.scss';

export const UserCard = ({ user }: { user: UserType }): JSX.Element => (
  <Card className="user-profile mb-4">
    <div className="user-profile__header" />
    <div className="user-profile__image">
      <AiOutlineUser size={40} color="darkgray" />
    </div>
    <div className="user-profile__content">
      <h3>{`${user.firstName} ${user.lastName}`}</h3>
      {user.description && <p className="quote">"{user.description}"</p>}
    </div>
  </Card>
);

export default UserCard;
