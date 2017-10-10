<template>
  <div id="app">
    <v-header></v-header>
    <router-view name="main"></router-view>
    <router-view name='sidebar'></router-view>
  </div>
</template>

<script>
import vHeader from './components/home/Header'

export default {
  name: 'app',
  components: {
    vHeader
  }
}
</script>

<style scoped>
html {
  background-color: #DDDDDD;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 20px;
}
body,div,span,a,p,ul,li {
  margin: 0;
  padding: 0;
}
</style>
