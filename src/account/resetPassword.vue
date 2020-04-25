<template>
  <div>
    <el-form :model="resetForm" :rules="rules" ref="resetForm">
      <el-form-item label="新密码" :label-width="formLabelWidth" prop="password">
        <el-input type="password" v-model="resetForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <div style="margin-top: 32px;">
        <el-form-item label="确认新密码" :label-width="formLabelWidth" prop="checkPass">
          <el-input type="password" v-model="resetForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit('resetForm')">确 定</el-button>
    </div>
  </div>
</template>
<script>
import request from '@/request';
export default {
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/.test(value)) {
        callback(new Error('密码必须由大写字母、小写字母、数字组成，至少8位'));
      } else {
        if (this.resetForm.checkPass !== '') {
          this.$refs.resetForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.resetForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      resetForm: {
        password: '',
        checkPass: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px'
    };
  },
  mounted () {
  },
  methods: {
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false;
        request.resetPassword(this.resetForm).then(res => {
          if (!res) return false;
          this.$message.success('重置成功！');
          this.$root.Bus.$emit('dialogCloseListener');
          this.$router.push('/');
        });
      });
    }
  }
}
</script>
