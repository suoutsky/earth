const MENU = [
  {
    title: 'D3',
    icon: '&#xe60d;',
    key: 'datapanel',
    auth: '/datapanel',
    children: [
      {
        title: '线段',
        key: 'segment',
        auth: '/datapanel/segment',
        route: '/datapanel/segment',
        isRoot: true
      },
      {
        title: '直方',
        key: 'histogram',
        auth: '/datapanel/histogram',
        route: '/datapanel/histogram',
        isRoot: true
      }
    ]
  }
];

export default MENU;
