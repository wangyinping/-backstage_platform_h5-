<template>
  <div>
    <el-form :model="roleForm" :rules="rules" ref="roleForm">
      <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="roleForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="页面权限设置" :label-width="formLabelWidth">
        <el-tree
          ref="tree"
          :data="menuList"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[1,2]"
          :props="defaultProps">
        </el-tree>
      </el-form-item>
      <el-form-item label="删除功能权限" :label-width="formLabelWidth" prop="deleteAuthority">
        <el-radio v-model="roleForm.deleteAuthority" label="0">是</el-radio>
        <el-radio v-model="roleForm.deleteAuthority" label="1">否</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit('roleForm')">确 定</el-button>
    </div>
  </div>
</template>
<script>
import request from '@/request';
export default {
  props: {
    id: ''
  },
  data () {
    return {
      roleForm: {
        id: '',
        name: '',
        menuIds: [],
        deleteAuthority: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入角色名称', trigger: 'blur'}
        ],
        deleteAuthority: [
          {required: true, message: '请选择', trigger: 'change'}
        ]
      },
      formLabelWidth: '120px',
      menuList: [],
      defaultProps: {
        children: 'childList',
        label: 'name'
      }
    }
  },
  mounted () {
    if (this.id) {
      this.editInit();
    } else {
      this.addInit();
    }
  },
  methods: {
    addInit () {
      request.roleToCreate().then(res => {
        if (!res) return false;
        this.menuList = res.data.menu.childList;
      });
    },
    editInit () {
      request.roleToUpdate({id: this.id}).then(res => {
        if (!res) return false;
        this.menuList = res.data.menu.childList;
        this.roleForm.id = res.data.role.id;
        this.roleForm.name = res.data.role.name;
        this.roleForm.menuIds = res.data.role.menuIds.split(',');
        this.roleForm.deleteAuthority = res.data.role.deleteAuthority + '';
        this.$refs.tree.setCheckedKeys(this.roleForm.menuIds);
      });
    },
    submit (formName) {
      this.roleForm.menuIds = this.$refs.tree.getCheckedKeys();
      this.roleForm.menuIds = this.roleForm.menuIds.join(',');
      this.$refs[formName].validate((valid) => {
        if (!valid) return false;
        let addOrEdit = 'roleCreate';
        if (this.roleForm.id) {
          addOrEdit = 'roleUpdate';
        }
        request[addOrEdit](this.roleForm).then(res => {
          if (!res) return false;
          this.$message.success('提交成功！');
          this.$root.Bus.$emit('dialogCloseListener');
          this.$root.Bus.$emit('updateList');
        });
      });
    },
    cancel () {
      this.$root.Bus.$emit('dialogCloseListener');
    }
  }
}
</script>
<style>
  .el-tree{
    margin-top: 10px;
  }
</style>
