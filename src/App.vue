<template>
  <div id="app">
    <!-- ======= Header ======= -->
    <header id="header" class="fixed-top" v-if="isHome">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <h1 class="logo me-auto me-lg-0"><a href="#">Playgroup Tutor</a></h1>
        <nav id="navbar" class="navbar order-last order-lg-0">
          <!-- ======= Desktop Navbar ======= -->
          <ul>
            <li><a href="/find-friends">Find Friends</a></li>
            <li><a href="/test-chat"></a></li>
            <li>
              <a href="/friend-requests">
                Friend Requests&nbsp;
                <span id="friend-requests" class="">({{ friendRequests }})</span>
              </a>
            </li>
          </ul>
          <!-- End Desktop Navbar -->
          <!-- ======= Mobile Dropdown -->
          <div class="navbar order-last order-lg-0" id="mobile-dropdown">
            <div class="dropdown">
              <i class="bi bi-list mobile-nav-toggle" data-bs-toggle="dropdown" id="mobileDropdown"></i>

              <ul class="dropdown" aria-labelledby="mobileDropdown">
                <li class=""><a href="/find-friends" class="dropdown-item">Find Friends</a></li>
                <li><a href="/advanced-chat" class="dropdown-item">Chat</a></li>
                <li>
                  <a href="/friend-requests" class="dropdown-item">
                    Friend Requests&nbsp;
                    <span id="friend-requests" style="color: red">({{ friendRequests }})</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <!-- End Mobile Dropdown -->
        <!-- ======= Login Dropdown ======= -->
        <div class="navbar order-last order-lg-0">
          <div class="dropdown" @update-login-name="loginCheck()">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="loginDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ loginStatus }}
            </button>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="loginDropdown">
              <li><a class="dropdown-item active" href="/me">View / Edit my Profile</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" @click="logOut()">Log out</a></li>
            </ul>
          </div>
        </div>
        <!-- End Login Dropdown -->
      </div>
    </header>
    <!-- End Header -->

    <!-- ======= Router view ======= -->
    <router-view />

    <!-- Chat! -->
    <div v-if="isHome">
      <div class="btn-group friends-floaty">
        <button
          class="btn btn-danger dropdown-toggle"
          type="button"
          id="dropdownMenuClickable"
          data-bs-toggle="dropdown"
          data-bs-auto-close="false"
          aria-expanded="false"
        >
          Chat with Friends
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuClickable">
          <li class="dropdown-item" v-for="friend in friends" :key="`chat-${friend.id}`" @click="loadChatRoom(friend)">
            {{ friend.first_name }}
          </li>
        </ul>
      </div>

      <transition
        name="custom-classes-transition"
        enter-active-class="animate__animated animate__fadeInUp"
        leave-active-class="animate__animated animate__fadeOutDown"
      >
        <div class="chat-floaty" v-if="visible">
          <Chat
            v-if="visible"
            :participants="participants"
            :myself="myself"
            :messages="messages"
            :chat-title="chatTitle"
            :placeholder="placeholder"
            :colors="colors"
            :border-style="borderStyle"
            :hide-close-button="hideCloseButton"
            :close-button-icon-size="closeButtonIconSize"
            :submit-icon-size="submitIconSize"
            :load-more-messages="toLoad.length > 0 ? loadMoreMessages : null"
            :async-mode="asyncMode"
            :scroll-bottom="scrollBottom"
            :display-header="true"
            :send-images="true"
            :profile-picture-config="profilePictureConfig"
            :timestamp-config="timestampConfig"
            :link-options="linkOptions"
            :accept-image-types="'.png, .jpeg, .jpg'"
            @onImageClicked="onImageClicked"
            @onImageSelected="onImageSelected"
            @onMessageSubmit="onMessageSubmit"
            @onClose="onClose"
          />
          <!-- disabled settings: 
            :submit-image-icon-size="submitImageIconSize"
           -->
        </div>
      </transition>
    </div>
    <!-- end Chat -->
    <!-- ======= Footer ======= -->
    <footer id="footer">
      <div class="container">
        <div class="copyright">
          Created by
          <strong><span>David Ryan</span></strong>
          2021
        </div>
        <div class="credits"></div>
      </div>
    </footer>
    <!-- End  Footer -->

    <a href="#" class="back-to-top d-flex align-items-center justify-content-center">
      <i class="bi bi-arrow-up-short"></i>
      test
    </a>
  </div>
