<template>
  <div class="find-friends">
    <h1>Welcome to Playgroup Tutor!</h1>
    {{ distance }}

    <div v-for="user in users" v-bind:key="user.id">
      {{ user.first_name }}
      <div>
        <img :src="user.profile_picture" alt="" />
      </div>
      {{ user.about_me }}
      <div>
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
export default {
  data: function () {
    return {
      users: [],
      distance: 0,
    };
  },
  created: function () {
    this.usersIndex();
    this.findDistance();
  },
  methods: {
    findDistance: function () {
      var from = [18.180555, -66.749961];
      var to = [18.361945, -67.175597];
      var options = { units: "miles" };
      this.distance = distance(from, to, options);

      // this.distance = turf.distance(from, to, options);
    },
    usersIndex: function () {
      axios.get("/users").then((response) => {
        console.log(response);
        this.users = response.data;
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
