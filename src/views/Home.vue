<template>
  <div class="home">
    <!-- ======= Hero Section ======= -->
    <section id="hero" class="d-flex align-items-center">
      <div class="container d-flex flex-column align-items-center" data-aos="zoom-in" data-aos-delay="100">
        <h1>Welcome to Playgroup Tutor!</h1>
        <h2>Find nearby MTG players and form new playgroups</h2>
        <a href="/log-in" class="btn-about">Log in</a>
        <a href="/create-account" class="btn-about">Create Account</a>
      </div>
      <!-- <h1>Welcome to Playgroup Tutor!</h1>
      <div>
        <button @click="showLogIn()">Log in</button>
        -
        <button @click="showCreateAccount()">Create Account</button>
      </div> -->
    </section>
    <!-- End Hero -->
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
  },
};
</script>
