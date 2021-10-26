<template>
  <div>
    <h1>Friend Requests:</h1>
    <div v-if="friendRequests.length === 0">No friend requests!</div>
    <div v-for="request in friendRequests" v-bind:key="request.id">
      {{ request.requester.first_name }}
      <span id="tag">#{{ request.requester.id }}</span>
      <div>
        <img :src="request.requester.profile_picture" alt="" />
      </div>
      {{ request.requester.about_me }}
      <div>distance: {{ request.requester.distance }} miles</div>
      <button @click="acceptRequest(request)">Accept Friend Request!</button>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import distance from "@turf/distance";

export default {
  data: function () {
    return {
      friendRequests: {},
    };
  },
  created() {
    this.loadRequests();
  },
  methods: {
    findDistance: function (user) {
      var from = [user.latitude, user.longitude];
      var to = [localStorage.latitude, localStorage.longitude];
      var options = { units: "miles" };
      return distance(from, to, options).toFixed(1);
    },

    loadRequests: function () {
      axios.get("/friend-requests").then((response) => {
        this.friendRequests = response.data;
        console.log(response.data);
        this.friendRequests.forEach((request) => {
          request.requester.distance = this.findDistance(request.requester);
        });
      });
    },

    acceptRequest: function (request) {
      let params = { status: "Accepted" };
      axios.patch(`/relationships/${request.id}`, params).then((response) => {
        console.log(response.data);
      });
    },
  },
};
</script>
