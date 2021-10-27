<template>
  <div class="home">
    <!-- ======= Hero Section ======= -->
    <section id="hero" class="d-flex align-items-center">
      <div class="container d-flex flex-column align-items-center" data-aos="zoom-in" data-aos-delay="100">
        <h1>Welcome to Playgroup Tutor!</h1>
        <h2>Find nearby MTG players and form new playgroups</h2>
        <button @click="showLogIn()" class="btn-about">Log in</button>
        <div v-if="seeLogIn">
          <div>
            Email:
            <input type="text" v-model="inputParams.email" />
          </div>
          <div>
            Password:
            <input type="text" v-model="inputParams.password" />
          </div>
          <div>
            <button @click="signIn()">Log in</button>
          </div>
        </div>
        <a href="/create-account" class="btn-about">Create Account</a>
      </div>
    </section>
    <!-- End Hero -->
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      inputParams: {
        email: "wanda@test.com",
        password: "password",
      },
      seeLogIn: false,
    };
  },
  created: function () {},
  methods: {
    showLogIn: function () {
      this.seeLogIn = !this.seeLogIn;
    },
    showCreateAccount: function () {
      this.$router.push("/create-account");
    },
    signIn: function () {
      console.log(this.inputParams);
      axios.post("/sessions", this.inputParams).then((response) => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("first_name", response.data.first_name);
        localStorage.setItem("profile_picture", response.data.profile_picture);
        localStorage.setItem("latitude", response.data.latitude);
        localStorage.setItem("longitude", response.data.longitude);
        console.log(response.data, "Success!");
        this.$router.push("/find-friends");
      });
    },
  },
};
</script>
