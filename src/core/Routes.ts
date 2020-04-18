const routes = [
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
  {
    path: '/user',
    name: 'Users',
    icon: 'AiOutlineUser',
    menu: [
      {
        path: '/user/list',
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
  },
];

export default routes;
