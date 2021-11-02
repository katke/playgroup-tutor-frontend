<template>
  <div class="home">
    <!-- ======= Hero Section ======= -->
    <section id="hero" class="d-flex align-items-center">
      <div class="container d-flex flex-column align-items-center" data-aos="zoom-in" data-aos-delay="100">
        <h1>Welcome to Playgroup Tutor!</h1>
        <h2>Find nearby MTG players and form new playgroups</h2>
        <div class="blurry_box">
          Email:
          <input type="text" v-model="inputParams.email" />
          Password:
          <input type="text" v-model="inputParams.password" />
        </div>
        <button @click="signIn()" class="btn-about">Log in</button>

        <button @click="showCreateAccount()" class="btn-about">Create Account</button>
      </div>
    </section>
    <!-- End Hero -->
  </div>
</template>

<style>
.request-count {
  color: red;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      inputParams: {
        email: "wanda@test.com",
        password: "password",
      },
    };
  },
  created: function () {},
  methods: {
    showCreateAccount: function () {
      this.$router.push("/create-account#");
    },
    signIn: function () {
      // console.log(this.inputParams);
      axios.post("/sessions", this.inputParams).then((response) => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("first_name", response.data.first_name);
        localStorage.setItem("profile_picture", response.data.profile_picture);
        localStorage.setItem("latitude", response.data.latitude);
        localStorage.setItem("longitude", response.data.longitude);
        this.$parent.loginCheck();
        this.$parent.friendRequestCount();
        this.$router.push("/find-friends");
      });
    },
  },
};
</script>
