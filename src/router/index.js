import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CreateAccount from "../views/CreateAccount.vue";
import FindFriends from "../views/FindFriends.vue";
import Chat from "../views/Chat.vue";
import MyProfile from "../views/MyProfile.vue";
import AdvancedChat from "../views/AdvancedChat.vue";
import FriendRequests from "../views/FriendRequests.vue";
import TestChat from "../views/TestChat.vue";

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
    path: "/chat",
    name: "Chat",
    component: Chat,
  },
  {
    path: "/advanced-chat",
    name: "Advanced Chat",
    component: AdvancedChat,
  },
  {
    path: "/friend-requests",
    name: "Friend Requests",
    component: FriendRequests,
  },
  {
    path: "/test-chat",
    name: "TestChat",
    component: TestChat,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
