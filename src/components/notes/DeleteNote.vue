<template>
  <div class="delete-Notes" @click="DeletedNotesInTrash()">
    <md-icon>delete</md-icon>
    <md-tooltip md-direction="bottom">Delete</md-tooltip>
  </div>
</template>

<script>
import { eventBus } from "../../main";
import NoteService from "../../services/noteService";
export default {
  name: "DeleteNotes",
  props: ["note"],
  data() {
    return {
      showSnackbar: false,
    };
  },
  methods: {
    DeletedNotesInTrash: function () {
      const trashData = {
        noteIdList: [this.note],
        isDeleted: true,
      };
      NoteService.DeletedNoteMoveToTrash(trashData)
        .then(() => {
          eventBus.$emit("getAfterUpdatedNoteList");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.delete-Notes {
  cursor: pointer;
}
</style> 