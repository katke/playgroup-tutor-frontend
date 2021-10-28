<template>
  <div class="find-friends">
    <!-- ======= Services Section ======= -->
    <section id="services" class="services">
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>Search your library for a planeswalker...</h2>
          <p>
            Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint
            consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit
            in iste officiis commodi quidem hic quas.
          </p>
        </div>

        <div class="row" data-aos="fade-up" data-aos-delay="50">
          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" v-for="user in users" v-bind:key="user.id">
            <div class="icon-box">
              <h4>
                <a href="">{{ user.first_name }}</a>
              </h4>
              <div>
                <img :src="user.profile_picture" alt="" id="profile-pic" />
              </div>
              <p>{{ user.about_me }}</p>
              <p>Distance from you: {{ user.distance }} miles</p>
              <li v-for="format in user.favoriteformats" v-bind:key="`format-${format.id}`">
                {{ format.format }}
              </li>
            </div>
          </div>
        </div>
      </div>
    </section>
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
        console.log(response.data);

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
