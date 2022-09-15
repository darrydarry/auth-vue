<template>
  <div>
    <div class="container">
      <button class="button-user" @click="$router.go(-1)">Назад</button>
    </div>
    <div class="container">
      <FormComponent
        phoneInput
        title="Форма для редактирования пользователя"
        buttonText="Сохранить"
        :initialUserData="userData"
        @submit="updateUser"
      />
    </div>
  </div>
</template>

<script>
import { updateUserEndpoint, getUserEndpoint } from "../const/endpointsData.js";
import { getHeaders } from "../utils";
import FormComponent from "../components/FormComponent.vue";

export default {
  name: "EditPage",

  components: {
    FormComponent,
  },
  data() {
    return {
      userData: {},
    };
  },
  methods: {
    getHeaders,
    updateUser(userData) {
      const body = JSON.stringify(userData);

      fetch(updateUserEndpoint.request.url, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=utf-8",
          Authorization: `Bearer ${this.$route.params.id}`,
        },
        body,
      })
        .then((res) => res.json())
        .then((res) => {
          const updatedUser = JSON.stringify(res);
          localStorage.setItem("userData", updatedUser);
          this.$router.go(-1);
        });
    },
  },
  created() {
    fetch(getUserEndpoint.request.url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.$route.params.id}`,
      },
    })
      .then((res) => res.json())
      .then((res) => (this.userData = res));
  },
};
</script>

<style>
</style>