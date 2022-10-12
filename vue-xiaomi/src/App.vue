<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>


</script>
<style lang="scss">
/* 注意这里是全局样式，不用scoped */
@import "./assets/reset.scss"; //引入全局样式重置库
#app{
  background-color: #fff;
}
.W{
  margin: 0 auto;
  width: 1225px;
}
</style>
