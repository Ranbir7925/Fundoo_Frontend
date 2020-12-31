<template>
  <div class="create-note">
    <div class="note">
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
            <md-input v-model="title"></md-input>
          </md-field>

          <md-field md-inline>
            <label>Take a note....</label>
            <md-textarea v-model="description" md-autogrow> </md-textarea>
          </md-field>

          <div class="notebox-icons">
            <span>
               <IconArchive />
            </span>
            <button @click="addNote">Close</button>
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
import NoteService from "../../services/noteService";
import IconArchive from './IconArchive'
import { eventBus } from "../../main"
export default {
  components:{IconArchive},
  data() {
    return {
      isVisible: false,
      showSnackbar: false,
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
      };
      NoteService.getAddNote(note).then((response) => {
        console.log("result", response.data);
        this.result = "Note Add Successfully";
        this.title = "";
        this.description = "";
      });
      this.isVisible = false;
      eventBus.$emit("getAfterUpdatedNoteList");
    },
    display: function () {
      this.isVisible = true;
    },
  },
};
</script>

<style scoped>
.create-note {
  display: flex;
  justify-content: flex-start;
}
.note {
  /* display: flex; */
  /* align-items: flex-start; */
  /* justify-content: center; */
  border-radius: 7px;
  width: 46%;
  margin-top: 3%;
  /* margin-left: 33%; */
  box-shadow: 0px 0px 5px 2px #a19f9f;
  padding: 10px;
  font-weight: 600;
  font-size: 18px;
  cursor: text;
}
.header {
  display: none !important;
  opacity: 0.1;
}
.md-card {
  background-color: transparent;
  padding: 4px;
  display: flex;
  flex-direction: column;
  box-shadow: none;
}
.md-field {
  font-size: 16px;
  font-weight: 600;
  margin-top: -4%;
}
.title-first {
  opacity: 0.5;
  margin-right: 374px;
}

.md-field:after,
.md-field:before {
  position: relative;
}
.create-note {
  display: flex;
  justify-content: center;
}
</style>