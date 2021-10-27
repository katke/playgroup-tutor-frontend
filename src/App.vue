<template>
  <div id="app">
    <!-- ======= Header ======= -->
    <header id="header" class="fixed-top">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <h1 class="logo me-auto me-lg-0"><a href="index.html">Playgroup Tutor</a></h1>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html" class="logo"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

        <nav id="navbar" class="navbar order-last order-lg-0">
          <ul>
            <li><a class="active" href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="resume.html">Resume</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>
        <!-- .navbar -->

        <div class="header-social-links">
          <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
          <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
          <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
          <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
        </div>
      </div>
    </header>
    <!-- End Header -->
    <!-- 
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
    </div> -->

    <!-- ROUTER VIEW -->
    <router-view />

    <!-- ======= Footer ======= -->
    <footer id="footer">
      <div class="container">
        <div class="copyright">
          &copy; Copyright
          <strong><span>Kelly</span></strong>
          . All Rights Reserved
        </div>
        <div class="credits">
          <!-- All the links in the footer should remain intact. -->
          <!-- You can delete the links only if you purchased the pro version. -->
          <!-- Licensing information: https://bootstrapmade.com/license/ -->
          <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/kelly-free-bootstrap-cv-resume-html-template/ -->
          Designed by
          <a href="https://bootstrapmade.com/">BootstrapMade</a>
        </div>
      </div>
    </footer>
    <!-- End  Footer -->
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
  // watch: {
  //   localStorage.first_name: function () {
  //     this.loginCheck();
  //   },
  // },
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
