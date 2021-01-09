<template>
  <div class="archive">
    <md-icon @click.native="sendToArchive">archive</md-icon>
    <md-tooltip md-direction="bottom">Archive</md-tooltip>
  </div>
</template>

<script>
import NoteService from "../../services/noteService";
import { eventBus } from "../../main";
export default {
  name: "IconArchive",
  props: ["note"],
  data() {
    return {
      showSnackbar: false,
      result: "",
    };
  },
  methods: {
    sendToArchive: function () {
      const archiveData = {
        isArchived: true,
        noteIdList: [this.note],
      };
      NoteService.archiveNotes(archiveData)
        .then(() => {
          eventBus.$emit("getAfterUpdatedNoteList");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
<style>
.archive {
  cursor: pointer;
  margin-left: 5px;
}
</style>