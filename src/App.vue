<script setup>
import { sendMessage, fetchMessages } from "./db";
import { ref, reactive, onMounted } from "vue";

const inputUsername = ref("");
const inputMessage = ref("");

const state = reactive({ username: "", messages: [] });

onMounted(() => {
  fetchMessages(state);
});

const login = () => {
  if (inputUsername.value != "") {
    state.username = inputUsername.value;
    inputUsername.value = "";
  }
};

const logout = () => {
  state.username = "";
};
</script>

<template>
  <div class="view" v-if="state.username == ''">
    <form action="" @submit.prevent="login" class="login-form">
      <h1>Login to ViteChatApp</h1>
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        v-model="inputUsername"
        placeholder="Please enter your username..."
      />
      <input type="submit" value="Login" />
    </form>
  </div>
  <!-- Chat View -->
  <div class="view chat" v-else>
    <header>
      <button class="logout" @click="logout">Logout</button>
      <h1>Welcome, {{ state.username }}</h1>
    </header>
    <section>
      <div class="messages" v-for="message in state.messages" :key="message.id">
        <p>{{ message.username }}</p>
        <p>{{ message.content }}</p>
      </div>
      <form
        action=""
        @submit.prevent="
          sendMessage(state.username, inputMessage), (inputMessage = '')
        "
      >
        <input
          type="text"
          v-model="inputMessage"
          placeholder="write a message"
        />
        <input type="submit" value="Send" />
      </form>
    </section>
  </div>
</template>

<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  outline: none;
}
</style>
