<template>
  <div class="find-friends">
    <h1>Welcome to Playgroup Tutor!</h1>
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
  </div>
</template>

<style>
img {
  width: 200px;
}
</style>

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
          alert("You need to log in first!!");
        });
    },
  },
};
</script>
