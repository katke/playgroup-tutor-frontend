import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CreateAccount from "../views/CreateAccount.vue";
import FindFriends from "../views/FindFriends.vue";
import MyProfile from "../views/MyProfile.vue";
import FriendRequests from "../views/FriendRequests.vue";
import LearnMagic from "../views/LearnMagic.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/me",
    name: "My Profile",
    component: MyProfile,
  },
  {
    path: "/create-account",
    name: "Create Account",
    component: CreateAccount,
  },
  {
    path: "/find-friends",
    name: "Find Friends",
    component: FindFriends,
  },

  {
    path: "/friend-requests",
    name: "Friend Requests",
    component: FriendRequests,
  },
  {
    path: "/learn-magic",
    name: "LearnMagic",
    component: LearnMagic,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
