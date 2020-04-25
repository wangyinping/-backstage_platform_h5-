<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/account/user' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search-box">
      <el-form label-position="right" label-width="110px">
        <el-form-item label="用户账号">
          <el-input
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="pageObject.account"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="pageObject.userName">
          </el-input>
        </el-form-item>
        <el-form-item  label="所属部门">
          <el-input
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="pageObject.depName">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" class="el-button--primary is-plain searchBtn" size="mini" round @click="query">查询结果</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button icon="el-icon-plus" size="small" type="primary" plain @click="add">添加用户</el-button>
    <el-button size="small" type="primary" plain @click="resetPassword">重置密码</el-button>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%;"
      max-height="300"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="30">
      </el-table-column>
      <el-table-column
        prop="id"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="account"
        label="用户账号">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户姓名">
      </el-table-column>
      <el-table-column
        prop="roleNames"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="depName"
        label="所属部门"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        min-width="160">
      </el-table-column>
      <el-table-column
        prop="creatorName"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="150">
        <template slot-scope="scope">
          <el-button plain
                     type="primary"
                     size="mini"
                     @click="edit(scope.$index, scope.row)">编辑</el-button>
          <el-button plain
                     type="danger"
                     size="mini"
                     @click="del(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :current-page.sync="pageObject.pageNum"
      :page-sizes="[10, 20, 50]"
      :page-size="pageObject.pageSize"
      layout="total, sizes, prev, pager, next"
      :total="pageTotal">
    </el-pagination>
    <el-dialog title="删除用户" :visible.sync="dialogVisible" width="35%">
      <span style="text-align: center;">是否删除账号为{{account}}的用户？</span>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDel"> 是 </el-button>
        <el-button @click="dialogVisible=false"> 否 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/request';
export default {
  data () {
    return {
      tableData: [],
      pageObject: {
        account: '',
        userName: '',
        depName: '',
        pageSize: 10,
        pageNum: 1
      },
      pageTotal: 0,
      dialogVisible: false,
      delId: '',
      account: '',
      ids: []
    };
  },
  beforeDestroy () {
    this.$root.Bus.$off('updateList', this.getList);
  },
  mounted () {
    // 实际项目中从服务端动态获取数据
    // this.getList();
    this.$root.Bus.$on('updateList', this.getList);
    this.tableData = [{
      id: '1',
      account: '考拉',
      userName: '考拉',
      roleNames: '管理员',
      depName: '技术',
      email: '123@126.com',
      creatorName: '考拉',
      createTime: '2016-05-03'
    }, {
      id: '1',
      account: '考拉',
      userName: '考拉',
      roleNames: '管理员',
      depName: '技术',
      email: '123@126.com',
      creatorName: '考拉',
      createTime: '2016-05-03'
    }];
  },
  methods: {
    resetPassword () {
      if (this.ids.length === 0) {
        this.$message.error('请选择操作的数据！');
        return false;
      }
      request.userUpdateUserPassword({ids: this.ids}).then(res => {
        if (!res) return false;
        this.$message.success('重置成功!');
        this.getList();
      });
    },
    del (index, row) {
      this.dialogVisible = true;
      this.account = row.account;
      this.delId = row.id;
    },
    confirmDel () {
      request.userDelete({id: this.delId}).then(res => {
        if (!res) return false;
        this.$message.success('删除成功!');
        this.dialogVisible = false;
        this.getList();
      });
    },
    query () {
      this.getList();
    },
    handleCurrentChange () {
      this.getList();
    },
    getList () {
      request.userList(this.pageObject).then(res => {
        if (!res) return false;
        this.tableData = res.data.list;
        this.pageTotal = res.data.total;
      });
    },
    add () {
      this.$root.Bus.$emit('dialogOpenListener', {currentView: 'addEditUser', dialogFormVisible: true, title: '添加用户'});
    },
    edit (index, row) {
      this.$root.Bus.$emit('dialogOpenListener', {currentView: 'addEditUser', dialogFormVisible: true, title: '修改信息', id: row.id});
    },
    handleSelectionChange (val) {
      this.ids = val.map(item => item.id);
      this.ids = this.ids.join(',');
    },
    handleSizeChange (val) {
      this.pageObject.pageSize = val;
      this.getList();
    }
  }
};
</script>
<style lang="scss">
  .search-box{
    margin:20px 0 15px;
    width: 100%;
    border: 1px solid rgba(228, 228, 228, 1);
    padding:30px 0;
    background-color: #fff;
  }
  .searchBtn{
    margin-left: 10px;
  }
  .search-box .el-form-item{
    display: inline-block;
    width:24%;
    margin-bottom: 0;
  }
  .el-checkbox{
    margin-bottom: 0;
  }
</style>
