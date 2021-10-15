<template>
  <div class="find-friends">
    <h1>Welcome to Playgroup Tutor!</h1>
    <div v-for="user in users" v-bind:key="user.id">
      {{ user }}
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      users: [],
    };
  },
  created: function () {
    this.usersIndex();
  },
  methods: {
    usersIndex: function () {
      axios.get("/users").then((response) => {
        console.log(response);
        this.users = response.data;
      });
    },
  },
};
</script>
