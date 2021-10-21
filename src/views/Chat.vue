<template>
  <div class="friends">
    <h1>Current message box:</h1>
    <div v-for="message in messages" v-bind:key="message.id">
      <p>{{ message.sender.first_name }}: {{ message.text }}</p>
    </div>
    <input type="text" v-model="new_message.text" />
    <button @click="createMessage(new_message)">chat</button>
    <div>{{ new_message }}</div>
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
      friends: [{ first_name: "test" }],
      messages: [{ text: "no messages sent so far" }],
      new_message: {},
    };
  },
  created: function () {
    this.showFriends();
    this.showMessages;
  },
  mounted: function () {},
  methods: {
    showFriends: function () {
      axios.get("/friends").then((response) => {
        this.friends = response.data;
        this.showMessages(this.friends[0]);
      });
    },
    showMessages: function (friend) {
      axios.get("/my-messages").then((response) => {
        this.messages = response.data.filter((message) => {
          return message.sender_id === friend.id || message.receiver_id === friend.id;
        });
        this.new_message.receiver_id == friend.id;
      });
    },
    createMessage: function (params) {
      axios.post("/messages", params).then((response) => {
        console.log(response.body);
      });
      this.new_message.text = "";
    },
  },
};
</script>
