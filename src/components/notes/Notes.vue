<template>
  <div>
    <CreateNotes />
    <DisplayNotes v-bind:noteList="noteList" />
  </div>
</template>
<script>
import CreateNotes from "../notes/CreateNote";
import DisplayNotes from "../notes/DisplayNote";
import NoteService from "../../services/noteService";
import { eventBus } from "../../main";
export default {
  components: { CreateNotes, DisplayNotes },
  data() {
    return {
      noteList: [],
    };
  },
  methods: {
    fetchNotes: function () {
      NoteService.fetchNotesList().then((response) => {
        // console.log(response.data.data.data);
        response.data.data.data.forEach((element) => {
          this.noteList.push(element)
        });

        // this.noteList = response.data.data;
      });
    },
  },
  created() {
    this.fetchNotes();
    eventBus.$on("getAfterUpdatedNoteList", () => {
      this.noteList = [];
      this.fetchNotes();
    });
    eventBus.$emit("sendIdList",this.noteList.id)
  },
};
</script>