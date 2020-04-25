<template>
  <div id="app">
  <router-view name="Loading"></router-view>
    <el-container>
      <el-header>
        <router-view name="Header"></router-view>
      </el-header>
      <el-container>
        <el-aside>
          <router-view name="Aside"></router-view>
        </el-aside>
        <el-main>
          <router-view></router-view>
          <router-view name="Dialog"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
.el-main{
  margin: 60px 0 0 260px;
  text-align: left;
}
.el-table{
  margin: 20px 0;
}
.el-pagination{
  text-align: right;
}
</style>
