<template>
  <div class="create-note-container">
    <div class="note-mainpart">
      <div @click="display()">
        <md-card :class="{ header: isVisible }">
          <label class="title-first">Take a note....</label>
        </md-card>
      </div>
      <div id="notebox">
        <md-card
          id="note-card"
          :class="{ header: !isVisible }"
          v-bind:style="{ background: cardColor }"
        >
          <md-field md-inline>
            <label class="title">Title</label>
            <md-input v-model="title" @keyup.enter="addNote"></md-input>
          </md-field>

          <md-field md-inline>
            <label>Take a note....</label>
            <md-textarea v-model="description" @keyup.enter="addNote" md-autogrow> </md-textarea>
          </md-field>

          <div class="notebox-icons">
            <span>
              <IconColorPalette v-bind:createNote="createNote" />
              <IconArchive />
            </span>
            <button @click="addNote()">Close</button>
          </div>
          <md-snackbar
            md-position="left"
            :md-active.sync="showSnackbar"
            md-persistent
          >
            <span>{{ result }}</span>
          </md-snackbar>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
import IconArchive from "../icon/IconArchive";
import IconColorPalette from "../icon/IconColorPalette";
import NoteService from "../../services/noteService";
import { eventBus } from "../../main";
export default {
  components: { IconArchive, IconColorPalette },
  data() {
    return {
      isVisible: false,
      showSnackbar: false,
      isArchived: false,
      createNote: true,
      cardColor: "",
      title: "",
      description: "",
      result: "",
    };
  },
  methods: {
    addNote: function () {
      const note = {
        title: this.title,
        description: this.description,
        isArchived: this.isArchived,
        color: this.cardColor,
      };
      NoteService.getAddNote(note).then(() => {
        this.showSnackbar = true;
        this.result = "Note Add Successfully";
        this.title = "";
        this.description = "";
      });
      this.cardColor = "#ffffff";
      this.isVisible = false;
      this.isArchived = false;
      eventBus.$emit("getAfterUpdatedNoteList");
    },
    display: function () {
      this.isVisible = true;
    },
  },
  created() {
    eventBus.$on("getUpdatedColorOnNotes", (data) => {
      this.cardColor = data;
    });
    eventBus.$on("isArchived", (data) => {
      this.isArchived = data;
    });
  },
};
</script>

<style scoped>
.create-note-container {
  display: flex;
  justify-content: center;
}
/* #create-note-container {
  width: 100%;
  margin-right: 50%;
} */
/* #note-mainpart {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border-radius: 7px;
  width: 46%;
  margin-top: 5%;
  margin-left: 33%;
  box-shadow: 2px 3px 5px #a19f9f;
  padding: 10px;
  font-weight: 600;
  font-size: 18px;
  cursor: text;
} */
.note-mainpart {
  /* box-shadow: 0px 0px 5px 2px #a19f9f; */
  font-weight: 600;
  font-size: 18px;
  cursor: text;
  border-radius: 7px;
  width: 50%;
  margin: 15px 0px;
}
.header {
  display: none !important;
  opacity: 0.1;
}
.md-card {
  padding: 10px;
  display: flex;
  flex-direction: column;
  /* box-shadow: none; */
}
.md-field {
  font-size: 16px;
  font-weight: 600;
  margin-top: -4%;
}
/* #notebox {
  width: 100%;
} */
.notebox-icons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* margin-top: -5%; */
}
.notebox-icons > button {
  width: 15%;
  font-size: 15px;
  display: flex;
  border: none;
  cursor: pointer;
  background-color: transparent;
}
.md-field:after,
.md-field:before {
  position: relative;
}
span {
  display: flex;
  flex-direction: row;
}
.title-first {
  opacity: 0.5;
  /* margin-right: 374px; */
}
</style>