<template>
  <div class="find-friends">
    <h1>Welcome to Playgroup Tutor!</h1>
    <h3>Search your library for a planeswalker...</h3>
    <div v-for="user in users" v-bind:key="user.id">
      {{ user.first_name }}
      <div>
        <img :src="user.profile_picture" alt="" />
      </div>
      {{ user.about_me }}
      <div>
        <div>distance: {{ user.distance }} miles</div>
        <button @click="addFriend(user)">Add {{ user.first_name }} as a friend</button>
      </div>
      <br />
    </div>
    <div></div>
  </div>
</template>

<style>
img {
  width: 200px;
}
</style>

<script>
import axios from "axios";
import distance from "@turf/distance";
// import { component } from "vue/types/umd";
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
    findDistance: function (user) {
      var from = [user.latitude, user.longitude];
      var to = [localStorage.latitude, localStorage.longitude];
      var options = { units: "miles" };
      return distance(from, to, options).toFixed(1);
    },
    usersIndex: function () {
      axios.get("/users").then((response) => {
        this.users = response.data;
        this.users.forEach((user) => {
          user.distance = this.findDistance(user);
        });
        this.users.sort((a, b) => (a.distance > b.distance ? 1 : b.distance > a.distance ? -1 : 0));
      });
    },
    addFriend: function (requested_user) {
      var responder = {};
      responder["responder_id"] = requested_user.id;
      axios
        .post("/relationships", responder)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
          alert(error.response.data.errors);
        });
    },
  },
};
</script>
