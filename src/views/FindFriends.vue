<template>
  <div class="find-friends">
    <h1>Welcome to Playgroup Tutor!</h1>
    <h3>Search your library for a planeswalker...</h3>
    <div v-for="user in users" v-bind:key="user.id">
      {{ user.first_name }}
      <span id="tag">#{{ user.id }}</span>
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
#tag {
  color: lightgray;
}
</style>

<script>
import axios from "axios";
import distance from "@turf/distance";

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

        // deletes yourself from the array of users
        for (var index = 0; index < this.users.length; index++) {
          if (this.users[index].id == localStorage.user_id) {
            this.users.splice(index, 1);
          }
        }

        // calculates all the distances
        this.users.forEach((user) => {
          user.distance = this.findDistance(user);
        });

        // sorts by distance
        this.users.sort(function (a, b) {
          return a.distance - b.distance;
        });
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
