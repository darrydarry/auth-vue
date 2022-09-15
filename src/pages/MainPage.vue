<template>
  <div class="container">
    <div v-if="user" class="user-data">
      <p>Имя: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <p v-if="user.phone">Телефон: {{ user.phone }}</p>

      <button class="button-user" @click="edit">Редактировать</button>
    </div>

    <FormComponent
      v-else
      title="Форма для создания пользователя"
      buttonText="Создать"
      @submit="createUser"
    />
  </div>
</template>

<script>
import FormComponent from "../components/FormComponent.vue";
import { createUserEndpoint } from "../const/endpointsData";
import { getHeaders } from "../utils";

export default {
  name: "MainPage",

  components: {
    FormComponent,
  },
  data() {
    return {
      user: null,
    };
  },

  mounted() {
    const userData = localStorage.getItem("userData");
    if (userData) {
      this.user = JSON.parse(userData);
    }
  },

  methods: {
    edit() {
      this.$router.push({ name: "user", params: { id: this.user.auth_key } });
    },
    getHeaders,
    createUser(userData) {
      const body = JSON.stringify(userData);
      const headers = this.getHeaders(createUserEndpoint);

      fetch(createUserEndpoint.request.url, {
        method: "POST",
        headers,
        body,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          const user = JSON.stringify(res);

          localStorage.setItem("userData", user);
          this.user = res;
        });
    },
  },
};
</script>

<style>
.user-data {
  color: #ffffff;
  text-align: left;
}
</style>