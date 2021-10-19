<template>
  <div class="friends">
    <h1>Current message box:</h1>
    <div v-for="message in messages" v-bind:key="message.id">
      <p>{{ message }}.text</p>
    </div>
    <h2>All Friends:</h2>
    <div v-for="friend in friends" v-bind:key="friend.id">
      <h1 @click="showMessages(friend)">{{ friend.first_name }}</h1>
      <p>{{ friend }}</p>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      friends: [],
      messages: [],
    };
  },
  created: function () {
    this.showFriends();
    this.showMessages();
  },
  methods: {
    showFriends: function () {
      axios
        .get("/friends")
        .then((response) => {
          this.friends = response.data;
        })
        .then(() => {
          this.showMessages(this.friends[0]);
        });
    },
    showMessages: function (friend) {
      axios.get("/my-messages").then((response) => {
        this.messages = response.data.filter((message) => {
          return message.sender_id === friend.id || message.receiver_id === friend.id;
        });
      });
    },
  },
};
</script>
