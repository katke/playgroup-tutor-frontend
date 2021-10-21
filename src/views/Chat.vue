<template>
  <div class="friends">
    <h1>Current message box:</h1>
    <h2>Talking to: {{ current_friend.first_name }}</h2>
    <div v-for="message in messages" v-bind:key="message.id">
      <p>
        <span class="test">{{ message.sender.first_name }}</span>
        : {{ message.text }}
      </p>
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
      friends: [],
      messages: [],
      new_message: {},
      current_friend: {},
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
      this.current_friend = friend;
      axios.get("/my-messages").then((response) => {
        this.messages = response.data.filter((message) => {
          return message.sender_id === friend.id || message.receiver_id === friend.id;
        });
      });
    },
    createMessage: function (params) {
      params["receiver_id"] = this.current_friend.id;
      console.log(params);
      axios
        .post("/messages", params)
        .then((response) => {
          console.log(response);
          this.messages.push(response);
          this.new_message = {};
        })
        .catch((error) => {
          console.log(error.response);
          alert(error.response.data.errors);
        });
    },
  },
};
</script>
