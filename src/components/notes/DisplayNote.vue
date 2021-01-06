<template>
  <div class="display-notes">
    <div class="note-cards" v-for="note in noteList" :key="note.id">
      <md-card md-with-hover v-bind:style="{ background: note.color }">
        <div class="card-items" @click="updateBoxData(note)">
          <label class="content-part">{{ note.title }}</label>
          <label class="description-part">{{ note.description }}</label>
        </div>

        <div v-if="iconCategory == 'trash'" class="notebox-icons">
          <DeletePermanent v-bind:noteId="note.id" />
        </div>
        <div v-else-if="iconCategory == 'archive'" class="icon-notes">
          <IconUnarchive v-bind:noteId="note.id"/>
        </div>
        <div v-else class="icon-notes">
          <IconColorPalette v-bind:note="note.id" />
          <IconArchive  v-bind:note="note.id"/>
          <DeleteNote v-bind:note="note.id" />
        </div>
      </md-card>
    </div>
    <UpdateNote
      v-if="showUpdateBox"
      v-bind:showUpdateBox="showUpdateBox"
      v-bind:noteData="noteData"
    />
    <md-snackbar
      md-position="left"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{ result }}</span>
    </md-snackbar>
  </div>
</template>

<script>
import IconArchive from "../icon/IconArchive";
import IconColorPalette from "../icon/IconColorPalette";
import DeleteNote from "./DeleteNote";
import UpdateNote from "./UpdateNote";
import DeletePermanent from "./DeletePermanent";
import IconUnarchive from '../icon/IconUnarchive'
import { eventBus } from "../../main";
export default {
  name: "DisplayNotes",
  props: ["noteList", "iconCategory"],
  data() {
    return {
      showUpdateBox: false,
      showSnackbar: false,
      noteData: {},
      result: "",
    };
  },
  components: {
    IconArchive,
    IconColorPalette,
    DeletePermanent,
    DeleteNote,
    UpdateNote,
    IconUnarchive
  },
  methods: {
    updateBoxData: function (note) {
      this.showUpdateBox = true;
      this.noteData = note;
    },
  },
  created() {
    eventBus.$on("closeDialogBox", (data) => {
      this.showUpdateBox = data;
      this.showSnackbar = true;
      this.result = "Update Note Successfully";
    });
  },
};
</script>

<style scoped>
.display-notes {
  margin-left: 3%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.card-items {
  display: flex;
  flex-direction: column;
}
.md-card {
  width: 290px;
  margin: 8px;
  padding: 18px;
  border-radius: 5%;
}
.content-part {
  word-break: break-word;
  font-weight: bold;
  font-size: 18px;
  cursor: text;
  opacity: 0.6;
  margin: 0px 0px 10px 0px;
}
.description-part {
  font-weight: bold;
  word-break: break-word;
  opacity: 0.6;
  font-size: 18px;
  margin: 0px 0px 10px 0px;
  font-size: 16px;
  font-weight: 500;
  cursor: text;
}
.icon-notes {
  justify-content: flex-start;
  display: flex;
  flex-direction: row;
}
@media screen and (max-width: 1024px) {
  .md-card {
    margin: 8px;
    width: 230px;
  }
}
@media screen and (max-width: 480-px) {
  .md-card {
    margin: 8px;
    width: 230px;
  }
}
@media screen and (max-width: 320px) {
  .md-card {
    margin: 8px;
    width: 230px;
  }
}
</style>