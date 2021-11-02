<template>
  <div id="create">
    <main id="main">
      <section class="container d-flex flex-column align-items-center" data-aos="fade-up">
        <h1>Friend Requests:</h1>
        <div v-if="friendRequests.length === 0">No friend requests!</div>
        <div
          v-for="request in friendRequests"
          v-bind:key="request.id"
          class="container d-flex flex-column align-items-center"
        >
          <!-- alerts -->
          <div
            class="alert alert-success alert-dismissible fade show d-none"
            role="alert"
            :id="`accept-${request.requester.id}`"
          >
            <h5 style="text-align: center">Added {{ request.requester.first_name }} as a friend!</h5>
            Go ahead and send them
            <a href="/chat" class="alert-link">a message.</a>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
          <div
            class="alert alert-secondary alert-dismissible fade show d-none"
            role="alert"
            :id="`ignore-${request.requester.id}`"
          >
            <h5 style="text-align: center">Ignored {{ request.requester.first_name }}'s request</h5>

            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
          <div
            class="alert alert-danger alert-dismissible fade show d-none"
            role="alert"
            :id="`block-${request.requester.id}`"
          >
            <h5 style="text-align: center">
              {{ request.requester.first_name }} is blocked from sending you messages or requests.
            </h5>

            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
          <!-- end alerts -->

          <!-- friend requester user -->
          <div class="container d-flex flex-column align-items-center" :id="`user-${request.requester.id}`">
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
              <button @click="acceptRequest(request)" class="btn btn-outline-success" type="button">
                Accept Friend Request
                <i class="bi bi-check"></i>
              </button>
              <button
                class="btn btn-outline-danger"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#blockIgnoreModal"
                @click="currentRequest = request"
              >
                <i class="bi bi-x-circle-fill"></i>
              </button>
            </div>
            <li v-for="format in request.requester.favoriteformats" v-bind:key="`format-${format.id}`">
              {{ format.format }}
            </li>
            <br />
          </div>
          <!-- end friend requester user -->
        </div>
        <!-- end list -->
      </section>

      <!-- Modal -->
      <div
        class="modal fade"
        id="blockIgnoreModal"
        tabindex="-1"
        aria-labelledby="blockIgnoreModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="blockIgnoreModalLabel">
                Do you want to ignore the request, or block this user?
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-danger"
                data-bs-dismiss="modal"
                @click="blockRequest(currentRequest)"
              >
                Block user
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
                @click="ignoreRequest(currentRequest)"
              >
                Ignore request
              </button>
            </div>
          </div>
        </div>
      </div>
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
      currentRequest: {},
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
        this.friendRequests.forEach((request) => {
          request.requester.distance = this.findDistance(request.requester);
        });
        console.log("friend requests", this.friendRequests);
      });
    },

    acceptRequest: function (request) {
      let params = { status: "Accepted" };
      axios.patch(`/relationships/${request.id}`, params).then((response) => {
        console.log(response.data);
        this.$parent.friendRequestCount();
        console.log("the resquester id: ", request.requester.id);
        let user = document.getElementById(`user-${request.requester.id}`);

        user.classList.add("d-none");
        let alert = document.getElementById(`accept-${request.requester.id}`);
        alert.classList.remove("d-none");
        console.log("user", user);
        console.log("alert", alert);
      });
    },
    ignoreRequest: function (request) {
      let params = { status: "Ignored" };
      axios.patch(`/relationships/${request.id}`, params).then((response) => {
        console.log(response.data);
        this.$parent.friendRequestCount();
        console.log("the resquester id: ", request.requester.id);
        let user = document.getElementById(`user-${request.requester.id}`);

        user.classList.add("d-none");
        let alert = document.getElementById(`ignore-${request.requester.id}`);
        alert.classList.remove("d-none");
        console.log("user", user);
        console.log("alert", alert);
      });
    },
    blockRequest: function (request) {
      let params = { status: "Ignored" };
      axios.patch(`/relationships/${request.id}`, params).then((response) => {
        console.log(response.data);
        this.$parent.friendRequestCount();
        console.log("the resquester id: ", request.requester.id);
        let user = document.getElementById(`user-${request.requester.id}`);

        user.classList.add("d-none");
        let alert = document.getElementById(`block-${request.requester.id}`);
        alert.classList.remove("d-none");
        console.log("user", user);
        console.log("alert", alert);
      });
    },
  },
};
</script>
