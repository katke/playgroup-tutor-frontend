<template>
  <div id="app">
    <span id="login-status">{{ loginStatus }}</span>

    <div id="nav" v-if="isHome">
      <router-link to="/find-friends">Find Friends</router-link>
      |
      <router-link to="/chat">Chat</router-link>
      |
      <router-link to="/advanced-chat">Cool chat</router-link>
      |
      <router-link to="/friend-requests">Friend Requests</router-link>
      |
      <router-link to="/me">View/Edit My Account</router-link>
      |
      <span @click="logOut()">Log Out</span>
    </div>
    <router-view />
  </div>
</template>

<style>
#login-status {
  text-align: right;
  color: gray;
}
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
  data: function () {
    return {
      loginStatus: "Not logged in",
    };
  },
  created: function () {
    this.loginCheck();
  },
  methods: {
    loginCheck: function () {
      if (localStorage.first_name !== "null") {
        this.loginStatus = `Logged in as ${localStorage.first_name}`;
      } else {
        this.loginStatus = "Not logged in";
      }
    },
    logOut: function () {
      console.log("logged out!");
      localStorage.removeItem("jwt");
      localStorage.removeItem("email");
      localStorage.removeItem("user_id");
      localStorage.removeItem("first_name");
      this.loginStatus = "Not logged in";
      axios.defaults.headers.common["Authorization"] = "not logged in";
      this.$router.push("/");
    },
  },
  computed: {
    isHome() {
      return this.$route.name !== "Home";
    },
    isLogIn() {
      return this.$route.name !== "LogIn";
    },
  },
};
</script>
