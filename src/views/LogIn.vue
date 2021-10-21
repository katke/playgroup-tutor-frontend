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
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      inputParams: {
        email: "test@gmail.com",
        password: "password",
      },
    };
  },
  created: function () {},
  methods: {
    signIn: function () {
      axios.post("/sessions", this.inputParams).then((response) => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        console.log(response.data, "Success!");
        this.$router.push("/find-friends");
      });
    },
  },
};
</script>
