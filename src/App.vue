<template>
  <div id="app">
    <div id="nav" v-if="isHome">
      <router-link to="/">Secret home page</router-link>
      |
      <router-link to="/log-in">Log In</router-link>
      |
      <router-link to="/create-account">Create Account</router-link>
      |
      <router-link to="/find-friends">Find Friends</router-link>
      |
      <router-link to="/friends">Friends</router-link>
      |
      <span @click="logOut()">Log Out</span>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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

<script>
import axios from "axios";
export default {
  methods: {
    logOut: function () {
      console.log("logged out!");
      localStorage.setItem("jwt", "");
      axios.defaults.headers.common["Authorization"] = "not logged in";
      this.$router.push("/log-in");
    },
  },
  computed: {
    isHome() {
      return this.$route.name !== "Home";
    },
  },
};
</script>
