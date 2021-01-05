<template>
  <div class="trash-container">
    <div class="trash-part">
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
.trash-container {
  width: 100%;
  height: 60vh;
  justify-content: center;
  flex-wrap: wrap;
}
.trash-part {
  margin-top: 20px;
  width: 80%;
}
.md-card {
  margin: 8px;
  display: flex;
  flex-direction: column;
  border-radius: 5%;
  height: min-content;
  width: 190px;
  text-align: start;
  padding: 18px;
}
.content {
  font-weight: bold;
  font-size: 18px;
  max-width: 90%;
  opacity: 0.6;
  cursor: text;
  margin: 0px 0px 10px 0px;
}
.description {
  font-size: 16px;
  font-weight: 500;
}
.notebox-icons {
  display: flex;
  justify-content: space-between;
}
.md-icon {
  cursor: pointer;
}
</style>