const Mock = require('mockjs');

function mockData () {
  const api = '/api';
  Mock.mock(`${api}/login`,{
    code: 0,
    msg: 'SUCCESS'
  });
  Mock.mock(`${api}/menuList`,{
    menuList: [{
      name: '权限管理',
      childList: [
        {
          name: '角色管理',
          link: '/account/role'
        },
        {
          name: '用户管理',
          link: '/account/user'
        }
      ]
    }, {
      name: 'Table表格',
      childList: [
        {
          name: 'Table排序',
          link: '/table/sortable'
        },
        {
          name: 'Table展开',
          link: '/table/expand'
        }
      ]
    }, {
      name: '系统通知',
      link: '/notification/notification',
      count: 12
    }]
  });
}

export default {mockData};
