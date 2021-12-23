<template>
  <div id="create">
    <main id="main">
      <section
        class="container d-flex flex-column align-items-center"
        data-aos="fade-up"
      >
        <div class="container" id="users-container">
          <div class="row">
            <div class="col-4" id="col-left">
              <div class="section-title">
                <h2>Your friends</h2>
              </div>
              <div
                class="row d-flex align-items-center"
                v-for="friend in $parent.friends"
                :key="friend.id"
              >
                <div class="col-2">
                  <button
                    class="btn btn-outline-danger"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#friendModal"
                    @click="currentFriend = friend"
                  >
                    <i class="bi bi-x-circle-fill"></i>
                  </button>
                </div>
                <div class="col-6">
                  <img
                    :src="friend.profile_picture"
                    alt=""
                    class="find-friend profile-pic rounded"
                  />
                </div>
                <div class="col-4">
                  {{ friend.first_name }}
                  <span id="user-id">#{{ friend.id }}</span>
                  <br />
                </div>
                <div>
                  <hr />
                </div>
              </div>
            </div>
            <div class="col-8" id="col-left">
              <div class="section-title">
                <h2>Friend Requests</h2>
              </div>
              <div
                v-if="friendRequests.length === 0"
                class="d-flex justify-content-center"
              >
                No friend requests!
              </div>
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
                  <h5 style="text-align: center">
                    Added {{ request.requester.first_name }} as a friend!
                  </h5>
                  Go ahead and send them a message (bottom right button)
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
                <div
                  class="
                    alert alert-secondary alert-dismissible
                    fade
                    show
                    d-none
                  "
                  role="alert"
                  :id="`ignore-${request.requester.id}`"
                >
                  <h5 style="text-align: center">
                    Ignored {{ request.requester.first_name }}'s request
                  </h5>

                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
                <div
                  class="alert alert-danger alert-dismissible fade show d-none"
                  role="alert"
                  :id="`block-${request.requester.id}`"
                >
                  <h5 style="text-align: center">
                    {{ request.requester.first_name }} is blocked from sending
                    you messages or requests.
                  </h5>

                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
                <!-- end alerts -->

                <!-- friend requester user -->
                <div
                  class="container d-flex flex-column align-items-center"
                  :id="`user-${request.requester.id}`"
                >
                  <img
                    :src="request.requester.profile_picture"
                    alt=""
                    id="profile-pic"
                    class="find-friend profile-pic rounded"
                  />
                  <div>
                    {{ request.requester.first_name }}
                    <span id="user-id">#{{ request.requester.id }}</span>
                  </div>
                  <div>
                    {{ request.requester.about_me }}
                  </div>
                  <div style="color: gray">
                    Distance from you: ~{{ request.requester.distance }} miles
                  </div>
                  <div style="color: gray">
                    Age: {{ request.requester.age }}
                  </div>
                  <div>
                    <button
                      @click="acceptRequest(request)"
                      class="btn btn-outline-success"
                      type="button"
                    >
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
                  <li
                    v-for="format in request.requester.favoriteformats"
                    v-bind:key="`format-${format.id}`"
                  >
                    {{ format.format }}
                  </li>
                  <br />
                </div>
                <!-- end friend requester user -->
              </div>
            </div>
          </div>
        </div>
        <!-- end list -->
      </section>

      <!-- Friend Modal -->
      <div
        class="modal fade"
        id="friendModal"
        tabindex="-1"
        aria-labelledby="friendModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="friendModalLabel">
                Do you want to un-friend, or block this user?
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-danger"
                data-bs-dismiss="modal"
                @click="blockFriend(currentFriend)"
              >
                Block user
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
                @click="unfriend(currentFriend)"
              >
                Unfriend
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- End friend modal -->

      <!-- Request Modal -->
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
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
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
// I'm curious why you're using axios for your own api requests,
// but fetch() for the 3rd party api requests (as in CreateAccount)
import distance from "@turf/distance";

export default {
  data: function () {
    return {
      friendRequests: {},
      currentRequest: {},
      currentFriend: {},
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
        // console.log("friend requests", this.friendRequests);
      });
    },

    acceptRequest: function (request) {
      let params = { status: "Accepted" };
      axios.patch(`/relationships/${request.id}`, params).then(() => {
        // console.log(response.data);
        this.$parent.friendRequestCount();
        this.$parent.importFriends();
        // console.log("the resquester id: ", request.requester.id);
        let user = document.getElementById(`user-${request.requester.id}`);

        user.classList.add("d-none");
        let alert = document.getElementById(`accept-${request.requester.id}`);
        alert.classList.remove("d-none");
        // console.log("user", user);
        // console.log("alert", alert);
      });
    },
    ignoreRequest: function (request) {
      let params = { status: "Ignored" };
      axios.patch(`/relationships/${request.id}`, params).then(() => {
        // console.log(response.data);
        this.$parent.friendRequestCount();
        // console.log("the resquester id: ", request.requester.id);
        let user = document.getElementById(`user-${request.requester.id}`);

        user.classList.add("d-none");
        let alert = document.getElementById(`ignore-${request.requester.id}`);
        alert.classList.remove("d-none");
        // console.log("user", user);
        // console.log("alert", alert);
      });
    },
    blockRequest: function (request) {
      let params = { status: "Ignored" };
      axios.patch(`/relationships/${request.id}`, params).then(() => {
        // console.log(response.data);
        this.$parent.friendRequestCount();
        // console.log("the resquester id: ", request.requester.id);
        let user = document.getElementById(`user-${request.requester.id}`);

        user.classList.add("d-none");
        let alert = document.getElementById(`block-${request.requester.id}`);
        alert.classList.remove("d-none");
        // console.log("user", user);
        // console.log("alert", alert);
      });
    },
    unfriend: function (friend) {
      // console.log(friend);
      axios.get("/friendships").then((response) => {
        // console.log(response);
        let theseRelationships = response.data;
        theseRelationships.forEach((relationship) => {
          // console.log(relationship);
          if (
            relationship.responder_id === friend.id ||
            relationship.requester_id === friend.id
          ) {
            // console.log("found the relationship", relationship);
            axios.delete(`/relationships/${relationship.id}`).then(() => {
              // console.log(response);
              this.$parent.importFriends();
            });
          }
        });
      });
    },
    blockFriend: function (friend) {
      // console.log(friend);
      axios.get("/friendships").then((response) => {
        // console.log(response);
        let theseRelationships = response.data;
        theseRelationships.forEach((relationship) => {
          // console.log(relationship);
          if (
            relationship.responder_id === friend.id ||
            relationship.requester_id === friend.id
          ) {
            // console.log("found the relationship", relationship);
            let params = { status: "Blocked" };
            axios
              .patch(`/relationships/${relationship.id}`, params)
              .then(() => {
                // console.log(response);
                this.$parent.importFriends();
              });
          }
        });
      });
    },
  },
};
</script>
