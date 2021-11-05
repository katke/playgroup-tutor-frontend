<template>
  <div id="create">
    <main id="main">
      <div class="container d-flex flex-column align-items-center" data-aos="zoom-down">
        <a href="/" class="btn-about">Log in</a>
      </div>
      <section id="about" class="about" data-aos="zoom-up" data-aos-delay="100">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Create your account</h2>
          </div>
          <div class="row g-3">
            <!-- profile picture section -->
            <div class="col-lg-4">
              <div class="row">
                <div class="col-12 mb-3">
                  <form v-on:submit.prevent="scryfallSearch(scryfallName)">
                    <div class="section-title">
                      <h3><strong>Profile Picture</strong></h3>
                    </div>
                    <div class="preview-box">
                      <img
                        :src="inputParams.profile_picture"
                        class="img-fluid centered-element"
                        alt=""
                        id="profile-pic"
                      />
                    </div>
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
                  </form>
                </div>
              </div>
              <div class="row">
                <strong>Or choose your...</strong>
                <!-- Color choosing dropdown  -->
                <div class="col-6 mb-3">
                  <div class="input-group">
                    <button
                      class="btn btn-outline-secondary centered-element dropdown-toggle"
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
                          @click="selectIcon(color)"
                          v-for="color in colors"
                          :key="`color-id-${color.id}`"
                        >
                          {{ color.name }}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- end Color choosing dropdown  -->
                <!-- guild choosing dropdown  -->
                <div class="col-6 mb-3">
                  <div class="input-group">
                    <button
                      class="btn btn-outline-secondary centered-element dropdown-toggle"
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
                          @click="selectIcon(guild)"
                          v-for="guild in guilds"
                          :key="`guild-id-${guild.id}`"
                        >
                          {{ guild.name }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <button class="btn btn-outline-dark centered-element" @click="randomScryfall()">
                    Or a random card!
                  </button>
                </div>
              </div>

              <!-- end guild choosing dropdown  -->
            </div>
            <!-- end profile picture section -->

            <!-- forms section -->
            <form class="col-lg-8 pt-4 pt-lg-0 content" id="signup-form " v-on:submit.prevent="createAccount()">
              <div class="row">
                <div class="col">
                  <h3>
                    <label for="EmailForm" class="form-label">Email</label>
                  </h3>

                  <input type="text" class="form-control" id="EmailForm" v-model="inputParams.email" />
                  <div class="invalid-feedback">{{ errors["Email"] }}.</div>
                  <div class="valid-feedback">Looks good!</div>
                </div>
                <div class="col">
                  <h3>
                    <label for="PasswordForm" class="form-label">Password</label>
                  </h3>

                  <input type="text" class="form-control" id="PasswordForm" v-model="inputParams.password" />
                  <div class="invalid-feedback">{{ errors["Password"] }}.</div>
                  <div class="valid-feedback">Looks good!</div>
                </div>
              </div>
              <br />
              <!-- <hr /> -->
              <div class="row">
                <div class="col-lg-6">
                  <ul>
                    <li>
                      <strong><label for="FirstForm" class="form-label">First Name</label></strong>
                      <input type="text" class="form-control" id="FirstForm" v-model="inputParams.first_name" />
                      <div class="invalid-feedback">{{ errors["First"] }}.</div>
                      <div class="valid-feedback">Looks good!</div>
                    </li>
                    <li>
                      <strong><label for="ZIPForm" class="form-label">Zip Code</label></strong>
                      <input type="text" class="form-control" id="ZIPForm" v-model="inputParams.zipcode" />
                      <div class="invalid-feedback">{{ errors["ZIP"] }}</div>
                      <div class="valid-feedback">Looks good!</div>
                    </li>
                    <div class="mb-3">
                      <label for="AboutForm" class="form-label">
                        <strong>A little about yourself</strong>
                      </label>
                      <textarea
                        placeholder="Never tell anyone your full name or address. You should always meet strangers at public places like game stores, libraries, or bars."
                        class="form-control"
                        id="AboutForm"
                        rows="7"
                        v-model="inputParams.about_me"
                      ></textarea>
                      <div class="invalid-feedback">{{ errors["About"] }}</div>
                      <div class="valid-feedback">Looks good!</div>
                    </div>
                  </ul>
                </div>
                <div class="col-lg-6">
                  <ul>
                    <li>
                      <strong><label for="AgeForm" class="form-label">Age</label></strong>
                      <input type="number" class="form-control" id="AgeForm" v-model="inputParams.age" min="18" />
                      <div class="invalid-feedback">I'm sorry, you must be over 18 to use this site.</div>
                      <div class="valid-feedback">Looks good!</div>
                    </li>
                    <li>
                      <div>
                        <strong>What are your favorite formats?</strong>
                      </div>
                      <div v-for="format in favorite_formats" :key="format.name">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            :id="format.name"
                            v-model="format.checked"
                          />
                          <label class="form-check-label" :for="format.name">{{ format.name }}</label>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <button class="d-none">This is my hidden button to allow the 2nd form to work</button>
            </form>
          </div>
          <div class="row">
            <div class="col">
              <div data-aos="zoom-in" data-aos-delay="50">
                <button @click="createAccount()" class="btn-about centered-element">Sign up</button>
              </div>
            </div>
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
            <div class="container-fluid d-flex flex-column flex-grow-1 vh-100 overflow-hidden">
              <div class="row flex-grow-1 overflow-hidden" id="card-picker">
                <div class="col-5 mh-100 overflow-auto py-2">
                  <div class="list-group" id="card-list" role="tablist" v-if="!showSaveButton">
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
                  <div class="list-group" id="list-tab" role="tablist" v-if="showSaveButton">
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
                        class="centered-element"
                      />
                      <!-- <img
                          v-if="card.card_faces && card.card_faces[0] && card.card_faces[0].image_uris.art_crop"
                          :src="card.card_faces[0].image_uris.art_crop"
                          alt=""
                          id="picture-preview"
                          class="centered-element"
                        /> -->
                      <div style="font-style: italic" class="float-end">Artist: {{ card.artist }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button
              v-if="!showSaveButton"
              class="btn btn-primary"
              @click="
                scryfallFormatSearch(selectedCard.name);
                cards = [];
              "
            >
              Next! Choose which printing...
            </button>
            <button
              v-if="showSaveButton"
              class="btn btn-primary"
              @click="
                saveCard();
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

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      inputParams: { profile_picture: "/assets/img/icons/B.png" },
      scryfallName: "",
      scryfallPreview: "",
      cards: [],
      selectedCard: {},
      showSaveButton: false,
      errors: {
        Password: "",
        Email: "",
        First: "",
        Age: "",
        About: "",
        ZIP: "",
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
  created: function () {
    let coinFlip = Math.floor(Math.random() * 2);
    if (coinFlip === 0) {
      // picks a random color
      this.inputParams.profile_picture = this.colors[Math.floor(Math.random() * 5) + 1].img;
      console.log(this.inputParams.profile_picture);
    } else {
      // picks a random guild
      this.inputParams.profile_picture = this.guilds[Math.floor(Math.random() * 10) + 1].img;
      console.log(this.inputParams.profile_picture);
    }
  },
  methods: {
    showLogIn: function () {
      this.$router.push("/log-in");
    },
    scryfallSearch: function (cardName) {
      this.showSaveButton = false;
      fetch(`https://api.scryfall.com/cards/search?q=${cardName}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log("raw data", data);
          this.cards = data.data;
          this.selectedCard = this.cards[0];
          // console.log("cards list", this.cards);
          // console.log("first card", this.cards[0]);
          setTimeout(() => {
            let firstCard = document.getElementById(`card-id-${this.cards[0].id}`);
            firstCard.classList.add("active");
            let firstPicture = document.getElementById(`image-${this.cards[0].id}`);
            firstPicture.classList.add("show");
            firstPicture.classList.add("active");
          }, 30);
        });
    },
    scryfallFormatSearch: function (cardName) {
      this.showSaveButton = true;
      let firstCard = document.getElementById(`card-id-${this.cards[0].id}`);
      firstCard.classList.remove("active");
      let firstPicture = document.getElementById(`image-${this.cards[0].id}`);
      firstPicture.classList.remove("show");
      firstPicture.classList.remove("active");
      fetch(`https://api.scryfall.com/cards/named?fuzzy=${cardName}`)
        .then((response) => response.json())
        .then((data) => {
          let formatsearch = data.prints_search_uri;
          fetch(formatsearch)
            .then((response) => response.json())
            .then((data) => {
              this.cards = data.data;
              this.selectedCard = this.cards[0];

              setTimeout(() => {
                let firstCard = document.getElementById(`format-id-${this.cards[0].id}`);
                firstCard.classList.add("active");
                let firstPicture = document.getElementById(`image-${this.cards[0].id}`);
                firstPicture.classList.add("show");
                firstPicture.classList.add("active");
              }, 30);
              // console.log("formats", data);
            });
        });
    },
    randomScryfall: function () {
      fetch("https://api.scryfall.com/cards/random")
        .then((response) => response.json())
        .then((data) => {
          this.inputParams.profile_picture = data["image_uris"]["art_crop"];
        });
    },
    selectCard: function (card) {
      this.selectedCard = card;
    },
    saveCard: function () {
      if (this.selectedCard.card_faces) {
        this.inputParams.profile_picture = this.selectedCard.card_faces[0]["image_uris"]["art_crop"];
      } else {
        this.inputParams.profile_picture = this.selectedCard["image_uris"]["art_crop"];
      }
    },
    selectIcon: function (card) {
      this.inputParams.profile_picture = card.img;
      this.inputParams.profile_picture = card.img;
    },
    createAccount: function () {
      axios
        .post("/users", this.inputParams)
        .then((response) => {
          this.favorite_formats.forEach((format) => {
            if (format.checked === true) {
              format.user_id = response.data.id;
              axios.post("/favoriteformats", format).then(() => {
                this.$router.push("/");
              });
            }
          });
        })
        .catch((error) => {
          // reset errors
          this.errors = {
            Password: "",
            Email: "",
            First: "",
            ZIP: "",
            Age: "",
            About: "",
          };
          for (var key in this.errors) {
            // console.log(key);
            let form = document.getElementById(`${key}Form`);
            // console.log(form);
            form.classList.add("is-valid");
            form.classList.remove("is-invalid");
          }

          // now make any error an invalid state
          console.log("ERROR!", error.response.data.errors);
          error.response.data.errors.forEach((error) => {
            let errorName = error.split(" ")[0];
            this.errors[errorName] = error;
            let form = document.getElementById(`${errorName}Form`);
            // console.log(form)
            if (form) {
              form.classList.add("is-invalid");
              form.classList.remove("is-valid");
            }
          });
          // console.log(this.errors);
        });
    },
  },
};
</script>