</template>

<style></style>

<script>
import { Chat } from "vue-quick-chat";
import "vue-quick-chat/dist/vue-quick-chat.css";
import axios from "axios";
import "animate.css";

export default {
  components: {
    Chat,
  },
  data: function () {
    return {
      friendRequests: 0,
      loginStatus: "Not logged in",
      // chatbox stuff below
      user: {},
      friends: [],
      tempChats: [],
      currentFriend: {},
      // chat stuff below
      visible: false,
      participants: [],
      myself: {},
      messages: [],
      chatTitle: "My chat title :)",
      placeholder: "send your message",
      colors: {
        header: {
          bg: "#d30303",
          text: "#fff",
        },
        message: {
          myself: {
            bg: "#fff",
            text: "#black",
          },
          others: {
            bg: "#fb4141",
            text: "#fff",
          },
          messagesDisplay: {
            bg: "#f7f3f3",
          },
        },
        submitIcon: "#b91010",
        submitImageIcon: "#b91010",
      },
      borderStyle: {
        topLeft: "10px",
        topRight: "10px",
        bottomLeft: "10px",
        bottomRight: "10px",
      },
      hideCloseButton: false,
      submitIconSize: 25,
      closeButtonIconSize: "20px",
      asyncMode: true,
      toLoad: [],
      scrollBottom: {
        messageSent: true,
        messageReceived: false,
      },
      displayHeader: true,
      profilePictureConfig: {
        others: true,
        myself: true,
        styles: {
          width: "75px",
          height: "75px",
          borderRadius: "50%",
        },
      },
      timestampConfig: {
        format: "HH:mm",
        relative: false,
      },
      linkOptions: {
        myself: {
          className: "myLinkClass",
          events: {
            click: function (e) {
              alert("Link clicked!");
              console.log(e);
            },
            mouseover: function (e) {
              alert("Link hovered!");
              console.log(e);
            },
          },
          format: function (value, type) {
            if (type === "url" && value.length > 50) {
              value = value.slice(0, 50) + "…";
            }
            return value;
          },
        },
        others: {
          className: "othersLinkClass",
          events: {
            click: function (e) {
              alert("Link clicked!");
              console.log(e);
            },
            mouseover: function (e) {
              alert("Link hovered!");
              console.log(e);
            },
          },
          format: function (value, type) {
            if (type === "url" && value.length > 50) {
              value = value.slice(0, 50) + "…";
            }
            return value;
          },
        },
      },
    };
  },
  mounted: function () {
    this.loginCheck();
  },
  methods: {
    loginCheck: function () {
      if (localStorage.jwt) {
        this.loginStatus = `Logged in as ${localStorage.first_name}`;
        this.friendRequestCount();
        this.importFriends();
        this.importUser();
      } else {
        this.loginStatus = "Not logged in";
      }
    },
    friendRequestCount: function () {
      if (localStorage.jwt) {
        axios.get("/friend-requests").then((response) => {
          this.friendRequests = response.data.length;
          let form = document.getElementById("friend-requests");
          if (form) {
            if (response.data.length > 0) {
              form.classList.add("request-count");
            } else {
              form.classList.remove("request-count");
            }
          }
        });
      }
    },
    logOut: function () {
      // console.log("logged out!");
      localStorage.removeItem("jwt");
      localStorage.removeItem("email");
      localStorage.removeItem("user_id");
      localStorage.removeItem("first_name");
      localStorage.removeItem("latitude");
      localStorage.removeItem("longitude");
      localStorage.removeItem("profile_picture");

      this.loginStatus = "Not logged in";
      axios.defaults.headers.common["Authorization"] = "not logged in";
      this.$router.push("/");
    },
    toMe: function () {
      this.$router.push("/me");
    },

    importUser: function () {
      axios.get(`/users/${localStorage.user_id}`).then((response) => {
        this.user = response.data;
        this.myself = {
          name: this.user.first_name,
          id: this.user.user_id,
          profilePicture: this.user.profile_picture,
        };
      });
    },
    importFriends: function () {
      axios.get("/friends").then((response) => {
        this.friends = response.data;
      });
    },
    timeConverter: function (hour) {
      if (hour < 6) {
        hour = 24 - (5 - hour);
      } else {
        hour = hour - 5;
      }
      return hour;
    },
    loadChatRoom: function (friend) {
      if (this.currentFriend != friend) {
        if (this.visible === false) {
          this.visible = true;
        } else {
          this.visible = false;
          setTimeout(() => {
            this.visible = true;
          }, 350);
        }
        let tempMessages = [];
        this.participants = [];
        this.currentFriend = friend;
        this.chatTitle = `Chatting with ${friend.first_name}`;

        this.participants = [
          {
            name: friend.first_name,
            id: friend.id,
            profilePicture: friend.profile_picture,
          },
        ];

        axios.get("/my-messages").then((response) => {
          let bulkMessages = response.data.filter((message) => {
            return message.sender_id === friend.id || message.receiver_id === friend.id;
          });

          bulkMessages.forEach((message) => {
            // console.log(message.created_at.substring(11, 13));
            // console.log(this.timeConverter(message.created_at.substring(11, 13)));
            let tempMessage = {
              content: message.text,
              participantId: message.sender_id,
              type: "text",
              uploaded: true,
              timestamp: {
                hour: this.timeConverter(message.created_at.substring(11, 13)),
                minute: message.created_at.substring(14, 16),
                second: message.created_at.substring(17, 19),
              },
            };
            if (message.sender.id === friend.id) {
              tempMessage.myself = false;
            } else {
              tempMessage.myself = true;
            }
            // console.log("final message", tempMessage);
            tempMessages.push(tempMessage);
          });
          this.messages = tempMessages;
        });
      } else {
        this.visible = !this.visible;
      }
    },
    createMessage: function (params) {
      axios.post("/messages", params).catch((error) => {
        console.log(error.response);
        alert(error.response.data.errors);
      });
    },

    // chat functions below

    // onType: function (event) {
    //   //here you can set any behavior
    //   let event = "foobar";
    // },
    loadMoreMessages(resolve) {
      setTimeout(() => {
        resolve(this.toLoad); //We end the loading state and add the messages
        //Make sure the loaded messages are also added to our local messages copy or they will be lost
        this.messages.unshift(...this.toLoad);
        this.toLoad = [];
      }, 1000);
    },
    onMessageSubmit: function (message) {
      message.uploaded = false;
      let params = {
        receiver_id: 1,
        sender_id: 1,
        text: message.content,
      };
      if (message.myself === true) {
        params.receiver_id = this.user.id;
        params.sender_id = this.currentFriend.id;
      } else {
        params.receiver_id = this.currentFriend.id;
        params.sender_id = this.user.id;
      }
      this.createMessage(params);
      this.messages.push(message);

      /*
       * you can update message state after the server response
       */
      // timeout simulating the request
      setTimeout(() => {
        message.uploaded = true;
      }, 500);
    },
    onClose() {
      this.visible = false;
    },
    onImageSelected(files, message) {
      let src = "https://149364066.v2.pressablecdn.com/wp-content/uploads/2017/03/vue.jpg";
      this.messages.push(message);
      /**
       * This timeout simulates a requisition that uploads the image file to the server.
       * It's up to you implement the request and deal with the response in order to
       * update the message status and the message URL
       */
      setTimeout(
        (res) => {
          message.uploaded = true;
          message.src = res.src;
        },
        3000,
        { src }
      );
    },
    onImageClicked(message) {
      /**
       * This is the callback function that is going to be executed when some image is clicked.
       * You can add your code here to do whatever you need with the image clicked. A common situation is to display the image clicked in full screen.
       */
      console.log("Image clicked", message.src);
    },
  },
  // headeer/footer does NOT show up on login/create pages
  computed: {
    isHome() {
      return this.$route.name !== "Home" && this.$route.name !== "Log In" && this.$route.name !== "Create Account"
        ? true
        : false;
    },
  },
};
</script>
