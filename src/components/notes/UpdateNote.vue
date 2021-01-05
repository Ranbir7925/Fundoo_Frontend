<template>
  <div>
    <md-dialog :md-active.sync="showUpdateBox">
      <md-card id="updateNoteCard">
        <md-field>
          <md-input v-model="title"> </md-input>
        </md-field>

        <md-field>
          <md-textarea v-model="description" md-autogrow></md-textarea>
        </md-field>

        <div class="notebox-icons">
          <span>
            <IconColorPalette v-bind:note="noteId" />
            <IconArchive v-bind:note="noteId" />
          </span>
          <button @click="closeDialogBox()">Close</button>
        </div>
      </md-card>
    </md-dialog>
  </div>
</template>

<script>
import IconColorPalette from "../icon/IconColorPalette";
import IconArchive from "../icon/IconArchive";
import NoteService from "../../services/noteService";
import { eventBus } from "../../main";
export default {
  name: "UpdateNote",
  props: ["showUpdateBox", "noteData"],
  components: {
    IconColorPalette,
    IconArchive,
  },
  data() {
    return {
      title: "",
      description: "",
      noteId: "",
      color: "",
      showUpdateBoxNew : this.showUpdateBox
    };
  },
  methods: {
    closeDialogBox: function () {
      const updateData = {
        noteId: this.noteId,
        title: this.title,
        description: this.description,
      };
      NoteService.updateNotes(updateData)
        .then(() => {
          this.showUpdateBoxNew = false;
          this.isArchived = false;
          eventBus.$emit("closeDialogBox", this.showUpdateBoxNew);
          eventBus.$emit("getAfterUpdatedNoteList");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    eventBus.$on("'getUpdated", (data) => {
      this.color = data;
    });
  },
  mounted() {
    this.noteId = this.$props.noteData.id;
    this.title = this.$props.noteData.title;
    this.description = this.$props.noteData.description;
    this.color = this.$props.noteData.color;
  },
};
</script>

<style scoped>
#updateNoteCard {
  border-radius: 10px;
}
.md-dialog .md-dialog-container {
  width: 40%;
  min-height: 20vh;
  border-radius: 10px;
}
.notebox-icons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.notebox-icons > button {
  width: 15%;
  font-size: 15px;
  display: flex;
  border: none;
  cursor: pointer;
  background-color: transparent;
}
.md-card {
  padding: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: none;
}
.md-field {
  font-weight: 600;
  margin: 0%;
  font-size: 16px;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
}
.md-field:after,
.md-field:before {
  position: relative;
}
span {
  display: flex;
}
</style>