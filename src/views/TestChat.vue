<template>
  <main id="main">
    <section>
      <div class="btn-group friends-floaty">
        <button
          class="btn btn-secondary dropdown-toggle"
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

      <div class="chat-floaty">
        <transition
          name="custom-classes-transition"
          enter-active-class="animate__animated animate__fadeInUp"
          leave-active-class="animate__animated animate__fadeOutDown"
        >
          <Chat
            style="width: 375px; height: 400px"
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
        </transition>
        <!-- disabled settings: 
            :submit-image-icon-size="submitImageIconSize"
           -->
      </div>
    </section>
  </main>
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
  data() {
    return {
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
  created() {
    this.importFriends();
    axios.get(`/users/${localStorage.user_id}`).then((response) => {
      this.user = response.data;
      this.myself = {
        name: this.user.first_name,
        id: this.user.user_id,
        profilePicture: this.user.profile_picture,
      };
    });
  },
  methods: {
    importFriends: function () {
      axios.get("/friends").then((response) => {
        console.log("friends", response.data);
        this.friends = response.data;
      });
    },
    loadChatRoom: function (friend) {
      if (this.visible === false) {
        this.visible = true;
      } else {
        this.visible = false;
        setTimeout(() => {
          this.visible = true;
        }, 350);
      }
      if (this.currentFriend != friend) {
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
            console.log(message.created_at.substring(0, 10));
            let tempMessage = {
              content: message.text,
              participantId: message.sender_id,
              type: "text",
              uploaded: true,
              timestamp: {
                hour: 20,
                minute: 10,
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
      }
    },
    createMessage: function (params) {
      console.log(params);
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
      console.log("mess", message);
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
      console.log("params sent", params);
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
};
</script>
