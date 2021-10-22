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
      <span id="user-attribute">First_Name:</span>
      {{ user.first_name }}
    </div>
    <div v-if="editing.first_name">
      <span id="user-attribute">Editing your First_Name:</span>
      <input v-model="user.first_name" class="input" />
      <button @click="disableEditing(`first_name`)">Cancel</button>
      <button @click="saveEdit(`first_name`)">Save</button>
    </div>
    <div v-if="!editing.zip_code" @click="showUpdate(`zip_code`)">
      <span id="user-attribute">Zip Code:</span>
      {{ user.zip_code }}
    </div>
    <div v-if="editing.zip_code">
      <span id="user-attribute">Editing your Profile Picture:</span>
      <input v-model="user.zip_code" class="input" />
      <button @click="disableEditing(`zip_code`)">Cancel</button>
      <button @click="saveEdit(`zip_code`)">Save</button>
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
        zip_code: false,
      },
    };
  },
  created() {
    this.importCurrentUser();
  },
  methods: {
    importCurrentUser: function () {
      this.user = axios.get(`/users/${localStorage.user_id}`).then((response) => {
        this.user = response.data;
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
  },
};
</script>
