<template>
  <main id="main">
    <section>
      <div class="row">
        My list of chats!
        {{ currentChat }}
        <br />
        <div class="btn-group">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuClickable"
            data-bs-toggle="dropdown"
            data-bs-auto-close="false"
            aria-expanded="false"
          >
            Friends list
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuClickable">
            <li class="dropdown-item" v-for="friend in friends" :key="`chat-${friend.id}`">
              <div @click="showChatRoom(friend)">{{ friend.first_name }}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="row g-3">
        <div @click="currentChat = chatroom" v-for="chatroom in chatrooms" :key="`chatroom-${chatroom.id}`" class="col">
          <transition
            name="custom-classes-transition"
            enter-active-class="animate__animated animate__fadeInUp"
            leave-active-class="animate__animated animate__fadeOutDown"
          >
            <Chat
              style="max-width: auto; max-height: 300px"
              v-if="chatroom.visible"
              :participants="chatroom.participants"
              :myself="chatroom.myself"
              :messages="chatroom.messages"
              :chat-title="chatroom.chatTitle"
              :placeholder="chatroom.placeholder"
              :colors="chatroom.colors"
              :border-style="chatroom.borderStyle"
              :hide-close-button="chatroom.hideCloseButton"
              :close-button-icon-size="chatroom.closeButtonIconSize"
              :submit-icon-size="chatroom.submitIconSize"
              :load-more-messages="chatroom.toLoad.length > 0 ? loadMoreMessages : null"
              :async-mode="chatroom.asyncMode"
              :scroll-bottom="chatroom.scrollBottom"
              :display-header="chatroom.true"
              :send-images="chatroom.true"
              :profile-picture-config="chatroom.profilePictureConfig"
              :timestamp-config="chatroom.timestampConfig"
              :link-options="chatroom.linkOptions"
              :accept-image-types="'.png, .jpeg, .jpg'"
              @onImageClicked="onImageClicked()"
              @onImageSelected="onImageSelected()"
              @onMessageSubmit="onMessageSubmit()"
              @onClose="onClose(chatroom)"
            />
          </transition>
        </div>
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
      currentFriend: {},
      // chat stuff below
      currentChat: {},
      chatrooms: [],
      defaultChatRoom: {
        visible: true,
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
        asyncMode: false,
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
      },
    };
  },
  created() {
    this.importFriends();
    axios.get(`/users/${localStorage.user_id}`).then((response) => {
      this.user = response.data;
    });
  },
  methods: {
    importFriends: function () {
      axios.get("/friends").then((response) => {
        this.friends = response.data;
        this.friends.forEach((friend) => {
          this.loadChatRoom(friend);
        });
      });
    },
    showChatRoom: function (friend) {
      let chatroom = this.chatrooms.find((chat) => chat.id === friend.id);
      chatroom.visible = !chatroom.visible;
    },
    loadChatRoom: function (friend) {
      let tempChatRoom = {
        id: friend.id,
        visible: true,
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
        asyncMode: false,
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
      tempChatRoom.chatTitle = `Chatting with ${friend.first_name}`;
      axios.get("/my-messages").then((response) => {
        // console.log("my raw data", response.data);
        let bulkMessages = response.data.filter((message) => {
          return message.sender_id === friend.id || message.receiver_id === friend.id;
        });
        tempChatRoom.myself = {
          name: this.user.first_name,
          id: this.user.user_id,
          profilePicture: this.user.profile_picture,
        };
        tempChatRoom.participants.push({
          name: friend.first_name,
          id: friend.id,
          profilePicture: friend.profile_picture,
        });
        bulkMessages.forEach((message) => {
          let tempMessage = {
            content: message.text,
            participantId: message.sender_id,
            type: "text",
            timestamp: {
              year: 2019,
              month: 3,
              day: 5,
              hour: 20,
              minute: 10,
              second: 3,
              millisecond: 123,
            },
          };
          if (message.sender.id === friend.id) {
            tempMessage.myself = false;
          } else {
            tempMessage.myself = true;
          }
          // console.log("final message", tempMessage);
          tempChatRoom.messages.push(tempMessage);
        });
        this.chatrooms.push(tempChatRoom);
      });
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
      console.log("message", message);
      console.log("chatroom", this.currentChat);
      let params = {
        receiver_id: 1,
        sender_id: 1,
        text: message.content,
      };
      if (message.myself === true) {
        params.receiver_id = this.user.id;
        params.sender_id = this.currentChat.id;
      } else {
        params.receiver_id = this.currentChat.id;
        params.sender_id = this.user.id;
      }
      console.log("params sent", params);
      this.createMessage(params);
      this.currentChat.messages.push(message);

      /*
       * you can update message state after the server response
       */
      // timeout simulating the request
      // setTimeout(() => {
      //   message.uploaded = true;
      // }, 2000);
    },
    onClose(chatroom) {
      chatroom.visible = false;
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
