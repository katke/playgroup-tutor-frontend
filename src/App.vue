<template>
  <div id="app">
    <!-- ======= Header ======= -->
    <header id="header" class="fixed-top" v-if="isHome">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <h1 class="logo me-auto me-lg-0"><a href="#">Playgroup Tutor</a></h1>
        <nav id="navbar" class="navbar order-last order-lg-0">
          <!-- ======= Desktop Navbar ======= -->
          <ul>
            <li><a href="/find-friends">Find Friends</a></li>
            <li><a href="/advanced-chat">Chat</a></li>
            <li>
              <a href="/friend-requests">
                Friend Requests&nbsp;
                <span id="friend-requests" class="">({{ friendRequests }})</span>
              </a>
            </li>
          </ul>
          <!-- End Desktop Navbar -->
          <!-- ======= Mobile Dropdown -->
          <div class="navbar order-last order-lg-0">
            <div class="dropdown">
              <i class="bi bi-list mobile-nav-toggle dropdown-toggle" data-bs-toggle="dropdown" id="mobileDropdown"></i>

              <ul class="dropdown-menu" aria-labelledby="mobileDropdown">
                <li><a href="/find-friends" class="dropdown-item">Find Friends</a></li>
                <li><a href="/advanced-chat" class="dropdown-item">Chat</a></li>
                <li>
                  <a href="/friend-requests" class="dropdown-item">
                    Friend Requests&nbsp;
                    <span id="friend-requests" style="color: red">({{ friendRequests }})</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <!-- End Mobile Dropdown -->
        <!-- ======= Login Dropdown ======= -->
        <div class="navbar order-last order-lg-0">
          <div class="dropdown" @update-login-name="loginCheck()">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="loginDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ loginStatus }}
            </button>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="loginDropdown">
              <li><a class="dropdown-item active" href="/me">View / Edit my Profile</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" @click="logOut()">Log out</a></li>
            </ul>
          </div>
        </div>
        <!-- End Login Dropdown -->
      </div>
    </header>
    <!-- End Header -->

    <!-- ======= Router view ======= -->
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

    <a href="#" class="back-to-top d-flex align-items-center justify-content-center">
      <i class="bi bi-arrow-up-short"></i>
      test
    </a>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      friendRequests: 0,
      loginStatus: "Not logged in",
    };
  },
  mounted: function () {
    this.loginCheck();
    this.friendRequestCount();
  },
  methods: {
    loginCheck: function () {
      if (localStorage.first_name) {
        this.loginStatus = `Logged in as ${localStorage.first_name}`;
      } else {
        this.loginStatus = "Not logged in";
      }
    },
    friendRequestCount: function () {
      axios.get("/friend-requests").then((response) => {
        this.friendRequests = response.data.length;
        let form = document.getElementById("friend-requests");
        if (response.data.length > 0) {
          form.classList.add("request-count");
        } else {
          form.classList.remove("request-count");
        }
      });
    },
    logOut: function () {
      // console.log("logged out!");
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
    toMe: function () {
      this.$router.push("/me");
    },
  },
  // headeer/footer does NOT show up on login/create pages
  computed: {
    isHome() {
      return this.$route.name !== "Home" && this.$route.name !== "Log In" && this.$route.name !== "Create Account"
        ? true
        : false;
    },
  },
};
</script>
