<template>
  <v-app>
    <div class="outterContainer">
      <div class="innerContainer">
        <div class="left-container">
          <div class="color-logo">
            <span class="l1">F</span>
            <span class="l2">u</span>
            <span class="l3">n</span>
            <span class="l4">D</span>
            <span class="l5">o</span>
            <span class="l6">o</span>
          </div>
          <div class="lable"><span>Create your Google Account</span></div>
          <v-form ref="form" >
            <div class="name">
              <v-text-field
                v-model="firstName"
                :rules="[rules.min3,rules.required]"
                label="Firstname"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="lastName"
                class="ml"
                :rules="[rules.min3,rules.required]"
                label="Lastname"
                outlined
              ></v-text-field>
            </div>
            <v-text-field
              v-model="userName"
              :rules="[rules.required]"
              label="Username"
              outlined
            ></v-text-field>
            <div class="user-msg">You can use letters, numbers & periods</div>
            <div class="password">
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min8]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                outlined
                @click:append="show1 = !show1"
              ></v-text-field>
              <v-text-field
                class="ml"
                v-model="confirm"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min8,rules.passwordMatch]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Confirm"
                outlined
                @click:append="show1 = !show1"
              ></v-text-field>
            </div>
            <div class="pass-msg">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </div>
            <div class="buttons">
                <a href="">Sign in instead</a>
              <div class="button2">
                <v-btn @click="validate" color="primary">Next</v-btn>
              </div>
            </div>
          </v-form>
        </div>

        <div class="right-container">
          <div class="logo"><img src="../assets/account.svg" /></div>
          <div class="right-lable">
            <span>One account. All of Fundoo working for you.</span>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "SignUp",
  data: () => ({
    show1: false,
    firstName:"",
    lastName:"",
    userName:"",
    password: "",
    confirm: "",
    rules: {
      required: value => !!value || 'Required.',
      min8: (v) => v.length >= 8 || 'Min 8 characters',
      min3: (v) => v.length >= 3 || 'Min 3 characters',
      passwordMatch: () =>{
        (this.password == this.confirm) || 'Password must match'
      }
    },

  }),
  methods: {
      validate () {
        this.$refs.form.validate()
      },
  }
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
  width: 700px;
  display: flex;
  flex-direction: row;
  border: 1px solid lightgrey;
  border-radius: 8px;
  box-sizing: border-box;
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

.lable span {
  color: #202124;
  font-family: "Google Sans", "Noto Sans Myanmar UI", arial, sans-serif;
  font-size: 24px;
  font-weight: 400;
}
.lable {
  padding-top: 16px;
}
.name,
.password {
  padding-top: 20px;
  font-family: roboto, "Noto Sans Myanmar UI", arial, sans-serif;
  display: flex;
  flex-direction: row;
}

.ml {
  margin-left: 20px !important;
}
.right-container {
  padding-left: 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 100px;
}
.right-lable {
  padding-left: 30px;
}
.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.buttons a{
  display: flex;
  align-items: center;
  text-decoration: none; 
}
.v-btn {
  text-transform: none !important;
  letter-spacing: 0 !important;
  background-color: #ffffff !important;
  /* color: #1a73e8 !important; */
}

@media only screen and (max-width: 900px) {
  .right-container {
    display: none;
  }
  .innerContainer {
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
@media only screen and (max-width: 600px) {
  .innerContainer {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .ml {
    margin-left: 0px !important;
  }
  .name,
  .password {
    padding-top: 20px;
    font-family: roboto, "Noto Sans Myanmar UI", arial, sans-serif;
    display: flex;
    flex-direction: column;
  }
}
</style>

