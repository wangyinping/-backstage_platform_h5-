<template>
  <div class="inner-header">
    <span class="header-right">
      <a style="margin-right:20px; " @click.prevent="resetPassword">重设密码</a>
      <a @click.prevent="logout">注销</a>
      <img src="../assets/admin.png" alt="">
      <span>{{userName}}</span>
    </span>
  </div>
</template>

<script>
export default{
  data () {
    return {
      userName: localStorage.getItem('userName') || 'default'
    }
  },
  methods: {
    resetPassword () {
      this.$root.Bus.$emit('dialogOpenListener', {currentView: 'resetPassword', dialogFormVisible: true, title: '重置密码！'});
    },
    logout () {
      this.$router.push('/');
      localStorage.clear();
    }
  }
}
</script>

<style lang="scss">
  $blue-color: #6392fe;
  .el-header {
    padding: 0;
    position: fixed;
    width: 100%;
    z-index: 2;
  }
  .inner-header {
    padding: 0 30px;
    color: #ffffff;
    height: 60px;
    line-height: 60px;
    background: $blue-color url('../assets/logo.png') no-repeat 30px;
    overflow: hidden;
    .header-right {
      float: right;
      img {
        display: inline-block;
        vertical-align: middle;
        margin: 0 20px;
      }
    }
  }
</style>
