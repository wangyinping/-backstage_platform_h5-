<template>
  <div id="login">
    <div class="login-header"></div>
    <div class="login-center">
      <div class="login-box">
        <div class="title">账号登陆</div>
        <input type="text" placeholder="请输入员工账号" />
        <input type="password" placeholder="请输入账号密码" />
        <div class="remember">
          <el-checkbox v-model="checked">记住密码</el-checkbox>
        </div>
        <el-button type="primary" @click="submit">登陆</el-button>
      </div>
    </div>
    <div class="login-footer">@版权所有为友众信业（上海）金融信息服务有限公司</div>
  </div>
</template>

<script>
import request from '@/request'
export default {
  name: 'Login',
  data () {
    return {
      checked: false
    }
  },
  methods: {
    submit: function () {
      this.$router.push({path:'/home'});
      // request.login(this.formLogin).then((res) => {
      //   if (!res) return false;
      //   localStorage.setItem('Authorization', `Bearer ${rp.data.token}`);
      //   localStorage.setItem('userName', 'admin');
      //   this.$router.push('/home');
      //
      // })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  $blue-color: #6392fe;
  #login{
    text-align: center;
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .login-header{
    height: 80px;
    width: 100%;
    background:#ffffff url('../assets/logo2.png') no-repeat 20%;
  }
  .login-center{
    position: absolute;
    top:80px;
    bottom:150px;
    background-image: url('../assets/bg.png');
    background-repeat:no-repeat;
    background-size:cover;
    width: 100%;
    .login-box{
      position: absolute;
      top: 0;
      bottom:  0;
      right: 200px;
      margin: auto 0;
      width: 320px;
      height: 350px;
      border-radius: 8px;
      background-color: #ffffff;
      .title{
        font-size: 18px;
        color: #666666;
        margin: 20px auto;
      }
      input{
        width: 280px;
        height: 50px;
        border-radius: 5px;
        border: 1px solid #cdd4e1;
        padding-left: 10px;
        margin-bottom: 20px;
      }
      .remember{
        margin:0 20px 40px;
        overflow: hidden;
        .el-checkbox{
          float: left;
        }
        a{
          float: right;
        }
        a,a:hover,a:focus{
          color:$blue-color;
        }
      }
      .el-button{
        width: 280px;
        height: 50px;
        span{
          font-size: 18px;
        }
      }
    }
  }
  .login-footer{
    position: absolute;
    bottom: 0;
    background-color: #ffffff;
    height: 150px;
    width: 100%;
    padding-top: 60px;
    box-sizing: border-box;
    text-align: center;
    color: #939da6;
    font-size: 16px;
  }
</style>
