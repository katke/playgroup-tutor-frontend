<template>
  <div class="my-profile">
    <main id="main">
      <!-- ======= About Section ======= -->
      <section id="about" class="about">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Your account</h2>
          </div>

          <div class="row g-3">
            <!-- profile picture section -->
            <div class="col-lg-4" style="text-align: center">
              <div class="row mb-3">
                <div class="col-12">
                  <div class="content">
                    <h3>Profile Picture</h3>
                  </div>
                  <div>
                    <a :href="cardInfo.scryfall_uri" target="_blank" alt="">
                      {{ cardInfo.name }}
                    </a>
                    <img
                      v-bind:src="user.profile_picture"
                      alt=""
                      id="profile-pic"
                      class="img-fluid centered-element rounded"
                    />
                    <div v-if="cardInfo.name">
                      <span style="font-style: italic"
                        >Artist: {{ cardInfo.artist }}</span
                      >
                    </div>
                  </div>

                  <div>
                    <br />
                    <form
                      v-on:submit.prevent="scryfallSearch(scryfallNameField)"
                    >
                      <strong>Search for your favorite card...</strong>
                      <div class="input-group">
                        <input
                          type="text"
                          v-model="scryfallNameField"
                          class="form-control"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-outline-secondary"
                            data-bs-toggle="modal"
                            data-bs-target="#cardList"
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <strong>Or choose your...</strong>

                <!-- Color Choosing Dropdown  -->
                <div class="col-6">
                  <button
                    class="btn btn-outline-secondary dropdown-toggle float-end"
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
                        @click="iconEdit(color.img)"
                        v-for="color in colors"
                        :key="`color-id-${color.id}`"
                      >
                        {{ color.name }}
                      </span>
                    </li>
                  </ul>
                </div>
                <!-- End Color  -->
                <!-- Guild Choosing Dropdown  -->
                <div class="col-6">
                  <button
                    class="
                      btn btn-outline-secondary
                      dropdown-toggle
                      float-start
                    "
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
                        @click="iconEdit(guild.img)"
                        v-for="guild in guilds"
                        :key="`guild-id-${guild.id}`"
                      >
                        {{ guild.name }}
                      </a>
                    </li>
                  </ul>
                </div>
                <!-- End Guild  -->
              </div>
              <div class="row">
                <div class="col">
                  <button
                    class="btn btn-secondary centered-element"
                    @click="randomScryfall()"
                  >
                    Or a random card!
                  </button>
                </div>
              </div>
            </div>

            <!-- end profile picture section -->

            <!-- form section -->
            <div class="col-lg-8 pt-4 pt-lg-0 content">
              <div v-if="!editing.email" @click="showUpdate(`email`)">
                <h3>Email: {{ user.email }}</h3>
              </div>
              <div v-if="editing.email" class="input-group">
                <h3>Email:</h3>

                <h3>
                  <input
                    v-model="user.email"
                    class="form-control"
                    type="text"
                    id="emailForm"
                  />
                </h3>
                <div class="input-group-prepend">
                  <button
                    type="button"
                    class="btn btn-success"
                    @click="saveEdit(`email`)"
                  >
                    <i class="bi bi-check" style="color: white"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="disableEditing(`email`)"
                  >
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
                      <span
                        v-if="!editing.first_name"
                        @click="showUpdate(`first_name`)"
                      >
                        <strong>First Name:</strong>
                        {{ user.first_name }}
                      </span>
                      <div v-if="editing.first_name" class="input-group">
                        <strong>First Name:</strong>
                        <input
                          v-model="user.first_name"
                          type="text"
                          class="form-control"
                          id="first_nameForm"
                        />
                        <div class="input-group-prepend">
                          <button
                            type="button"
                            class="btn btn-success"
                            @click="saveEdit(`first_name`)"
                          >
                            <i class="bi bi-check" style="color: white"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger"
                            @click="disableEditing(`first_name`)"
                          >
                            <i class="bi bi-x" style="color: white"></i>
                          </button>
                        </div>
                        <div class="invalid-feedback">
                          First name can't be blank
                        </div>
                        <div class="valid-feedback">Looks good!</div>
                      </div>
                    </li>
                    <li>
                      <!-- need to make the other forms just like the first name one ^ -->
                      <span
                        v-if="!editing.zipcode"
                        @click="showUpdate(`zipcode`)"
                      >
                        <strong>ZIP Code:</strong>
                        {{ user.zipcode }}
                      </span>
                      <div v-if="editing.zipcode" class="input-group">
                        <strong>ZIP Code:</strong>

                        <input
                          v-model="user.zipcode"
                          type="text"
                          class="form-control"
                          id="zipcodeForm"
                        />
                        <div class="input-group-prepend">
                          <button
                            type="button"
                            class="btn btn-success"
                            @click="saveEdit(`zipcode`)"
                          >
                            <i class="bi bi-check" style="color: white"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger"
                            @click="disableEditing(`zipcode`)"
                          >
                            <i class="bi bi-x" style="color: white"></i>
                          </button>
                        </div>
                        <div class="invalid-feedback">
                          "ZIP code must be a valid 5 digit entry"
                        </div>
                        <div class="valid-feedback">Looks good!</div>
                      </div>
                    </li>
                    <li>
                      <span v-if="!editing.age" @click="showUpdate(`age`)">
                        <strong>Age:</strong>
                        {{ user.age }}
                      </span>
                      <div v-if="editing.age" class="input-group">
                        <strong>Age:</strong>
                        <input
                          v-model="user.age"
                          type="number"
                          class="form-control"
                          id="ageForm"
                        />
                        <div class="input-group-prepend">
                          <button
                            type="button"
                            class="btn btn-success"
                            @click="saveEdit(`age`)"
                          >
                            <i class="bi bi-check" style="color: white"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger"
                            @click="disableEditing(`age`)"
                          >
                            <i class="bi bi-x" style="color: white"></i>
                          </button>
                        </div>
                      </div>
                    </li>
                    <li>
                      <span
                        v-if="!editing.about_me"
                        @click="showUpdate(`about_me`)"
                      >
                        <strong>A little about yourself:</strong>
                        {{ user.about_me }}
                      </span>
                      <div v-if="editing.about_me">
                        <strong>A little about yourself:</strong>
                        <textarea
                          v-model="user.about_me"
                          class="form-control"
                          rows="7"
                          id="about_meForm"
                        />
                        <div class="input-group-prepend">
                          <button
                            type="button"
                            class="btn btn-success"
                            @click="saveEdit(`about_me`)"
                          >
                            <i class="bi bi-check" style="color: white"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger"
                            @click="disableEditing(`about_me`)"
                          >
                            <i class="bi bi-x" style="color: white"></i>
                          </button>
                        </div>
                        <div class="invalid-feedback">
                          About me can't be blank
                        </div>
                        <div class="valid-feedback">Looks good!</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="col-lg-6">
                  <ul>
                    <li>
                      <div>
                        <strong>Favorite Formats:</strong>
                      </div>
                      <div
                        v-for="format in favorite_formats"
                        v-bind:key="format.name"
                      >
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            @click="updateFormats(format)"
                            v-bind:id="format.name"
                            v-model="format.checked"
                          />
                          <label
                            class="form-check-label"
                            v-bind:for="format.name"
                            >{{ format.name }}</label
                          >
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
    <div
      class="modal fade"
      id="cardList"
      tabindex="-1"
      aria-labelledby="cardListLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="cardListLabel" v-if="!error">
              Which card did you mean?
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" style="height: 60vh">
            <div
              class="
                container-fluid
                d-flex
                flex-column flex-grow-1
                overflow-hidden
              "
            >
              <div class="row flex-grow-1 overflow-hidden" id="card-picker">
                <div class="col-5 overflow-auto py-2">
                  <div
                    class="list-group"
                    id="card-list"
                    role="tablist"
                    v-if="!showSaveButton"
                    style="max-height: 50vh; overflow: auto"
                  >
                    <div
                      class="list-group-item list-group-item-action"
                      data-bs-toggle="list"
                      :href="`#image-${card.id}`"
                      v-for="card in cards"
                      :key="`card-${card.id}`"
                      :id="`card-id-${card.id}`"
                      @click="selectCard(card)"
                      :aria-controls="`list-${card.id}`"
                    >
                      {{ card.name }}
                    </div>
                  </div>
                  <div
                    class="list-group"
                    id="list-tab"
                    role="tablist"
                    v-if="showSaveButton"
                    style="max-height: 50vh; overflow: auto"
                  >
                    <div
                      class="list-group-item list-group-item-action"
                      data-bs-toggle="list"
                      :href="`#image-${card.id}`"
                      v-for="card in cards"
                      :key="`format-${card.id}`"
                      :id="`format-id-${card.id}`"
                      @click="selectCard(card)"
                    >
                      {{ card.set_name }}
                    </div>
                  </div>
                </div>
                <div class="col-7 mh-100 overflow-auto py-2">
                  <div class="tab-content" id="nav-tabContent">
                    <div
                      class="tab-pane fade"
                      role="tabpanel"
                      v-for="card in cards"
                      :key="`img-${card.id}`"
                      :id="`image-${card.id}`"
                    >
                      <img
                        v-if="card.image_uris && card.image_uris.art_crop"
                        :src="card.image_uris.art_crop"
                        alt=""
                        id="picture-preview"
                        class="centered-element rounded"
                      />
                      <img
                        v-if="
                          card.card_faces &&
                          card.card_faces.length > 0 &&
                          card.card_faces[0] &&
                          card.card_faces[0]['image_uris']
                        "
                        :src="card.card_faces[0]['image_uris']['art_crop']"
                        alt=""
                        id="picture-preview"
                        class="centered-element rounded"
                      />
                      <div
                        style="font-style: italic"
                        class="float-end"
                        v-if="card.lang"
                      >
                        Artist: {{ card.artist }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer" v-if="!error">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              v-if="!showSaveButton"
              class="btn btn-primary"
              @click="scryfallFormatSearch(selectedCard.name)"
            >
              Next! Choose which printing...
            </button>
            <button
              v-if="showSaveButton"
              class="btn btn-primary"
              @click="pictureEdit()"
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
      selectedCard: {},
      showSaveButton: false,
      scryfallNameField: "",
      error: false,
      cardInfo: {},
      editing: {
        about_me: false,
        age: false,
        email: false,
        first_name: false,
        zipcode: false,
      },
      favorite_formats: [
        {
          id: 1,
          name: "Commander / EDH",
          checked: false,
          user_id: localStorage.user_id,
        },
        {
          id: 2,
          name: "Standard",
          checked: false,
          user_id: localStorage.user_id,
        },
        {
          id: 3,
          name: "Cube / Draft",
          checked: false,
          user_id: localStorage.user_id,
        },
        {
          id: 4,
          name: "Modern",
          checked: false,
          user_id: localStorage.user_id,
        },
        {
          id: 5,
          name: "Pauper",
          checked: false,
          user_id: localStorage.user_id,
        },
        {
          id: 6,
          name: "Pioneer",
          checked: false,
          user_id: localStorage.user_id,
        },
        { id: 7, name: "Brawl", checked: false, user_id: localStorage.user_id },
        {
          id: 8,
          name: "Historic",
          checked: false,
          user_id: localStorage.user_id,
        },
        {
          id: 9,
          name: "Legacy",
          checked: false,
          user_id: localStorage.user_id,
        },
        {
          id: 10,
          name: "Vintage",
          checked: false,
          user_id: localStorage.user_id,
        },
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
    importCurrentUser: function () {
      this.user = axios
        .get(`/users/${localStorage.user_id}`)
        .then((response) => {
          this.user = response.data;
          // regex is tough, but this lets you find the exact card upon loading
          fetch(
            `https://api.scryfall.com/cards/${
              /.*\/\b(.*).jpg/.exec(this.user.profile_picture)[1]
            }`
          )
            .then((response) => response.json())
            .then((data) => {
              this.cardInfo = data;
            });
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
      this.error = false;
      this.showSaveButton = false;

      // reset all selected items
      let actives = document.getElementsByClassName("active");
      actives.forEach((element) => {
        element.classList.remove("active");
      });

      // selects the loading image
      this.cards = [
        {
          id: 1,
          name: "Loading...",
          image_uris: { art_crop: "/assets/img/loading.gif" },
        },
      ];
      setTimeout(() => {
        let firstCard = document.getElementById(`card-id-${this.cards[0].id}`);
        let firstPicture = document.getElementById(`image-${this.cards[0].id}`);
        firstCard.classList.add("active");
        firstPicture.classList.add("show");
        firstPicture.classList.add("active");
      }, 50);

      fetch(`https://api.scryfall.com/cards/search?q=${cardName}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.object === "list") {
            console.log("data", data);

            // reset all selected items
            let actives = document.getElementsByClassName("active");
            actives.forEach((element) => {
              element.classList.remove("active");
            });
            this.cards = data.data;
            this.selectedCard = this.cards[0];

            setTimeout(() => {
              let firstCard = document.getElementById(
                `card-id-${this.cards[0].id}`
              );
              let firstPicture = document.getElementById(
                `image-${this.cards[0].id}`
              );
              firstCard.classList.add("active");
              firstPicture.classList.add("show");
              firstPicture.classList.add("active");
            }, 50);
          } else {
            this.cards = [
              {
                id: 1,
                name: data.details,
                image_uris: { art_crop: "/assets/img/table-flip.gif" },
              },
            ];
            this.error = true;
          }
        });
    },
    scryfallFormatSearch: function (cardName) {
      this.showSaveButton = true;

      // reset all selected items
      let actives = document.getElementsByClassName("active");
      actives.forEach((element) => {
        element.classList.remove("active");
      });

      // selects the loading image
      this.cards = [
        {
          id: 1,
          name: "Loading...",
          set_name: "Loading...",
          image_uris: { art_crop: "/assets/img/loading.gif" },
        },
      ];

      setTimeout(() => {
        let firstCard = document.getElementById(
          `format-id-${this.cards[0].id}`
        );
        firstCard.classList.add("active");
        let firstPicture = document.getElementById(`image-${this.cards[0].id}`);
        firstPicture.classList.add("show");
        firstPicture.classList.add("active");
      }, 60);

      fetch(`https://api.scryfall.com/cards/named?fuzzy=${cardName}`)
        .then((response) => response.json())
        .then((data) => {
          let formatsearch = data.prints_search_uri;
          setTimeout(() => {
            fetch(formatsearch)
              .then((response) => response.json())
              .then((data) => {
                this.cards = data.data;
                this.selectedCard = this.cards[0];

                setTimeout(() => {
                  let firstCard = document.getElementById(
                    `format-id-${this.cards[0].id}`
                  );
                  firstCard.classList.add("active");
                  let firstPicture = document.getElementById(
                    `image-${this.cards[0].id}`
                  );
                  firstPicture.classList.add("show");
                  firstPicture.classList.add("active");
                }, 60);
              });
          }, 60);
        });
    },
    randomScryfall: function () {
      fetch("https://api.scryfall.com/cards/random")
        .then((response) => response.json())
        .then((data) => {
          this.selectedCard = data;
          this.pictureEdit();
          this.cardInfo = this.selectedCard;
        });
    },
    selectCard: function (card) {
      this.selectedCard = card;
    },
    iconEdit: function (imageString) {
      this.user.profile_picture = imageString;
      this.cardInfo = {};
      axios.patch(`/users/${localStorage.user_id}`, this.user);
    },
    pictureEdit: function () {
      if (this.selectedCard.card_faces) {
        this.user.profile_picture =
          this.selectedCard.card_faces[0]["image_uris"]["art_crop"];
      } else {
        this.user.profile_picture = this.selectedCard["image_uris"]["art_crop"];
      }
      this.cardInfo = this.selectedCard;
      axios.patch(`/users/${localStorage.user_id}`, this.user);
      this.scryfallNameField = null;
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
