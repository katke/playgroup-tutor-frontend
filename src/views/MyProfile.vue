<template>
  <div class="my-profile">
    <main id="main">
      <!-- ======= About Section ======= -->
      <section id="about" class="about">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Your account</h2>
          </div>

          <div class="row">
            <!-- profile picture section -->
            <form class="col-lg-4" v-on:submit.prevent="scryfallSearch(scryfallName)">
              <div>
                <h3><strong>Profile Picture:</strong></h3>
              </div>
              <img v-bind:src="user.profile_picture" alt="" id="profile-pic" />
              <div>
                <hr />
                <strong>Search for your favorite card...</strong>
                <div class="input-group">
                  <input type="text" v-model="scryfallName" class="form-control" />
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#cardList">
                      Search
                    </button>
                  </div>
                </div>
                <br />
                <strong>Or choose your...</strong>
                <!-- Color choosing dropdown  -->
                <div class="input-group mb-3">
                  <button
                    class="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Favorite Color
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <span
                        class="dropdown-item"
                        @click="pictureEdit(color.img)"
                        v-for="color in colors"
                        :key="`color-id-${color.id}`"
                      >
                        {{ color.name }}
                      </span>
                    </li>
                  </ul>
                </div>
                <!-- Color choosing dropdown  -->
                <!-- guild choosing dropdown  -->
                <div class="input-group mb-3">
                  <button
                    class="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Ravnica Guild
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a
                        class="dropdown-item"
                        @click="pictureEdit(guild.img)"
                        v-for="guild in guilds"
                        :key="`guild-id-${guild.id}`"
                      >
                        {{ guild.name }}
                      </a>
                    </li>
                  </ul>
                </div>
                <!-- guild choosing dropdown  -->
              </div>
            </form>
            <!-- end profile picture section -->

            <!-- form section -->
            <div class="col-lg-8 pt-4 pt-lg-0 content">
              <div v-if="!editing.email" @click="showUpdate(`email`)">
                <h3>Email: {{ user.email }}</h3>
              </div>
              <div v-if="editing.email" class="input-group">
                <h3>Email:</h3>

                <h3><input v-model="user.email" class="form-control" type="text" id="emailForm" /></h3>
                <div class="input-group-prepend">
                  <button type="button" class="btn btn-success" @click="saveEdit(`email`)">
                    <i class="bi bi-check" style="color: white"></i>
                  </button>
                  <button type="button" class="btn btn-danger" @click="disableEditing(`email`)">
                    <i class="bi bi-x" style="color: white"></i>
                  </button>
                </div>
              </div>
              <h3>Password: ********</h3>
              <hr />
              <div class="row">
                <div class="col-lg-6">
                  <ul>
                    <li>
                      <span v-if="!editing.first_name" @click="showUpdate(`first_name`)">
                        <strong>First Name:</strong>
                        {{ user.first_name }}
                      </span>
                      <div v-if="editing.first_name" class="input-group">
                        <strong>First Name:</strong>
                        <input v-model="user.first_name" type="text" class="form-control" id="first_nameForm" />
                        <div class="input-group-prepend">
                          <button type="button" class="btn btn-success" @click="saveEdit(`first_name`)">
                            <i class="bi bi-check" style="color: white"></i>
                          </button>
                          <button type="button" class="btn btn-danger" @click="disableEditing(`first_name`)">
                            <i class="bi bi-x" style="color: white"></i>
                          </button>
                        </div>
                        <div class="invalid-feedback">First name can't be blank</div>
                        <div class="valid-feedback">Looks good!</div>
                      </div>
                    </li>
                    <li>
                      <!-- need to make the other forms just like the first name one ^ -->
                      <span v-if="!editing.zipcode" @click="showUpdate(`zipcode`)">
                        <strong>ZIP Code:</strong>
                        {{ user.zipcode }}
                      </span>
                      <div v-if="editing.zipcode" class="input-group">
                        <strong>ZIP Code:</strong>

                        <input v-model="user.zipcode" type="text" class="form-control" id="zipcodeForm" />
                        <div class="input-group-prepend">
                          <button type="button" class="btn btn-success" @click="saveEdit(`zipcode`)">
                            <i class="bi bi-check" style="color: white"></i>
                          </button>
                          <button type="button" class="btn btn-danger" @click="disableEditing(`zipcode`)">
                            <i class="bi bi-x" style="color: white"></i>
                          </button>
                        </div>
                        <div class="invalid-feedback">"ZIP code must be a valid 5 digit entry"</div>
                        <div class="valid-feedback">Looks good!</div>
                      </div>
                    </li>

                    <li>
                      <span v-if="!editing.about_me" @click="showUpdate(`about_me`)">
                        <strong>A little about yourself:</strong>
                        {{ user.about_me }}
                      </span>
                      <div v-if="editing.about_me">
                        <strong>A little about yourself:</strong>
                        <textarea v-model="user.about_me" class="form-control" rows="7" id="about_meForm" />
                        <div class="input-group-prepend">
                          <button type="button" class="btn btn-success" @click="saveEdit(`about_me`)">
                            <i class="bi bi-check" style="color: white"></i>
                          </button>
                          <button type="button" class="btn btn-danger" @click="disableEditing(`about_me`)">
                            <i class="bi bi-x" style="color: white"></i>
                          </button>
                        </div>
                        <div class="invalid-feedback">About me can't be blank</div>
                        <div class="valid-feedback">Looks good!</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="col-lg-6">
                  <ul>
                    <li>
                      <span v-if="!editing.age" @click="showUpdate(`age`)">
                        <strong>Age:</strong>
                        {{ user.age }}
                      </span>
                      <div v-if="editing.age" class="input-group">
                        <strong>Age:</strong>
                        <input v-model="user.age" type="number" class="form-control" id="ageForm" />
                        <div class="input-group-prepend">
                          <button type="button" class="btn btn-success" @click="saveEdit(`age`)">
                            <i class="bi bi-check" style="color: white"></i>
                          </button>
                          <button type="button" class="btn btn-danger" @click="disableEditing(`age`)">
                            <i class="bi bi-x" style="color: white"></i>
                          </button>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <strong>Favorite Formats:</strong>
                      </div>
                      <div v-for="format in favorite_formats" v-bind:key="format.name">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            @click="updateFormats(format)"
                            v-bind:id="format.name"
                            v-model="format.checked"
                          />
                          <label class="form-check-label" v-bind:for="format.name">{{ format.name }}</label>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- end form section -->
          </div>
        </div>
      </section>
    </main>

    <!-- Modal -->
    <div class="modal fade" id="cardList" tabindex="-1" aria-labelledby="cardListLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="cardListLabel">Which card did you mean?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="container-fluid position-relative position-trbl-0 overflow-hidden h-100">
              <div class="row" id="card-picker">
                <div class="col-5">
                  <div class="col-inner">
                    <div v-for="card in cards" v-bind:key="card.id" @click="selectCard(card)">{{ card.name }}</div>
                  </div>
                </div>
                <div class="col-7">
                  <div class="col-innner">
                    <img :src="picturePreview" alt="" id="picture-preview" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button
              class="btn btn-primary"
              @click="
                pictureEdit(picturePreview);
                cards = [];
              "
              data-bs-dismiss="modal"
            >
              Save it!
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- END MODAL -->
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import VuejsDialog from "vuejs-dialog";
// import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'; // only needed in custom components

