<template>
  <v-app>
    <div class="outterContainer">
      <div class="innerContainer">
        <div class="lableContainer">
          <div class="color-logo">
            <span class="l1">F</span>
            <span class="l2">u</span>
            <span class="l3">n</span>
            <span class="l4">D</span>
            <span class="l5">o</span>
            <span class="l6">o</span>
          </div>
          <div class="lable">
            <span>Reset password</span>
          </div>
          <div class="lable2">
            <span>Use your Fundoo Account</span>
          </div>
        </div>
        <v-form ref="form">
          <div class="inputfileds">
            <v-text-field
              v-model="password"
              :rules="[rules.required, rules.min8]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              outlined
            ></v-text-field>
            <v-text-field
              class="ml"
              v-model="confirm"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min8]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Confirm"
              outlined
              @click:append="show1 = !show1"
            ></v-text-field>
          </div>
          <div class="buttons">
            <div class="nextButton">
              <a href="http://localhost:8080/user/signUp">Create account</a>
              <v-btn @click="validate" color="primary">Next</v-btn>
            </div>
          </div>
        </v-form>
      </div>
    </div>
    <md-snackbar
      md-position="left"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{ message }}</span>
    </md-snackbar>
  </v-app>
</template>

<script>
import userService from "../../services/userService";

export default {
  name: "ResetPassword",
  data: () => ({
    show1: false,
    showSnackbar: false,
    message: "",
    password: "",
    confirm: "",
    rules: {
      required: (value) => !!value || "Required.",
      min8: (v) => v.length >= 8 || "Min 8 characters",
    },
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate() && this.password == this.confirm) {
        const resetPasswordData = {
          newPassword: this.password,
        };
        const token = this.$route.params.token;
        userService
          .resetPassword(resetPasswordData, token)
          .then((response) => {
            if (response.status == 204) {
              this.showSnackbar = true;
              this.message = "Password changed successfully..";
              setTimeout(() => this.$router.push("/signIn"), 2000);
            }
          })
          .catch((err) => {
            console.log(err);
            this.showSnackbar = true;
            this.message = "Error occured please try again";
          });
      }
    },
  },
};
</script>

<style scoped>
.outterContainer {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.innerContainer {
  padding: 48px 40px 36px 40px;
  width: 460px;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgrey;
  border-radius: 8px;
  box-sizing: border-box;
}
.lableContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.l1 {
  font-size: 20px;
  color: rgb(66, 133, 244);
}
.l2 {
  font-size: 20px;
  color: rgb(234, 67, 53);
}
.l3 {
  font-size: 20px;
  color: rgb(251, 188, 5);
}
.l4 {
  font-size: 20px;
  color: rgb(66, 133, 244);
}
.l5 {
  font-size: 20px;
  color: rgb(52, 168, 83);
}
.l6 {
  font-size: 20px;
  color: rgb(234, 67, 53);
}

.lable {
  color: #202124;
  padding-bottom: 0;
  padding-top: 16px;
  font-family: "Google Sans", "Noto Sans Myanmar UI", arial, sans-serif;
  font-size: 24px;
  font-weight: 400;
}

.lable2 {
  color: #202124;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.1px;
  line-height: 1.5;
  padding-bottom: 0;
  padding-top: 8px;
}
.inputfileds {
  padding-top: 24px;
}
.v-btn {
  text-transform: none !important;
  letter-spacing: 0 !important;
  background-color: #ffffff !important;
  /* color: #1a73e8 !important; */
}
.forgotButton a,
.nextButton a {
  display: flex;
  align-items: center;
  text-decoration: none;
}
.nextButton {
  display: flex;
  justify-content: space-between;
}
@media only screen and (max-width: 600px) {
  .innerContainer {
    border: 0px;
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
</style>