const MENU = [
  {
    title: 'D3demo',
    icon: '&#xe60d;',
    key: 'datapanel',
    auth: '/datapanel',
    children: [
      {
        title: '直方图',
        key: 'income',
        auth: '/datapanel/histogram',
        route: '/datapanel/histogram',
        isRoot: true
      }
    ]
  }
];

export default MENU;
