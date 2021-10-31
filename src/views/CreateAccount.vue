<template>
  <div id="create">
    <main id="main">
      <div class="container d-flex flex-column align-items-center" data-aos="zoom-down">
        <a href="/" class="btn-about">Log in</a>
      </div>
      <!-- ======= About Section ======= -->
      <section id="about" class="about" data-aos="zoom-up" data-aos-delay="100">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Create your account</h2>
          </div>

          <div class="row">
            <div class="col-lg-4">
              <div>
                <strong>Profile Picture:</strong>
              </div>

              <img :src="picturePreview" class="img-fluid" alt="" id="profile-pic" />
              <br />
              <strong>Search for your favorite card:</strong>
              <input type="text" width="100%" v-model="scryfallName" />
              <button @click="scryfallSearch(scryfallName)" data-bs-toggle="modal" data-bs-target="#cardList">
                Search
              </button>
              <!-- <button @click="testModal()">TEST</button> -->
              <br />
              <br />
              <strong>Or choose your:</strong>
              <!-- Color choosing dropdown  -->
              <div class="input-group mb-3">
                <button
                  class="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Favorite Color...
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
              <!-- end Color choosing dropdown  -->
              <!-- guild choosing dropdown  -->
              <div class="input-group mb-3">
                <button
                  class="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Ravnica Guild...
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
              <!-- end guild choosing dropdown  -->
            </div>
            <div class="col-lg-8 pt-4 pt-lg-0 content">
              <h3>
                Email:
                <input type="text" v-model="inputParams.email" />
              </h3>
              <h3>
                Password:
                <input type="text" v-model="inputParams.password" />
              </h3>
              <p class="fst-italic">
                Never tell anyone your full name or address. You should always meet strangers at public places like game
                stores, libraries, or bars.
              </p>
              <div class="row">
                <div class="col-lg-6">
                  <ul>
                    <li>
                      <i class="bi bi-rounded-right"></i>
                      <strong>First Name:</strong>
                      <input type="text" v-model="inputParams.first_name" />
                    </li>
                    <li>
                      <i class="bi bi-rounded-right"></i>
                      <strong>Zip code:</strong>
                      <input type="text" v-model="inputParams.zipcode" />
                    </li>
                    <li>
                      <i class="bi bi-rounded-right"></i>
                      <strong>A little about yourself:</strong>
                      <input type="text" v-model="inputParams.about_me" />
                    </li>
                  </ul>
                </div>
                <div class="col-lg-6">
                  <ul>
                    <li>
                      <i class="bi bi-rounded-right"></i>
                      <strong>Age:</strong>
                      <input type="text" v-model="inputParams.age" />
                    </li>
                    <li>
                      <div>
                        <strong>What are your favorite formats?</strong>
                      </div>
                      <div v-for="format in favorite_formats" v-bind:key="format.name">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
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
            <div class="container d-flex flex-column align-items-center" data-aos="zoom-in" data-aos-delay="100">
              <button @click="createAccount()" class="btn-about">Sign up</button>
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
              v-if="picturePreview"
              @click="pictureEdit(picturePreview)"
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
      inputParams: {},
      scryfallName: "",
      picturePreview: "",
      cards: [],
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
    console.log(coinFlip);
    if (coinFlip === 0) {
      this.picturePreview = this.colors[Math.floor(Math.random() * 5) + 1].img;
    } else {
      this.picturePreview = this.guilds[Math.floor(Math.random() * 10) + 1].img;
    }
  },
  methods: {
    showLogIn: function () {
      this.$router.push("/log-in");
    },
    scryfallSearch: function (cardName) {
      fetch(`https://api.scryfall.com/cards/search?q=${cardName}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.cards = data.data;
          // console.log(data["image_uris"]["art_crop"]);
          // this.picturePreview = data["image_uris"]["art_crop"];
        });
    },
    selectCard: function (card) {
      this.picturePreview = card["image_uris"]["art_crop"];
    },
    selectIcon: function (card) {
      this.picturePreview = card.img;
    },
    createAccount: function () {
      axios.post("/users", this.inputParams).then((response) => {
        this.favorite_formats.forEach((format) => {
          if (format.checked === true) {
            format.user_id = response.data.id;
            axios.post("/favoriteformats", format);
          }
        });
      });
      this.$router.push("/");
    },
  },
};
</script>
