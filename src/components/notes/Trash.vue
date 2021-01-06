<template>
  <div class="trash-outter-container">
    <div class="trash-container">
      <DisplayNote
        v-bind:noteList="filteredList"
        v-bind:iconCategory="iconCategory"
      />
    </div>
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
import DisplayNote from "./DisplayNote";
import NoteService from "../../services/noteService";
import { eventBus } from "../../main";
export default {
  name: "Trash",
  data() {
    return {
      trashList: [],
      iconCategory: "trash",
      showSnackbar: false,
      result: "",
      searchText:'',
    };
  },
  components: {
    DisplayNote,
  },
  methods: {
    fetchTrashList: function () {
      NoteService.fetchTrashNotesList().then((response) => {
        this.trashList = response.data.data.data;
      })
      .catch((error)=>{console.log(error)})
    },
  },
  created() {
    this.fetchTrashList();
    eventBus.$on("getDeletedInTrashList", () => {
      this.trashList = [];
      this.fetchTrashList();
      this.showSnackbar = true;
      this.result = "Permanently Delete Note Successfully";
    });
     eventBus.$on("searchNotesWithTitle", (data) => {
      this.searchText=data;
    });
  },
  computed:{
    filteredList:function(){
      return this.trashList.filter((note)=>{
        return note.title.match(this.searchText);
      })
    }
  }
};
</script>

<style scoped>
.trash-outter-container {
  justify-content: center;
  flex-wrap: wrap;
}
.trash-container {
  margin-top: 20px;
}

</style>