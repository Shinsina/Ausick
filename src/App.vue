<template>
<div class="py-10">
  <router-view/>
  <div class="text-center pt-10">
    <router-link to="/"> Home </router-link>
    <a v-on:click="this.$router.back"> Back </a>
  </div>
  </div>
</template>

<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
