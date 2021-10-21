<template>
  <div class="my-profile">
    <h1>View/Edit your account</h1>
    <h2>{{ user.first_name }}</h2>
  </div>
</template>

<style scoped></style>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.importCurrentUser();
  },
  methods: {
    importCurrentUser: function () {
      console.log("TEST");
    },
  },
};
</script>
