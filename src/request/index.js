import XHRPromise from '@/request/XHRPromise';
import router from '@/router';
import Vue from 'vue';
import ElementUI from 'element-ui';

Vue.use(ElementUI)

var vm = null;

const baseUrl = location.origin + '/api/';

const requestUrl = {
  login: 'login',
  logout: 'cms/logout',
  menuList: 'menuList',

  // 用户管理
  userList: 'user/list',
  userToCreate: 'user/toCreate',
  userCreate: 'user/create',
  userToUpdate: 'user/toUpdate',
  userUpdate: 'user/update',
  userDelete: 'user/delete',
  // 角色管理
  roleList: 'role/list',
  roleToCreate: 'role/toCreate',
  roleCreate: 'role/create',
  roleToUpdate: 'role/toUpdate',
  roleUpdate: 'role/update',
  // 重置密码
  userUpdateUserPassword: 'user/updateUserPassword',
  resetPassword: 'user/resetPassword'
}

for (var key in requestUrl) {
  requestUrl[key] = baseUrl + requestUrl[key];
}

const Request = {
  attach (vueComponent) {
    vm = function () {
      return vueComponent;
    }
  },
  login (data) {
    return resolveXHRPromise({url: requestUrl.login, method: 'POST', data: data});
  },
  logout (data) {
    return resolveXHRPromise({url: requestUrl.logout, method: 'POST', data: data});
  },
  menuList () {
    return resolveXHRPromise({url: requestUrl.menuList, method: 'GET'});
  },
  // 用户管理
  userList (data) {
    return resolveXHRPromise({url: requestUrl.userList, method: 'GET', data: data});
  },
  userToCreate () {
    return resolveXHRPromise({url: requestUrl.userToCreate, method: 'GET'});
  },
  userCreate (data) {
    return resolveXHRPromise({url: requestUrl.userCreate, method: 'POST', data: data});
  },
  userToUpdate (data) {
    return resolveXHRPromise({url: requestUrl.userToUpdate, method: 'GET', data: data});
  },
  userUpdate (data) {
    return resolveXHRPromise({url: requestUrl.userUpdate, method: 'POST', data: data});
  },
  userDelete (data) {
    return resolveXHRPromise({url: requestUrl.userDelete, method: 'POST', data: data});
  },
  // 角色管理
  roleList (data) {
    return resolveXHRPromise({url: requestUrl.roleList, method: 'GET', data: data});
  },
  roleToCreate () {
    return resolveXHRPromise({url: requestUrl.roleToCreate, method: 'GET'});
  },
  roleCreate (data) {
    return resolveXHRPromise({url: requestUrl.roleCreate, method: 'POST', data: data});
  },
  roleToUpdate (data) {
    return resolveXHRPromise({url: requestUrl.roleToUpdate, method: 'GET', data: data});
  },
  roleUpdate (data) {
    return resolveXHRPromise({url: requestUrl.roleUpdate, method: 'POST', data: data});
  },
  // 重置密码
  userUpdateUserPassword (data) {
    return resolveXHRPromise({url: requestUrl.userUpdateUserPassword, method: 'POST', data: data});
  },
  resetPassword (data) {
    return resolveXHRPromise({url: requestUrl.resetPassword, method: 'POST', data: data});
  }
}

function resolveXHRPromise (json) {
  return XHRPromise(json, vm).then((res) => {
    try {
      if (res.target.status != 200) {
        Vue.prototype.$message('服务器请求错误！');
        return false;
      }
      res = JSON.parse(res.target.response);
      if (res.code === 0) {
        return res;
      } else if (res.code == '10030'){
        Vue.prototype.$message('当前登录已超时,请重新登录');
        router.replace({path: '/'});
        return false;
      } else {
        Vue.prototype.$message(res.msg||'服务器请求错误！');
        return false;
      }
    } catch (e) {
      Vue.prototype.$message('出现运行时错误，请关闭后重试');
      return false;
    }
  }, (res) => {
    Vue.prototype.$message(res.msg || '服务器请求错误！');
    return false;
  })
}

export default Request;
