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
  props: ["note"],
  methods: {
    PermanentDelete: function () {
      const data = {
        noteIdList: [this.note.id],
      };
      console.log(this.note.id);
      NoteService.deletePermanent(data).then(() => {
        eventBus.$emit("getDeletedInTrashList");
      });
    },
  },
};
</script>

<style scoped>
.delete-part {
  cursor: pointer;
}
</style> 