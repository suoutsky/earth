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
        auth: '/datapanel/income',
        route: '/datapanel/income'
      }
    ]
  }
];

export default MENU;