// include the default style
import "vuejs-dialog/dist/vuejs-dialog.min.css";

// Tell Vue to install the plugin.
Vue.use(VuejsDialog, {});
export default {
  data() {
    return {
      showModal: false,
      user: {},
      cards: [],
      picturePreview: "",
      scryfallName: "",
      editing: {
        about_me: false,
        age: false,
        email: false,
        first_name: false,
        zipcode: false,
      },
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
      colors: [
        { id: 1, name: "White", img: "assets/img/icons/W.png" },
        { id: 2, name: "Blue", img: "/assets/img/icons/U.png" },
        { id: 3, name: "Black", img: "/assets/img/icons/B.png" },
        { id: 4, name: "Red", img: "/assets/img/icons/R.png" },
        { id: 5, name: "Green", img: "/assets/img/icons/G.png" },
        { id: 6, name: "Colorless", img: "/assets/img/icons/C.png" },
      ],
      guilds: [
        { id: 1, name: "Azorius", img: "assets/img/icons/Azorius_Logo.png" },
        { id: 2, name: "Dimir", img: "assets/img/icons/Dimir_Logo.png" },
        { id: 3, name: "Rakdos", img: "assets/img/icons/Rakdos_Logo.png" },
        { id: 4, name: "Gruul", img: "assets/img/icons/Gruul_Logo.png" },
        { id: 5, name: "Selesnya", img: "assets/img/icons/Selesnya_Logo.png" },
        { id: 6, name: "Orzhov", img: "assets/img/icons/Orzhov_Logo.png" },
        { id: 7, name: "Izzet", img: "assets/img/icons/Izzet_Logo.png" },
        { id: 8, name: "Golgari", img: "assets/img/icons/Golgari_Logo.png" },
        { id: 9, name: "Boros", img: "assets/img/icons/Boros_Logo.png" },
        { id: 10, name: "Simic", img: "assets/img/icons/Simic_Logo.png" },
      ],
    };
  },
  created() {
    this.importCurrentUser();
  },
  methods: {
    testModal: function () {
      this.showModal = true;
      console.log("it worked?");
    },
    importCurrentUser: function () {
      this.user = axios.get(`/users/${localStorage.user_id}`).then((response) => {
        this.user = response.data;
        axios.get("/favoriteformats").then((response) => {
          this.favorite_formats.forEach((format) => {
            response.data.forEach((myformat) => {
              if (format.name === myformat.format) {
                format.checked = true;
                format.id = myformat.id;
                format.user_id = localStorage.user_id;
              }
            });
          });
        });
      });
    },
    showUpdate: function (field) {
      this.editing[field] = true;
    },
    disableEditing: function (field) {
      axios.get(`/users/${this.user.id}`).then((response) => {
        this.user[field] = response.data[field];
        this.editing[field] = false;
      });
    },
    saveEdit: function (field) {
      axios
        .patch(`/users/${localStorage.user_id}`, this.user)
        .then(() => {
          this.editing[field] = false;
        })
        .catch((error) => {
          console.log(error);
          let form = document.getElementById(`${field}Form`);
          if (form) {
            form.classList.add("is-invalid");
            form.classList.remove("is-valid");
          }
        });
    },
    scryfallSearch: function (cardName) {
      fetch(`https://api.scryfall.com/cards/search?q=${cardName}`)
        .then((response) => response.json())
        .then((data) => {
          this.cards = data.data;
          this.picturePreview = this.cards[0]["image_uris"]["art_crop"];
        });
    },
    selectCard: function (card) {
      this.picturePreview = card["image_uris"]["art_crop"];
    },
    pictureEdit: function (imageString) {
      console.log(imageString);
      this.user.profile_picture = imageString;
      this.saveEdit(`profile_picture`);
      this.scryfallName = null;
      this.picturePreview = null;
      return false;
    },
    updateFormats: function (format) {
      if (format.checked !== true) {
        axios.post("/favoriteformats", format).then((response) => {
          format.id = response.data.id;
        });
      } else {
        axios.delete(`/favoriteformats/${format.id}`);
        format.id = 0;
      }
    },
  },
};
</script>
