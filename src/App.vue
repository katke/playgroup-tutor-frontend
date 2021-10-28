<template>
  <div id="app">
    <!-- ======= Header ======= -->
    <header id="header" class="fixed-top" v-if="isHome">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <h1 class="logo me-auto me-lg-0"><a href="#">Playgroup Tutor</a></h1>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html" class="logo"><img src="assets/img/logo.png" alt="" class="img-fluid" /></a> -->

        <nav id="navbar" class="navbar order-last order-lg-0">
          <ul>
            <!-- <li><a class="active" href="/">Home</a></li> -->
            <li><a href="/find-friends">Find Friends</a></li>
            <li><a href="/chat">Chat</a></li>
            <li><a href="/advanced-chat">Cool chat</a></li>
            <li><a href="/friend-requests">Friend Requests</a></li>
            <li><a href="/me">View/Edit My Account</a></li>
          </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>
        <!-- .navbar -->

        <div class="header-social-links">
          <button id="logout" @click="logOut()">LOG OUT</button>
        </div>
      </div>
    </header>
    <!-- End Header -->

    <!-- ROUTER VIEW -->
    <router-view />

    <!-- ======= Footer ======= -->
    <footer id="footer">
      <div class="container">
        <div class="copyright">
          Created by
          <strong><span>David Ryan</span></strong>
          2021
        </div>
        <div class="credits"></div>
      </div>
    </footer>
    <!-- End  Footer -->

    <!-- <div id="preloader"></div> -->
    <!-- <a href="#" class="back-to-top d-flex align-items-center justify-content-center">
      <i class="bi bi-arrow-up-short"></i>
    </a> -->
  </div>
</template>

<style></style>

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
      if (localStorage.first_name) {
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
      localStorage.removeItem("latitude");
      localStorage.removeItem("longitude");
      localStorage.removeItem("profile_picture");

      this.loginStatus = "Not logged in";
      axios.defaults.headers.common["Authorization"] = "not logged in";
      this.$router.push("/");
    },
  },
  computed: {
    isHome() {
      return this.$route.name !== "Home" && this.$route.name !== "Log In" && this.$route.name !== "Create Account"
        ? true
        : false;
    },
  },
};
</script>
