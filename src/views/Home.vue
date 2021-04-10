<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <button @click="getRequest">Test request</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import axios from 'axios'
const DataBaseConnection = 'http://localhost:3000/graphql'
@Options({
  components: {
    HelloWorld
  },
  methods: {
    async getRequest () {
      try {
        const res = await axios.post(DataBaseConnection, { query: '{ authors{ id name } }' })
        console.log(res.data.data)
      } catch (e) {
        console.log('err', e)
      }
    }
  }
})
export default class Home extends Vue {}
</script>
