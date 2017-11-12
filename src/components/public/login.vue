<template>
  <div>
    <div>
      <input type="text" name="username" v-model="username">
    </div>
    <div>
      <input type="text" name="password" v-model="password">
    </div>
    <div>
      <button @click="login">登录</button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'login',
    data() {
      return {
        username: '',
        password: ''
      }
    },
    created() {
      // this.apiPost('login', { appid: '2', projectid: '6' }).then((res) => {
      //   this.appid = res.data.appid
      //   this.projectid = res.data.projectid
      // })
    },
    methods: {
      login() {
        this.apiPost('login', {
          username: this.username,
          password: this.password
        }).then((ret) => {
          console.log('登录成功')
        })
      }
    }
  }
</script>