<template>
  <div class="find-friends">
    <main id="main">
      <section id="portfolio" class="portfolio">
        <div class="section-title">
          <h2>Search your library for a planeswalker...</h2>
          <p>Here are all the users that you can add as friends! :)</p>
          <p>Click on a user to see more info</p>
        </div>
        <div class="container-fluid d-flex flex-column flex-grow-1 vh-100 overflow-hidden">
          <div class="row flex-grow-1 overflow-hidden" data-aos="fade-up" data-aos-delay="50">
            <div class="col-2 mh-100 overflow-auto py-2">
              <div v-for="format in favorite_formats" :key="format.name">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" :id="format.name" v-model="format.checked" />
                  <label class="form-check-label" :for="format.name">{{ format.name }}</label>
                </div>
              </div>
            </div>
            <div class="col mh-100 overflow-auto py-2">
              <div
                class="row p-1"
                data-bs-toggle="collapse"
                :data-bs-target="`#collapse-${user.id}`"
                aria-expanded="false"
                :aria-controls="`#collapse-${user.id}`"
                v-for="user in users"
                v-bind:key="user.id"
              >
                <div class="col-7">
                  <img :src="user.profile_picture" alt="" class="find-friend profile-pic" />
                </div>
                <div class="col-5">
                  <span style="font-size: 25px">
                    {{ user.first_name }}
                  </span>
                  <span id="user-id">#{{ user.id }}</span>

                  <ul class="list-group">
                    <li v-for="format in user.favoriteformats" class="list-group-item" :key="`format-${format.id}`">
                      {{ format.format }}
                    </li>
                  </ul>
                </div>

                <!-- more info -->
                <div class="collapse" :id="`collapse-${user.id}`">
                  <div class="card card-body">
                    {{ user.about_me }}
                    <div>
                      <div style="color: gray">Distance from you: ~{{ user.distance }} miles</div>
                      <div style="color: gray">Age: {{ user.age }} miles</div>
                      <br />
                      <div>
                        <button @click="addFriend(user)" class="btn btn-outline-danger">
                          Friend Request {{ user.first_name }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-4 mh-100 overflow-auto py-2">
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
              <div>Here's all the map info</div>
            </div>
          </div>
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
      users: [],
      favorite_formats: [
        { id: 1, name: "Commander (EDH)", checked: false, user_id: localStorage.user_id },
        { id: 2, name: "Standard", checked: false, user_id: localStorage.user_id },
        { id: 3, name: "Draft / Cube", checked: false, user_id: localStorage.user_id },
        { id: 4, name: "Modern", checked: false, user_id: localStorage.user_id },
        { id: 5, name: "Pauper", checked: false, user_id: localStorage.user_id },
        { id: 6, name: "Pioneer", checked: false, user_id: localStorage.user_id },
        { id: 7, name: "Brawl", checked: false, user_id: localStorage.user_id },
        { id: 8, name: "Historic", checked: false, user_id: localStorage.user_id },
        { id: 9, name: "Legacy", checked: false, user_id: localStorage.user_id },
        { id: 10, name: "Vintage", checked: false, user_id: localStorage.user_id },
      ],
      user: this.$parent.user,
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
        // console.log(response.data);

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
