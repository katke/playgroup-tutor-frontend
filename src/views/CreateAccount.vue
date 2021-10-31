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
              <img src="assets/img/about.jpg" class="img-fluid" alt="" id="profile-pic" />
              <div></div>
              <strong>Search for your favorite card:</strong>
              <input type="text" width="100%" v-model="scryfallName" />
              <button @click="scryfallSearch(scryfallName)">Search</button>
              <div>
                <br />
                <strong>Preview:</strong>
                <img :src="picturePreview" alt="" width="100%" />
                <button v-if="picturePreview" @click="pictureEdit(picturePreview)">Save it!</button>
                <li v-for="card in cards" v-bind:key="card.id" @click="selectCard(card)">
                  {{ card.name }}
                </li>
              </div>
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
                      <strong>Profile Picture:</strong>
                      <input type="text" v-model="inputParams.profile_picture" />
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
      favorite_formats: [
        { name: "Commander (EDH)", checked: false },
        { name: "Standard", checked: false },
        { name: "Draft / Cube", checked: false },
        { name: "Modern", checked: false },
        { name: "Pauper", checked: false },
        { name: "Pioneer", checked: false },
        { name: "Brawl", checked: false },
        { name: "Historic", checked: false },
        { name: "Legacy", checked: false },
        { name: "Vintage", checked: false },
      ],
    };
  },
  created: function () {},
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
    pictureEdit: function (imageString) {
      this.user.profile_picture = imageString;
      this.saveEdit(`profile_picture`);
      this.scryfallName = null;
      this.picturePreview = null;
      location.reload();
      return false;
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
      this.$router.push("/log-in");
    },
  },
};
</script>
