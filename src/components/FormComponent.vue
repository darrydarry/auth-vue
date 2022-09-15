<template>
  <form class="user-form" @submit.prevent="submit">
    <h2 class="title">{{ title }}</h2>
    <input
      type="text"
      v-model="form.name"
      placeholder="ФИО"
      class="input-user"
      @blur="validateName"
    />
    <p class="error-label">{{ errors.name }}</p>

    <input
      type="text"
      v-model="form.email"
      placeholder="Email"
      class="input-user"
      @blur="validateEmail"
    />
    <p class="error-label">{{ errors.email }}</p>

    <input
      v-if="phoneInput"
      v-mask="'+7 (###) ###-##-##'"
      :masked="false"
      type="text"
      v-model="form.phone"
      placeholder="Номер телефона"
      class="input-user"
      @blur="validatePhone"
    />
    <p class="error-label">{{ errors.phone }}</p>

    <button type="submit" class="button-user">{{ buttonText }}</button>
  </form>
</template>


<script>
import { mask } from "vue-the-mask";

export default {
  name: "FormComponent",
  directives: { mask },
  props: {
    phoneInput: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      default: "",
    },

    buttonText: {
      type: String,
      default: "",
    },

    initialUserData: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
      },
      errors: {
        name: "",
        email: "",
        phone: "",
      },
    };
  },

  watch: {
    initialUserData() {
      if (this.phoneInput) {
        for (const property in this.initialUserData) {
          if (this.form[property] || this.form[property] === "") {
            this.form[property] = this.initialUserData[property];
          }
        }
      }
    },
  },

  methods: {
    validate() {
      let isValidPhone = false
      const isValidName = this.validateName();
      const isValidEmail = this.validateEmail();
      if (this.phoneInput) {
        isValidPhone = this.validatePhone();
      } else {
        isValidPhone = true
      }

      return isValidName && isValidPhone && isValidEmail;
    },
    validateName() {
      if (!this.form.name.trim()) {
        this.errors.name = "Некорректно заполнено ФИО";
        return false;
      }

      this.errors.name = "";

      return true;
    },
    validatePhone() {
      if (this.form.phone) {
        this.form.phone = this.form.phone.replace(/\D/g, "");
      }
      if (this.form.phone.length < 10) {
        this.errors.phone = "Некорректно заполнен Номер телефона";
        return false;
      }

      this.errors.phone = "";

      return true;
    },
    validateEmail() {
      if (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
          this.form.email
        )
      ) {
        this.errors.email = "";

        return true;
      }

      this.errors.email = "Некорректно заполнен Email";

      return false;
    },
    submit() {
      const data = { name: this.form.name, email: this.form.email };

      if (!this.validate()) {
        return;
      }

      if (this.phoneInput) {
        data.phone = this.form.phone;
      }

      this.$emit("submit", data);
    },
  },
};
</script>

<style>
.input-user {
  background: #2b2b2b;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  color: #767676;
  border: none;
  padding: 12px 15px;
  outline: none;
  margin-bottom: 16px;
}

.title {
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  margin: 0 0 20px 0;
}

.user-form {
  padding: 40px;
  box-shadow: 0px 0px 7px 1px rgb(255 255 255 / 10%);
  display: flex;
  flex-direction: column;
  border-radius: 12px;
}

.button-user {
  background: #222222;
  border: 1px solid #343434;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 15px;
  padding: 15px 10px;
  color: #ffffff;
  cursor: pointer;
}

.button-user:hover {
  background: #333333;
}

.user-form .error-label {
  margin-top: 0;
  text-align: start;
  font-size: 14px;
  color: #f93838;
}
</style>