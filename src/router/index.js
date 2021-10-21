import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CreateAccount from "../views/CreateAccount.vue";
import LogIn from "../views/LogIn.vue";
import FindFriends from "../views/FindFriends.vue";
import Chat from "../views/Chat.vue";
import MyProfile from "../views/MyProfile.vue";
import AdvancedChat from "../views/AdvancedChat.vue";

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
    path: "/log-in",
    name: "LogIn",
    component: LogIn,
  },
  {
    path: "/find-friends",
    name: "FindFriends",
    component: FindFriends,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
  },
  {
    path: "/advanced-chat",
    name: "AdvancedChat",
    component: AdvancedChat,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
