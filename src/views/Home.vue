<template>
  <div class="home">
    <!-- ======= Hero Section ======= -->
    <section id="hero">
      <div class="container">
        <div class="row d-flex align-items-center">
          <div class="d-flex flex-column align-items-center" data-aos="zoom-in" data-aos-delay="100">
            <h1 id="splash-text">Welcome to Playgroup Tutor!</h1>
            <h2 style="font-size: 30px">Find nearby Magic: the Gathering players</h2>
            <h2 style="font-size: 30px">Form new playgroups</h2>
            <br />
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
                    <div class="invalid-feedback">{{ errors["Email"] }}.</div>
                    <div class="valid-feedback">Looks good!</div>
                  </div>
                  <div class="col">
                    Password
                    <input
                      type="password"
                      class="form-control form-control-sm"
                      id="PasswordForm"
                      v-model="inputParams.password"
                    />
                    <div class="invalid-feedback">{{ errors["Password"] }}.</div>
                    <div class="valid-feedback">Looks good!</div>
                  </div>
                </div>
              </div>
              <button class="d-none">This is my hidden button to allow 'enter' to log you in</button>
            </form>
            <button @click="signIn()" class="btn-about">Log in</button>
            <button @click="showCreateAccount()" class="btn-about">Create Account</button>
          </div>
        </div>
      </div>
    </section>
    <!-- End Hero -->
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      inputParams: {
        email: "",
        password: "",
      },
      errors: {
        Password: "",
        Email: "",
      },
    };
  },
  created: function () {},
  methods: {
    showCreateAccount: function () {
      this.$router.push("/create-account#");
    },
    signIn: function () {
      // console.log(this.inputParams);
      axios
        .post("/sessions", this.inputParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("first_name", response.data.first_name);
          localStorage.setItem("profile_picture", response.data.profile_picture);
          localStorage.setItem("latitude", response.data.latitude);
          localStorage.setItem("longitude", response.data.longitude);
          this.$parent.loginCheck();
          this.$parent.friendRequestCount();
          this.$router.push("/find-friends");
        })
        .catch((error) => {
          // reset errors
          this.errors = {
            Password: "",
            Email: "",
          };
          for (var key in this.errors) {
            // console.log(key);
            let form = document.getElementById(`${key}Form`);
            // console.log(form);
            form.classList.add("is-valid");
            form.classList.remove("is-invalid");
          }

          // now make any error an invalid state
          console.log("ERROR!", error.response.data.errors);
          error.response.data.errors.forEach((error) => {
            let errorName = error.split(" ")[0];
            this.errors[errorName] = error;
            let form = document.getElementById(`${errorName}Form`);
            // console.log(form)
            if (form) {
              form.classList.add("is-invalid");
              form.classList.remove("is-valid");
            }
          });
          console.log(this.errors);
        });
    },
  },
};
</script>
