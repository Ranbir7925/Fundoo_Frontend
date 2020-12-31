<template>
  <v-app>
    <div class="toolbar-container">
      <v-toolbar class="toolbar" flat height="72px">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <img src="../../assets/keep.png" />
        <v-toolbar-title id="title">Fundoo</v-toolbar-title>
        <v-text-field
          class="textfield"
          placeholder="Search.."
          hide-details
          prepend-inner-icon="mdi-magnify"
          autocomplete="off"
          outlined
        ></v-text-field>
        <div class="toolbar-end">
          <v-btn icon>
            <md-icon>refresh</md-icon>
          </v-btn>

          <v-btn icon>
            <md-icon>settings</md-icon>
          </v-btn>

          <v-btn icon>
            <md-icon>account_circle</md-icon>
          </v-btn>
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
              <v-list-item class="item1" link>
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
export default {
  data() {
    return {};
  },
  methods: {
    goto(selectedOption){
      if (selectedOption == "Notes") {
        this.$router.push("notes");
      }
      if (selectedOption == "Trash") {
        console.log("WDWd");
        this.$router.push("trash");
      }
      if (selectedOption == "Archive") {
        this.$router.push("archive");
      }
    }
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
  background-color: #eee;
}
.toolbar-end {
  margin-left: 15%;
}
.item1:hover {
  cursor: pointer;
  background-color: rgb(255, 221, 177);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.outer{
  display: flex;
  flex-direction: row;
}
.components{
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
</style>