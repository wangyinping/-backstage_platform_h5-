<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible">
    <component v-bind:is="currentView" :id="id" v-if="isShow">
      <!-- 组件在 vm.currentview 变化时改变！ -->
    </component>
  </el-dialog>
</template>
<script>
import addEditUser from '@/account/addEditUser';
import addEditRole from '@/account/addEditRole';
import resetPassword from '@/account/resetPassword';

export default {
  data () {
    return {
      id: 0,
      dialogFormVisible: false,
      currentView: '',
      title: ''
    }
  },
  // 在组件销毁时解除事件绑定
  beforeDestroy () {
    this.$root.Bus.$off('dialogOpenListener');
    this.$root.Bus.$off('dialogCloseListener',this.dialogClose);
  },
  // 在 created 钩子函数中监听事件
  created () {
    this.$root.Bus.$on('dialogOpenListener', value => {
      this.dialogOpen(value)
    });
    this.$root.Bus.$on('dialogCloseListener', this.dialogClose);
  },
  methods: {
    dialogOpen (data) {
      this.id = data.id;
      this.dialogFormVisible = data.dialogFormVisible;
      this.currentView = data.currentView;
      this.title = data.title || '新建';
    },
    dialogClose () {
      this.dialogFormVisible = false;
    }
  },
  computed: {
    isShow: function () {
      return this.dialogFormVisible;
    }
  },
  components: {
    addEditUser, addEditRole, resetPassword
  }
}
</script>
<style lang="scss">
  .el-dialog__wrapper{
    padding-left: 260px;
  }
  .dialog-footer{
    text-align: right;
  }
  .el-dialog{
    .el-form{
      width: 70%;
    }
    .el-select,.el-input{
      width: 100%;
    }
  }
</style>
