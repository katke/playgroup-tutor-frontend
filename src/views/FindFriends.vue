<template>
  <main id="main">
    <section id="find-friends" class="find-friends">
      <div class="container">
        <div class="row">
          <div class="section-title">
            <h2>Search your library for a planeswalker...</h2>

            <label for="customRange1" class="form-label">
              Showing all users ({{ filteredUsers.length }}) within
              <input type="number" style="color: blue; max-width: 50px" v-model="distance" />
              miles
            </label>
            <div>
              <input type="range" class="form-range" id="customRange1" v-model="distance" style="max-width: 300px" />
            </div>
            <div class="form-check">
              <input class="form-check-inline" type="checkbox" value="" id="any-distance" v-model="anyDistance" />
              <label class="form-check-label" for="any-distance">Any distance ({{ rawUsers.length }})</label>
            </div>
          </div>
        </div>

        <div class="row" data-aos="fade-up" data-aos-delay="50">
          <!-- left column -->
          <div class="col-2" id="col-left">
            <h2>Filters</h2>
            <div class="form-check" @click="filterFormats(allBox)">
              <input
                v-model="formats.all"
                class="form-check-input"
                type="checkbox"
                value=""
                checked
                id="all-formats"
                data-filter="*"
                disabled
              />
              <label class="form-check-label" for="all-formats">All formats</label>
            </div>
            <hr />
            <!-- every format -->
            <div>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  value=""
                  v-model="formats.Commander"
                  id="check-Commander"
                  @click="filterFormats(!allBox)"
                />
                <label for="check-Commander" class="form-check-label">Commander / EDH</label>
              </div>
              <div class="form-check">
                <input
                  @click="filterFormats(!allBox)"
                  type="checkbox"
                  class="form-check-input"
                  value=""
                  v-model="formats.Standard"
                  id="check-Standard"
                />
                <label for="check-Standard" class="form-check-label">Standard</label>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  @click="filterFormats(!allBox)"
                  class="form-check-input"
                  value=""
                  v-model="formats.Cube"
                  id="check-Draft"
                />
                <label for="check-Draft" class="form-check-label">Cube / Draft</label>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  @click="filterFormats(!allBox)"
                  class="form-check-input"
                  value=""
                  v-model="formats.Modern"
                  id="check-Modern"
                />
                <label for="check-Modern" class="form-check-label">Modern</label>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  @click="filterFormats(!allBox)"
                  class="form-check-input"
                  value=""
                  v-model="formats.Pauper"
                  id="check-Pauper"
                />
                <label for="check-Pauper" class="form-check-label">Pauper</label>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  @click="filterFormats(!allBox)"
                  class="form-check-input"
                  value=""
                  v-model="formats.Pioneer"
                  id="check-Pioneer"
                />
                <label for="check-Pioneer" class="form-check-label">Pioneer</label>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  @click="filterFormats(!allBox)"
                  class="form-check-input"
                  value=""
                  v-model="formats.Brawl"
                  id="check-Brawl"
                />
                <label for="check-Brawl" class="form-check-label">Brawl</label>
              </div>
              <div class="form-check">
                <input
                  @click="filterFormats(!allBox)"
                  type="checkbox"
                  class="form-check-input"
                  value=""
                  v-model="formats.Historic"
                  id="check-Historic"
                />
                <label for="check-Historic" class="form-check-label">Historic</label>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  @click="filterFormats(!allBox)"
                  class="form-check-input"
                  value=""
                  v-model="formats.Legacy"
                  id="check-Legacy"
                />
                <label for="check-Legacy" class="form-check-label">Legacy</label>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  @click="filterFormats(!allBox)"
                  class="form-check-input"
                  value=""
                  v-model="formats.Vintage"
                  id="check-Vintage"
                />
                <label for="check-Vintage" class="form-check-label">Vintage</label>
              </div>
            </div>
          </div>

          <!-- right column -->
          <div class="col" id="col-right">
            <div class="row">
              <div
                v-for="user in filteredUsers"
                class="col-lg-4 col-md-6 col-sm-12"
                data-bs-toggle="collapse"
                :data-bs-target="`#collapse-${user.id}`"
                aria-expanded="false"
                :aria-controls="`#collapse-${user.id}`"
                v-bind:key="user.id"
              >
                <div class="container" id="users-container">
                  <div class="row">
                    <div class="col-7">
                      <img :src="user.profile_picture" alt="" class="find-friend profile-pic" />
                    </div>
                    <div class="col-5">
                      <span style="font-size: 20px">
                        {{ user.first_name }}
                      </span>
                      <span id="user-id">#{{ user.id }}</span>
                    </div>
                    <div class="row">
                      <ul class="list-group">
                        <li class="list-group-item" v-for="favformat in user.favoriteformats" :key="favformat.id">
                          {{ favformat.format }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <!-- more info -->
                <div class="collapse" :id="`collapse-${user.id}`">
                  <div class="card card-body">
                    {{ user.about_me }}
                    <hr />
                    <div>
                      <div style="color: gray">Distance from you: ~{{ user.distance }} miles</div>
                      <div style="color: gray">Age: {{ user.age }}</div>
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
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style></style>

<script>
import axios from "axios";
import distance from "@turf/distance";

export default {
  data: function () {
    return {
      allBox: true,
      rawUsers: [],
      originalUsers: [],
      anyDistance: false,
      formats: {
        all: true,
        Commander: false,
        Standard: false,
        Cube: false,
        Modern: false,
        Pauper: false,
        Pioneer: false,
        Brawl: false,
        Historic: false,
        Legacy: false,
        Vintage: false,
      },
      user: this.$parent.user,
      distance: 15,
    };
  },
  created: function () {
    this.usersIndex();
  },
  computed: {
    filteredUsers: function () {
      if (this.anyDistance) {
        return this.rawUsers;
      } else {
        let distanced = this.rawUsers.filter((user) => {
          if (parseFloat(user.distance) <= parseFloat(this.distance)) {
            return user;
          }
        });
        return distanced;
      }
    },
  },
  methods: {
    filterFormats: function (chosenBox) {
      setTimeout(() => {
        if (chosenBox === true) {
          for (var key in this.formats) {
            this.formats[key] = false;
            let allBoxElement = document.getElementById("all-formats");
            allBoxElement.setAttribute("disabled", "disabled");
            this.formats.all = true;
          }
        } else if (Object.values(this.formats).every((v) => v === false)) {
          this.formats.all = true;
          this.formats["all"] = true;
          let allBoxElement = document.getElementById("all-formats");
          allBoxElement.setAttribute("disabled", "disabled");
          this.formats.all = true;
        } else {
          let allBoxElement = document.getElementById("all-formats");
          allBoxElement.removeAttribute("disabled");
          this.formats.all = false;
        }
      }, 50);

      setTimeout(() => {
        if (this.formats.all === true) {
          var arrayOfChosenFormats = [
            "Commander / EDH",
            "Standard",
            "Cube / Draft",
            "Modern",
            "Pauper",
            "Pioneer",
            "Brawl",
            "Historic",
            "Legacy",
            "Vintage",
          ];
        } else {
          arrayOfChosenFormats = [];
          for (var key in this.formats) {
            if (this.formats[key] === true) {
              if (key === "Commander") {
                arrayOfChosenFormats.push("Commander / EDH");
              } else if (key === "Cube") {
                arrayOfChosenFormats.push("Cube / Draft");
              } else {
                arrayOfChosenFormats.push(key);
              }
            }
          }
        }
        this.rawUsers = this.originalUsers;
        this.rawUsers = this.rawUsers.filter((user) => {
          let arr2 = [];
          user.favoriteformats.forEach((formatHash) => {
            arr2.push(formatHash.format);
          });
          let test2 = arrayOfChosenFormats.some((ai) => arr2.includes(ai));
          return test2;
        });
      }, 50);
    },
    findDistance: function (user) {
      var from = [user.latitude, user.longitude];
      var to = [localStorage.latitude, localStorage.longitude];
      var options = { units: "miles" };
      return distance(from, to, options).toFixed(1);
    },
    usersIndex: function () {
      axios.get("/users").then((response) => {
        this.rawUsers = response.data;
        this.originalUsers = response.data;
        // console.log(response.data);

        // deletes yourself from the array of users
        for (var index = 0; index < this.rawUsers.length; index++) {
          if (this.rawUsers[index].id == this.$parent.id) {
            this.rawUsers.splice(index, 1);
            this.originalUsers.splice(index, 1);
          }
          this.$parent.friends.forEach((friend) => {
            if (this.rawUsers[index].id == friend.id) {
              this.rawUsers.splice(index, 1);
              this.originalUsers.splice(index, 1);
            }
          });
        }

        console.log(this.user.relationships);
        console.log(this.user);

        // calculates all the distances
        this.rawUsers.forEach((user) => {
          user.distance = this.findDistance(user);
        });

        // sorts by distance
        // this.rawUsers.sort(function (a, b) {
        //   return a.distance - b.distance;
        // });
      });
    },
    importUser: function () {
      axios.get(`/users/${localStorage.user_id}`).then((response) => {
        this.user = response.data;
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
