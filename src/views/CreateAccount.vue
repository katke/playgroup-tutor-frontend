<template>
  <div class="createaccount">
    <h2>Create Account</h2>
    <div>
      <div>
        Email:
        <input type="text" v-model="inputParams.email" />
      </div>
      <div>
        Password:
        <input type="text" v-model="inputParams.password" />
      </div>
      <div>
        first_name:
        <input type="text" v-model="inputParams.first_name" />
      </div>
      <div>
        zip_code:
        <input type="number" v-model="inputParams.zip_code" />
      </div>
      <div>
        profile_picture:
        <input type="text" v-model="inputParams.profile_picture" />
      </div>
      <div>
        about_me:
        <input type="text" v-model="inputParams.about_me" />
      </div>
      <div>
        age:
        <input type="number" v-model="inputParams.age" />
      </div>
      <button @click="createAccount()">Sign up</button>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      inputParams: {},
    };
  },
  created: function () {},
  methods: {
    createAccount: function () {
      axios.post("/users", this.inputParams).then((response) => {
        console.log(response.data);
        this.inputParams = {};
        this.$router.push("/log-in");
      });
    },
  },
};
</script>
