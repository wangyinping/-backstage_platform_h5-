<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/account/user' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button icon="el-icon-plus" class="el-button-top" size="small" type="primary" plain @click="add">创建角色</el-button>
    <el-table
      :data="tableData"
      stripe
      max-height="420"
    >
      <el-table-column
        width="100"
        prop="id"
        label="序号">
      </el-table-column>
      <el-table-column
        label="角色名称"
        min-width="120"
        prop="name">
      </el-table-column>
      <el-table-column
        label="创建人"
        min-width="120"
        prop="creatorName">
      </el-table-column>
      <el-table-column
        label="创建时间"
        min-width="150"
        prop="createTime">
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="150">
        <template slot-scope="scope">
          <el-button plain
                     type="primary"
                     size="mini"
                     @click="edit(scope.$index, scope.row)">编辑</el-button>
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
  </div>
</template>

<script>
import request from '@/request';
export default {
  data () {
    return {
      tableData: [],
      pageObject: {
        pageSize: 10,
        pageNum: 1
      },
      pageTotal: 100
    }
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
      name: '超级管理员',
      creatorName: '王小虎',
      createTime: '2016-05-03'
    }, {
      id: '1',
      name: '超级管理员',
      creatorName: '王小虎',
      createTime: '2016-05-03'
    }, {
      id: '1',
      name: '超级管理员',
      creatorName: '王小虎',
      createTime: '2016-05-03'
    }, {
      id: '1',
      name: '超级管理员',
      creatorName: '王小虎',
      createTime: '2016-05-03'
    }, {
      id: '1',
      name: '超级管理员',
      creatorName: '王小虎',
      createTime: '2016-05-03'
    }, {
      id: '1',
      name: '超级管理员',
      creatorName: '王小虎',
      createTime: '2016-05-03'
    }, {
      id: '1',
      name: '超级管理员',
      creatorName: '王小虎',
      createTime: '2016-05-03'
    }];
  },
  methods: {
    add () {
      this.$root.Bus.$emit('dialogOpenListener', {currentView: 'addEditRole', title: '创建角色', dialogFormVisible: true});
    },
    edit (index, row) {
      this.$root.Bus.$emit('dialogOpenListener', {currentView: 'addEditRole', title: '编辑角色', dialogFormVisible: true, id: row.id});
    },
    handleSizeChange (val) {
      this.pageObject.pageSize = val;
      this.getList();
    },
    handleCurrentChange() {
      console.log(this.pageObject.pageNum);
      this.getList();
    },
    getList () {
      request.roleList(this.pageObject).then(res => {
        if (!res) return false;
        this.tableData = res.data.list;
        this.pageTotal = res.data.total;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .el-button-top{
    margin-top: 15px;
  }
</style>
