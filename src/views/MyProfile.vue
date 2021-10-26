<template>
  <div class="my-profile">
    <h1>View/Edit your account</h1>
    <h2>{{ user.first_name }}</h2>
    <div v-if="!editing.profile_picture" @click="showUpdate(`profile_picture`)">
      <span id="user-attribute">
        Profile Picture:
        <img v-bind:src="user.profile_picture" alt="" />
      </span>
    </div>
    <div v-if="editing.profile_picture">
      <span id="user-attribute">Editing your Profile Picture:</span>
      <input v-model="user.profile_picture" class="input" />
      <button @click="disableEditing(`profile_picture`)">Cancel</button>
      <button @click="saveEdit(`profile_picture`)">Save</button>
    </div>
    <img v-bind:src="user.about_me" alt="" />
    <div v-if="!editing.about_me" @click="showUpdate(`about_me`)">
      <span id="user-attribute">About Me:</span>
      {{ user.about_me }}
    </div>
    <div v-if="editing.about_me">
      <span id="user-attribute">Editing your About Me:</span>
      <input v-model="user.about_me" class="input" />
      <button @click="disableEditing(`about_me`)">Cancel</button>
      <button @click="saveEdit(`about_me`)">Save</button>
    </div>
    <div v-if="!editing.email" @click="showUpdate(`email`)">
      <span id="user-attribute">Email:</span>
      {{ user.email }}
    </div>
    <div v-if="editing.email">
      <span id="user-attribute">Editing your Email:</span>
      <input v-model="user.email" class="input" />
      <button @click="disableEditing(`email`)">Cancel</button>
      <button @click="saveEdit(`email`)">Save</button>
    </div>
    <div v-if="!editing.first_name" @click="showUpdate(`first_name`)">
      <span id="user-attribute">First Name:</span>
      {{ user.first_name }}
    </div>
    <div v-if="editing.first_name">
      <span id="user-attribute">Editing your First Name:</span>
      <input v-model="user.first_name" class="input" />
      <button @click="disableEditing(`first_name`)">Cancel</button>
      <button @click="saveEdit(`first_name`)">Save</button>
    </div>
    <div v-if="!editing.zipcode" @click="showUpdate(`zipcode`)">
      <span id="user-attribute">Zip Code:</span>
      {{ user.zipcode }}
    </div>
    <div v-if="editing.zipcode">
      <span id="user-attribute">Editing your Zip Code:</span>
      <input v-model="user.zipcode" class="input" />
      <button @click="disableEditing(`zipcode`)">Cancel</button>
      <button @click="saveEdit(`zipcode`)">Save</button>
    </div>
    <div>
      <br />
      <span id="user-attribute">Favorite Formats:</span>
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
  </div>
</template>

<style scoped>
#user-attribute {
  font-weight: bold;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {},
      editing: {
        about_me: false,
        age: false,
        email: false,
        first_name: false,
        profile_picture: false,
        zipcode: false,
      },
      favorite_formats: [
        { id: 0, name: "Commander (EDH)", checked: false, user_id: localStorage.user_id },
        { id: 0, name: "Standard", checked: false, user_id: localStorage.user_id },
        { id: 0, name: "Draft / Cube", checked: false, user_id: localStorage.user_id },
        { id: 0, name: "Modern", checked: false, user_id: localStorage.user_id },
        { id: 0, name: "Pauper", checked: false, user_id: localStorage.user_id },
        { id: 0, name: "Pioneer", checked: false, user_id: localStorage.user_id },
        { id: 0, name: "Brawl", checked: false, user_id: localStorage.user_id },
        { id: 0, name: "Historic", checked: false, user_id: localStorage.user_id },
        { id: 0, name: "Legacy", checked: false, user_id: localStorage.user_id },
        { id: 0, name: "Vintage", checked: false, user_id: localStorage.user_id },
      ],
    };
  },
  created() {
    this.importCurrentUser();
  },
  methods: {
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
      this.editing[field] = false;
    },
    saveEdit: function (field) {
      axios.patch(`/users/${localStorage.user_id}`, this.user).then(() => {
        this.editing[field] = false;
      });
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
