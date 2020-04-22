const usersAdmin = {
  path: '/user',
  name: 'Users',
  icon: 'AiOutlineUser',
  menu: [
    {
      path: '/user',
      name: 'User List',
    },
    {
      path: '/user/user-profile',
      name: 'User profile',
    },
    {
      path: '/user/user-create',
      name: 'Create user',
    },
  ],
};

const users = {
  path: '/user',
  name: 'Users',
  icon: 'AiOutlineUser',
  menu: [
    {
      path: '/user/user-profile',
      name: 'User profile',
    },
  ],
};

const routes = (role: string) => {
  const array = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: 'AiOutlineBank',
    },
    {
      path: '/post',
      name: 'Posts',
      icon: 'AiOutlinePushpin',
      menu: [
        {
          path: '/post',
          name: 'Posts List',
        },
        {
          path: '/post/post-create',
          name: 'Create post',
        },
      ],
    },
  ];
  if (role === 'ADMIN') {
    array.push(usersAdmin);
  } else {
    array.push(users);
  }
  return array;
};

export default routes;
