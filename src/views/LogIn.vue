<template>
  <div class="login">
    <h2>Log in</h2>
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
    <div>
      <br />
      <button @click="showCreateAccount()">Wait, I need to make an account first!</button>
    </div>
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
    };
  },
  created: function () {},
  methods: {
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
