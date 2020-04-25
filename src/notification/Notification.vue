<template>
  <div class="main-content">
    站内消息！
    {{text}}
  </div>
</template>

<script>
export default{
  data () {
    return {
      text: ''
    }
  },
  beforeCreate () {
    this.text = "2";
  },
  created () {
    this.text = "3";
  },
}
</script>

<style>

</style>
