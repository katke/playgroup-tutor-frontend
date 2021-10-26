<template>
  <div class="createaccount">
    <h2>Create Account</h2>
    <div>
      <div>
        Email:
        <input type="text" v-model="inputParams.email" />
      </div>
      <div>
        Password:
        <input type="text" v-model="inputParams.password" />
      </div>
      <br />
      <div>
        First Name:
        <input type="text" v-model="inputParams.first_name" />
      </div>
      <div>
        Zip Code:
        <input type="text" v-model="inputParams.zipcode" />
      </div>
      <div>
        Profile Picture:
        <input type="text" v-model="inputParams.profile_picture" />
      </div>
      <div>
        About Me:
        <input type="text" v-model="inputParams.about_me" />
      </div>
      <div>
        Age:
        <input type="number" v-model="inputParams.age" />
      </div>
    </div>
    <br />
    <div v-for="format in favorite_formats" v-bind:key="format.name">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" v-bind:id="format.name" v-model="format.checked" />
        <label class="form-check-label" v-bind:for="format.name">{{ format.name }}</label>
      </div>
    </div>
    <button @click="createAccount()">Sign up</button>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      inputParams: {},
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
