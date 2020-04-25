<template>
  <div>
    <el-form :model="userForm" :rules="rules" ref="userForm">
      <el-form-item label="所属部门" :label-width="formLabelWidth" prop="depName">
        <el-select v-model="userForm.depName" placeholder="请选择">
          <el-option
            v-for="item in allCompanys"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户账号" :label-width="formLabelWidth" prop="account">
        <el-input v-model="userForm.account" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户姓名" :label-width="formLabelWidth" prop="userName">
        <el-input v-model="userForm.userName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="userForm.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth" prop="roleIds">
        <el-select v-model="userForm.roleIds" placeholder="请选择">
          <el-option
            v-for="item in allRoles"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit('userForm')">确 定</el-button>
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
      userForm: {
        id: '',
        depName: '',
        account: '',
        userName: '',
        email: '',
        roleIds: ''
      },
      allRoles: [],
      allCompanys: [],
      rules: {
        depName: [
          {required: true, message: '请选择', trigger: 'blur'}
        ],
        account: [
          { required: true, message: '请输入用户账号', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        roleIds: [
          { required: true, message: '请选择', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px'
    };
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
      request.userToCreate().then(res => {
        if (!res) return false;
        this.allRoles = res.data.allRoles;
        this.allCompanys = res.data.allCompanys;
      });
    },
    editInit () {
      request.userToUpdate({id: this.id}).then(res => {
        if (!res) return false;
        this.allRoles = res.data.allRoles;
        this.allCompanys = res.data.allCompanys;
        for (let item in this.userForm) {
          this.userForm[item] = res.data.adminUser[item];
          if (this.userForm.roleIds) {
            this.userForm.roleIds = parseInt(this.userForm.roleIds);
          }
        }
      });
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false;
        let addOrEdit = 'userCreate';
        if (this.userForm.id) {
          addOrEdit = 'userUpdate';
        }
        request[addOrEdit](this.userForm).then(res => {
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
