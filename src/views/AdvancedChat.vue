<template>
  <chat-window
    :height="screenHeight"
    :styles="styles"
    :current-user-id="currentUserId"
    :rooms="rooms"
    :messages="messages"
    :loading-rooms="loadingRooms"
    :rooms-loaded="roomsLoaded"
    :messages-loaded="messagesLoaded"
  />
</template>

<script>
import ChatWindow from "vue-advanced-chat";
import "vue-advanced-chat/dist/vue-advanced-chat.css";
import axios from "axios";
// <need to download some component? idk >import { parseTimestamp } from "@/utils/dates";

export default {
  components: {
    ChatWindow,
  },
  data() {
    return {
      friend: { first_name: "Wilma" },
      roomsPerPage: 15,
      rooms: [],
      roomId: "",
      startRooms: null,
      endRooms: null,
      roomsLoaded: false,
      loadingRooms: true,
      allUsers: [],
      loadingLastMessageByRoom: 0,
      roomsLoadedCount: false,
      selectedRoom: null,
      messagesPerPage: 20,
      messages: [],
      messagesLoaded: false,
      roomMessage: "",
      startMessages: null,
      endMessages: null,
      roomsListeners: [],
      listeners: [],
      typingMessageCache: "",
      disableForm: false,
      addNewRoom: null,
      addRoomUsername: "",
      inviteRoomId: null,
      invitedUsername: "",
      removeRoomId: null,
      removeUserId: "",
      removeUsers: [],
      roomActions: [
        { name: "inviteUser", title: "Invite User" },
        { name: "removeUser", title: "Remove User" },
        { name: "deleteRoom", title: "Delete Room" },
      ],
      menuActions: [
        { name: "inviteUser", title: "Invite User" },
        { name: "removeUser", title: "Remove User" },
        { name: "deleteRoom", title: "Delete Room" },
      ],
      styles: { container: { borderRadius: "4px" } },
      templatesText: [
        {
          tag: "help",
          text: "This is the help",
        },
        {
          tag: "action",
          text: "This is the action",
        },
        {
          tag: "action 2",
          text: "This is the second action",
        },
      ],
      currentUserId: localStorage.user_id,
      myMessages: [],
      friends: [],
    };
  },
  methods: {
    test: function () {},
    loadChatroomData: function () {
      axios.get("/friends").then((response) => {
        this.friends = response.data;
        console.log("my friends", response);
        axios.get("/my-messages").then((response) => {
          this.myMessages = response.data;
          console.log("my messages", response.data);

          console.log(response.data[0].created_at.substring(0, 4));

          console.log("BIG TEST", this.formatMessage(response.data[0]));
          const rooms = [];
          this.friends.forEach((friend) => {
            rooms.push({
              roomId: friend.id,
              roomName: friend.first_name,
              avatar: friend.profile_picture,
              unreadCount: 0,
              index: 1,
              typingUsers: [4321],
              lastMessage: this.messages[0],
              users: [
                {
                  _id: localStorage.user_id,
                  username: localStorage.first_name,
                  avatar: localStorage.profile_picture,
                  status: {
                    state: "online",
                    lastChanged: "14 July, 20:00",
                  },
                },
                {
                  _id: friend.id,
                  username: friend.first_name,
                  avatar: friend.profile_picture,
                  status: {
                    state: "online",
                    lastChanged: "14 July, 20:00",
                  },
                },
              ],
            });
          });
          this.rooms = rooms;
        });
      });
    },

    //   >>>>>>>>>> CHAT PRESET FUNCTIONS <<<<<<<<<<
    fetchMessages({ room, options = {} }) {
      this.$emit("show-demo-options", false);

      if (options.reset) {
        this.resetMessages();
        this.roomId = room.roomId;
      }

      if (this.endMessages && !this.startMessages) {
        return (this.messagesLoaded = true);
      }

      let ref = "test";

      let query = ref.orderBy("timestamp", "desc").limit(this.messagesPerPage);

      if (this.startMessages) query = query.startAfter(this.startMessages);

      this.selectedRoom = room.roomId;

      query.get().then((messages) => {
        // this.incrementDbCounter('Fetch Room Messages', messages.size)
        if (this.selectedRoom !== room.roomId) return;

        if (messages.empty || messages.docs.length < this.messagesPerPage) {
          setTimeout(() => (this.messagesLoaded = true), 0);
        }

        if (this.startMessages) this.endMessages = this.startMessages;
        this.startMessages = messages.docs[messages.docs.length - 1];

        let listenerQuery = ref.orderBy("timestamp");

        if (this.startMessages) {
          listenerQuery = listenerQuery.startAt(this.startMessages);
        }
        if (this.endMessages) {
          listenerQuery = listenerQuery.endAt(this.endMessages);
        }

        if (options.reset) this.messages = [];

        messages.forEach((message) => {
          const formattedMessage = this.formatMessage(room, message);
          this.messages.unshift(formattedMessage);
        });

        const listener = listenerQuery.onSnapshot((snapshots) => {
          // this.incrementDbCounter('Listen Room Messages', snapshots.size)
          this.listenMessages(snapshots, room);
        });
        this.listeners.push(listener);
      });
    },
    formatMessage(room, message) {
      const senderUser = message.sender;

      const { timestamp } = message.created_at;

      const formattedMessage = {
        ...message,
        ...{
          senderId: message.sender_id,
          _id: message.id,
          seconds: timestamp.seconds,
          timestamp: "10:23",
          date: "21 10 1999",
          username: senderUser.first_name,
          // avatar: senderUser ? senderUser.avatar : null,
          distributed: true,
        },
      };

      if (message.replyMessage) {
        formattedMessage.replyMessage = {
          ...message.replyMessage,
          ...{
            senderId: message.replyMessage.sender_id,
          },
        };
      }

      return formattedMessage;
    },
  },
  computed: {
    screenHeight() {
      return this.isDevice ? window.innerHeight + "px" : "calc(100vh - 80px)";
    },
  },
  created() {
    this.currentUserId = localStorage.user_id;
    this.loadChatroomData();
    // this.rooms[0].roomName = this.friends[0].first_name;
  },
};
</script>
