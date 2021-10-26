<template>
  <div>
    <h1>Friend Requests:</h1>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      friendRequests: {},
    };
  },
  created() {
    this.loadRequests();
  },
  methods: {
    loadRequests: function () {
      axios.get("/friend-requests").then((response) => {
        console.log(response.data);
      });
    },
  },
};
</script>
