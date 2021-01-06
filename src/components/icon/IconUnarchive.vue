<template>
  <div class="unarchive">
    <md-icon @click.native="unarchiveNotes">unarchive</md-icon>
  </div>
</template>

<script>
import NoteService from "../../services/noteService";
import { eventBus } from "../../main";
export default {
  name: "IconUnarchive",
  props: ["noteId"],
  methods: {
    unarchiveNotes: function () {
      const noteData = {
        isArchived: false,
        noteIdList: [this.noteId],
      };
      NoteService.unarchiveNotes(noteData).then(() => {
        eventBus.$emit("unarchivedNote");
      })
      .catch((error)=>{console.log(error)})
    },
  },
};
</script>

<style scoped>
.unarchive {
  cursor: pointer;
}
</style>  