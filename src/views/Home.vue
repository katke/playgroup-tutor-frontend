<template>
  <div class="home">
    <h1>Welcome to Playgroup Tutor!</h1>
    <div>
      <button @click="showLogIn()">Log in</button>
      -
      <button @click="showCreateAccount()">Create Account</button>
      -
      <button @click="test()">TEST</button>
    </div>
  </div>
</template>

<style></style>

<script>
export default {
  data: function () {
    return {};
  },
  created: function () {},
  methods: {
    showLogIn: function () {
      this.$router.push("/log-in");
    },
    showCreateAccount: function () {
      this.$router.push("/create-account");
    },
    test: function () {
      console.log(this.$route.name);
    },
  },
};
</script>
