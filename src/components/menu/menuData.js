const EARTH_MENU = [
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

const SPARK_MENU = [
  {
    title: '磐石',
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
export default {
  EARTH_MENU,
  SPARK_MENU
};
