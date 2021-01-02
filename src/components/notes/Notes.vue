<template>
  <div>
    <CreateNotes />
    <DisplayNotes v-bind:noteList="noteList" />
  </div>
</template>

<script>
import CreateNotes from "./CreateNote";
import DisplayNotes from "./DisplayNote";
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
        response.data.data.data.forEach((element) => {
          if(element.isDeleted == false && element.isArchived == false){
          this.noteList.push(element)
          }
        });
      });
    },
    fetchTrashList: function(){
      NoteService.fetchTrashNotesList()
      .then((response)=>{
        this.noteList = response.data.data.data;
      })
    }
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