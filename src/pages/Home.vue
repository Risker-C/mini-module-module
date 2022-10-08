<template>
  <div class="home">
    <img src="../assets/VML.svg"/>
    <p>这里是模块工程页面-change</p>
    <button @click="$router.push('/supplier')">供应商</button> |
    <button @click="$router.push('/supplier-info')">供应商详情</button> |
  </div>
</template>
<style scoped>
.home img {
  width: 50%;
}
</style>
