<template>
  <el-menu
    :default-openeds="openeds"
    :default-active="$route.path"
    :unique-opened=true router
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#ffffff"
    text-color="#95a0aa"
    active-text-color="#6392fe">
    <template v-for="(item,index) in menuList">
      <el-submenu :index="index+''" v-if="item.childList">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item v-for="child in item.childList" :index="child.href">{{child.name}}</el-menu-item>
      </el-submenu>
      <el-menu-item :index="item.href" v-else>
        <i class="el-icon-menu"></i>
        <span slot="title">
        <el-badge :value="item.count">
          {{item.name}}
        </el-badge>
      </span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import request from '@/request'
export default{
  data () {
    return {
      openeds: ['0'],
      menuList: []
    }
  },
  mounted () {
    // 实际项目中动态从服务端获取
    // this.getMenuList();
    this.menuList = [{
      name: '权限管理',
      childList: [
        {
          name: '用户管理',
          href: '/account/user'
        },
        {
          name: '角色管理',
          href: '/account/role'
        }
      ]
    }, {
      name: 'Table表格',
      childList: [
        {
          name: 'Table排序',
          href: '/table/sortable'
        },
        {
          name: 'Table筛选',
          href: '/table/filtertable'
        },
        {
          name: 'Table展开',
          href: '/table/expand'
        }
      ]
    }, {
      name: '系统通知',
      href: '/notification/notification',
      count: 12
    }];
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    getMenuList() {
      request.menuList().then(res => {
        if(!res) return false;
        this.menuList = res.data.childList;
      })
    }
  }
}
</script>
<style lang="scss">
  $blue-color: #6392fe;
  .el-aside {
    width: 260px !important;
    position: fixed;
    top:60px;
    bottom: 0;
    &>.el-menu{
      height: 100%;
      background-color: #ffffff!important;
      border-right:none ;
    }
  }
  .el-submenu{
    width: 100%;
    .el-menu-item{
      text-align: left;
      padding-left: 60px !important;
    }
  }
  .el-submenu__title,.el-menu-item{
    text-align: left;
    padding-left: 30px !important;
  }
  .is-active{
    background-color: #eeeeee!important;
  }
  .el-menu-item.is-active {
    color: #95a0aa;
  }
  .el-submenu__icon-arrow{
    font-size: 16px!important;
    font-weight: 600;
  }
  .el-submenu__title:hover,.el-menu-item:hover{
    background-color: #eeeeee!important;
  }
  .el-badge__content.is-fixed{
    top: 8px;
  }
</style>
