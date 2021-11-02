<template>
  <div id="create">
    <main id="main">
      <section class="container d-flex flex-column align-items-center">
        <h1>Friend Requests:</h1>
        <div v-if="friendRequests.length === 0">No friend requests!</div>
        <div
          v-for="request in friendRequests"
          v-bind:key="request.id"
          class="container d-flex flex-column align-items-center"
          data-aos="fade-up"
        >
          <img :src="request.requester.profile_picture" alt="" id="profile-pic" />
          <div>
            {{ request.requester.first_name }}
            <span id="user-id">#{{ request.requester.id }}</span>
          </div>
          <div>
            {{ request.requester.about_me }}
          </div>
          <div>distance: {{ request.requester.distance }} miles</div>
          <div>
            <button @click="acceptRequest(request)" class="btn-about">Accept Friend Request!</button>
          </div>
          <li v-for="format in request.requester.favoriteformats" v-bind:key="`format-${format.id}`">
            {{ format.format }}
          </li>
          <br />
        </div>
      </section>
    </main>
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
      for (var index = 0; index < this.friendRequests.length; index++) {
        if (this.friendRequests[index].id == request.id) {
          this.friendRequests.splice(index, 1);
        }
      }
      axios.patch(`/relationships/${request.id}`, params).then((response) => {
        console.log(response.data);
        this.$parent.friendRequestCount();
      });
    },
  },
};
</script>
