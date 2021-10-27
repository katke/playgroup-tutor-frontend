<template>
  <chat-window :current-user-id="currentUserId" :rooms="rooms" :messages="messages" />
</template>

<script>
import ChatWindow from "vue-advanced-chat";
import "vue-advanced-chat/dist/vue-advanced-chat.css";
import axios from "axios";

export default {
  components: {
    ChatWindow,
  },
  data() {
    return {
      friend: { first_name: "Wilma" },
      rooms: [],
      messages: [
        {
          _id: 1,
          indexId: 8,
          content: "Message 1",
          senderId: 4,
          username: "Wilma",
          avatar: "assets/imgs/doe.png",
          date: "13 November",
          timestamp: "10:20",
          system: false,
          saved: true,
          distributed: true,
          seen: true,
          deleted: false,
          disableActions: false,
          disableReactions: false,
          files: [{}],
          reactions: {},
          replyMessage: {
            content: "Reply Message",
            senderId: 4321,
            files: [{}],
          },
        },
      ],
      currentUserId: 8,
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
          const rooms = [];
          this.friends.forEach((friend) => {
            rooms.push({
              roomId: friend.id,
              roomName: friend.first_name,
              avatar: friend.profile_picture,
              unreadCount: 0,
              index: 1,
              typingUsers: [4321],
              lastMessage: {
                content: "test",
                senderId: friend.id,
                username: friend.first_name,
                timestamp: "10:20",
                saved: true,
                distributed: false,
                seen: false,
                new: true,
              },
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
    loadMessages: function (friend) {
      // this.current_friend = friend;
      axios.get("/my-messages").then((response) => {
        this.myMessages = response.data.filter((message) => {
          return message.sender_id === friend.id || message.receiver_id === friend.id;
        });
        console.log(this.myMessages);
      });
    },
  },
  created() {
    this.currentUserId = localStorage.user_id;
    this.loadChatroomData();
    // this.rooms[0].roomName = this.friends[0].first_name;
  },
};
</script>
