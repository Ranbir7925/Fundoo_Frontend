<template>
  <div>
    <CreateNotes />
    <DisplayNotes v-bind:noteList="filteredList" />
    <md-snackbar
      md-position="left"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{ result }}</span>
    </md-snackbar>
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
      searchText:'',
      showSnackbar:false,
      result:''
    };
  },
  methods: {
    fetchNotes: function () {
      NoteService.fetchNotesList().then((response) => {
        response.data.data.data.forEach((element) => {
          if (element.isDeleted == false && element.isArchived == false) {
            this.noteList.push(element);
          }
        });
      });
    },
    fetchTrashList: function () {
      NoteService.fetchTrashNotesList().then((response) => {
        this.noteList = response.data.data.data;
      })
      .catch((error)=>{console.log(error);})
    },
  },
  created() {
    this.fetchNotes();
    eventBus.$on("searchNotesWithTitle", (data) => {
      this.searchText=data
    })
    eventBus.$on("getAfterUpdatedNoteList", () => {
      this.noteList = [];
      this.fetchNotes();
    });
  },
  computed:{
    filteredList:function(){
      return this.noteList
      .filter((note)=>{
        return note.title.match(this.searchText);
      })
    }
  }
};
</script>