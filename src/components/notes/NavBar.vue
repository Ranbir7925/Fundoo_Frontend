<template>
  <v-app>
    <div class="toolbar-container">
      <v-toolbar class="toolbar" flat height="72px">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <img src="../../assets/keep.png" />
        <v-toolbar-title id="title">Fundoo</v-toolbar-title>
        <v-text-field
          v-model="searchText"
          class="textfield"
          placeholder="Search.."
          hide-details
          prepend-inner-icon="mdi-magnify"
          autocomplete="off"
          outlined
        ></v-text-field>
        <div class="toolbar-end">
          <md-menu md-size="huge" md-align-trigger>
            <md-button class="md-icon-button" md-menu-trigger>
              <md-avatar class="md-avatar-icon">{{ initialName }}</md-avatar>
            </md-button>
            <md-menu-content>
              <div class="profile">
                  <input type="file" ref="file" style="display: none">

                <md-button @click="$refs.file.click()" class="md-icon-button">
                  <md-avatar class="md-avatar-icon">{{
                    initialName
                  }}</md-avatar>
                </md-button>

                <label class="profile-name"> {{ userName }}</label>
                <label class="profile-email">{{ email }}</label>
                <md-button id="signout" @click="signout">Signout</md-button>
              </div>
            </md-menu-content>
          </md-menu>
        </div>
      </v-toolbar>
      <div class="outer">
        <div class="navbar">
          <v-navigation-drawer expand-on-hover>
            <v-list nav height="100vh">
              <v-list-item class="item1" @click="goto('Notes')">
                <v-list-item-icon>
                  <md-icon>emoji_objects</md-icon>
                </v-list-item-icon>
                <v-list-item-title>Notes</v-list-item-title>
              </v-list-item>
              <v-list-item class="item1" link>
                <v-list-item-icon>
                  <md-icon>notifications</md-icon>
                </v-list-item-icon>
                <v-list-item-title>Reminder</v-list-item-title>
              </v-list-item>
              <v-list-item class="item1">
                <v-list-item-icon>
                  <md-icon>edit</md-icon>
                </v-list-item-icon>
                <v-list-item-title>Edit Lables</v-list-item-title>
              </v-list-item>
              <v-list-item class="item1" @click="goto('Archive')">
                <v-list-item-icon>
                  <md-icon>archive</md-icon>
                </v-list-item-icon>
                <v-list-item-title>Archive</v-list-item-title>
              </v-list-item>
              <v-list-item class="item1" @click="goto('Trash')">
                <v-list-item-icon>
                  <md-icon>delete</md-icon>
                </v-list-item-icon>
                <v-list-item-title>Trash</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </div>
        <div class="components">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </v-app>
</template>
<script>
import { eventBus } from "../../main";
export default {
  name: "NavBar",
  data() {
    return {
      userName: "",
      initialName: "",
      email: "",
      searchText: "",
    };
  },
  watch: {
    searchText: function () {
      eventBus.$emit("searchNotesWithTitle", this.searchText);
    },
  },
  methods: {
    goto(selectedOption) {
      if (selectedOption == "Notes") {
        this.$router.push("notes");
      }
      if (selectedOption == "Trash") {
        this.$router.push("trash");
      }
      if (selectedOption == "Archive") {
        this.$router.push("archive");
      }
    },
    signout: function () {
      localStorage.removeItem("access_token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      this.$router.push("/signIn");
    },
  },
  created() {
    this.userName = localStorage.getItem("username");
    this.email = localStorage.getItem("email");
    this.initialName = this.userName.charAt(0);
  },
};
</script>

<style  scoped>
.toolbar {
  background-color: #fff !important;
  border-bottom: 1px solid silver !important;
}
img {
  width: 50px;
}
#title {
  color: #5f6368;
  font-family: "Product Sans", Arial, sans-serif;
  padding-right: 50px;
  padding-left: 15px;
}
.textfield {
  background-color: #f1f3f4;
      border-radius: 10px;
}
.toolbar-end {
  margin-left: 20%;
}
.item1:hover {
  cursor: pointer;
  background-color: rgb(255, 221, 177);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.outer {
  display: flex;
  flex-direction: row;
}
.components {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
@media screen and (max-width: 800px) {
  .textfield {
    display: none;
  }
}

.profile {
  width: 100%;
  border-radius: 65%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profile-name {
  padding: 10px 0px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px;
  font-weight: bolder;
}
.profile-email {
    padding: 10px 0px;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px;
  margin-top: -6%;
}
#signout {
  width: 28%;
  color: white;
  border-radius: 7px;
  color: black;
  border: 1px solid black;
}
#signout :hover {
  background-color: rgb(236, 229, 229);
}
#manage {
  margin-bottom: 7%;
  font-family: Arial, Helvetica, sans-serif;
  background-color: white;
  width: 99%;
  color: rgb(14, 12, 12);
  border-radius: 10px;
  font-size: 15px;
  border: 1px solid black;
  cursor: pointer;
}
#manage :hover {
  background-color: rgb(236, 229, 229);
}
.md-drawer {
  width: 17%;
}
</style>