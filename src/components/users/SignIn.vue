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
            <span>Sign in</span>
          </div>
          <div class="lable2">
            <span>Use your Fundoo Account</span>
          </div>
        </div>
        <v-form ref="form">
          <div class="inputfileds">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              :rules="[rules.required]"
              outlined
              required
              @keyup.enter="validate"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min8]"
              :type="show1 ? 'text' : 'password'" 
              name="input-10-1"
              label="Password"
              outlined
              @click:append="show1 = !show1"
              @keyup.enter="validate"
            ></v-text-field>
          </div>
          <div class="buttons">
            <div class="forgotButton">
              <router-link to="/ForgotPassword">Forgot Password?</router-link>
            </div>
            <div class="nextButton">
              <router-link to="/signUp">Create account</router-link>
              <v-btn @click="validate"   color="primary">Next</v-btn>
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
  name: "SignUp",
  data: () => ({
    show1: false,
    showSnackbar: false,
    email: "",
    password: "",
    message: "",
    rules: {
      required: (value) => !!value || "Required.",
      min8: (v) => v.length >= 8 || "Min 8 characters",
    },
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const signInData = {
          email: this.email,
          password: this.password,
        };

        userService
          .loginUser(signInData)
          .then((response) => {
            this.showSnackbar = true;
            this.message = "Login Successful";
            localStorage.setItem("access_token", response.data.id);
            localStorage.setItem("username", response.data.firstName);
            localStorage.setItem("email", response.data.email);
            setTimeout(()=>  this.$router.push("/dashboard/notes"), 2000)
          })
          .catch((err) => {
            console.log(err);
            this.showSnackbar = true;
            this.message = "Invalid credentials";
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