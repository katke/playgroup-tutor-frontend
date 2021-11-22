<template>
  <div class="home">
    <section id="splash">
      <div class="row h-100">
        <div
          class="d-flex flex-column my-auto align-items-center"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <h1 class="mb-3">Playgroup Tutor</h1>
          <h2 class="mb-3">
            Find nearby Magic: the Gathering players and form new playgroups
          </h2>
          <form v-on:submit.prevent="signIn()">
            <div class="blurry_box">
              <div class="row">
                <div class="col">
                  Email
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="EmailForm"
                    v-model="inputParams.email"
                  />
                  <div class="invalid-feedback">Invalid email or password.</div>
                  <div class="valid-feedback"></div>
                </div>
                <div class="col">
                  Password
                  <input
                    type="password"
                    class="form-control form-control-sm"
                    id="PasswordForm"
                    v-model="inputParams.password"
                  />
                  <div class="invalid-feedback"></div>
                  <div class="valid-feedback"></div>
                </div>
              </div>
            </div>
            <button class="d-none">
              This is my hidden button to allow 'enter' to log you in
            </button>
          </form>
          <button @click="signIn()" class="btn-about mb-3">Log in</button>
          <button @click="showCreateAccount()" class="btn-about">
            Create Account
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      inputParams: {
        email: "dave@demo.com",
        password: "password",
      },
    };
  },
  created: function () {},
  methods: {
    showCreateAccount: function () {
      this.$router.push("/create-account");
    },
    signIn: function () {
      // console.log(this.inputParams);
      axios
        .post("/sessions", this.inputParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("first_name", response.data.first_name);
          localStorage.setItem(
            "profile_picture",
            response.data.profile_picture
          );
          localStorage.setItem("latitude", response.data.latitude);
          localStorage.setItem("longitude", response.data.longitude);
          this.$parent.loginCheck();
          this.$parent.friendRequestCount();
          this.$router.push("/find-friends");
        })
        .catch(() => {
          // now make any error an invalid state
          let form = document.getElementById(`EmailForm`);
          form.classList.add("is-invalid");
          form.classList.remove("is-valid");
          let form2 = document.getElementById(`PasswordForm`);
          form2.classList.add("is-invalid");
          form2.classList.remove("is-valid");
        });
    },
  },
};
</script>
