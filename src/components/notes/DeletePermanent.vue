<template>
  <div class="delete-part">
    <md-icon @click.native="PermanentDelete">delete_forever</md-icon>
  </div>
</template>

<script>
import { eventBus } from "../../main";
import NoteService from "../../services/noteService";
export default {
  name: "DeletePermanent",
  props: ["noteId"],
  methods: {
    PermanentDelete: function () {
      const data = {
        noteIdList: [this.noteId],
      };
      NoteService.deletePermanent(data).then(() => {
        eventBus.$emit("getDeletedInTrashList");
      })
      .catch(error => console.log(error))
    },
  },
};
</script>

<style scoped>
.delete-part {
  cursor: pointer;
}

</style> 