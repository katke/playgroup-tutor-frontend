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
      rooms: [
        {
          roomId: 1,
          roomName: "Test",
          avatar: "assets/imgs/people.png",
          unreadCount: 4,
          index: 3,
          lastMessage: {
            content: "Last message received",
            senderId: 1234,
            username: "John Doe",
            timestamp: "10:20",
            saved: true,
            distributed: false,
            seen: false,
            new: true,
          },
          users: [
            {
              _id: 1234,
              username: "John Doe",
              avatar: "assets/imgs/doe.png",
              status: {
                state: "online",
                lastChanged: "today, 14:30",
              },
            },
            {
              _id: 4321,
              username: "John Snow",
              avatar: "assets/imgs/snow.png",
              status: {
                state: "offline",
                lastChanged: "14 July, 20:00",
              },
            },
          ],
          typingUsers: [4321],
        },
      ],
      messages: [
        {
          _id: 7890,
          indexId: 12092,
          content: "Message 1",
          senderId: 1234,
          username: "John Doe",
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
          // files: [
          //   {
          //     name: "My File",
          //     size: 67351,
          //     type: "png",
          //     audio: true,
          //     duration: 14.4,
          //     url: "https://firebasestorage.googleapis.com/...",
          //     preview: "data:image/png;base64,iVBORw0KGgoAA...",
          //   },
          // ],
          reactions: {},
          replyMessage: {
            content: "Reply Message",
            senderId: 4321,
            files: [
              {
                // name: "My Replied File",
                // size: 67351,
                // type: "png",
                // audio: true,
                // duration: 14.4,
                // url: "https://firebasestorage.googleapis.com/...",
                // preview: "data:image/png;base64,iVBORw0KGgoAA...",
              },
            ],
          },
        },
      ],
      currentUserId: 8,
      myMessages: [],
      friends: [],
    };
  },
  methods: {
    showFriends: function () {
      axios.get("/friends").then((response) => {
        this.friends = response.data;
        // this.showMessages(this.friends[0]);
        // Need to change it so this is a function, and waits for the messages to load..
        // vvv
        axios.get("/my-messages").then((response) => {
          this.myMessages = response.data.filter((message) => {
            return message.sender_id === this.friends[0].id || message.receiver_id === this.friends[0].id;
          });
          //  ^^^
          this.rooms[0].roomName = this.friends[0].first_name;
          this.rooms[0].avatar = this.friends[0].profile_picture;
          this.rooms[0].lastMessage.content = this.myMessages[0].text;
          this.rooms[0].lastMessage.senderId = this.friends[0].id;
          this.rooms[0].lastMessage.username = this.friends[0].first_name;
          this.rooms[0].users[0]._id = this.friends[0].id;
          this.rooms[0].users[0].username = this.friends[0].first_name;
          this.rooms[0].users[0].avatar = this.friends[0].profile_picture;
          this.rooms[1].users[1]._id = this.friends[1].id;
          this.rooms[1].users[1].username = this.friends[1].first_name;
          this.rooms[1].users[1].avatar = this.friends[1].profile_picture;

          console.log(this.rooms[0]);

          // users: [
          //   {
          //     _id: 1234,
          //     username: "John Doe",
          //     avatar: "assets/imgs/doe.png",
          //     status: {
          //       state: "online",
          //       lastChanged: "today, 14:30",
          //     },
          //   },
          //   {
          //     _id: 4321,
          //     username: "John Snow",
          //     avatar: "assets/imgs/snow.png",
          //     status: {
          //       state: "offline",
          //       lastChanged: "14 July, 20:00",
          //     },
          //   },
          // ],
        });
      });
    },
    showMessages: function (friend) {
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
    this.showFriends();
    // this.rooms[0].roomName = this.friends[0].first_name;
  },
};
</script>
