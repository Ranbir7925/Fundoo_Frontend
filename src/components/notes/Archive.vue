<template>
  <div class="archive-display">
    <DisplayNote
      v-bind:noteList="filteredList"
      v-bind:iconCategory="iconCategory"
    />
     <md-snackbar 
        md-position="left" 
        :md-active.sync="showSnackbar" 
        md-persistent>
      <span>{{result}}</span>
    </md-snackbar> 
  </div>
</template>

<script>
import DisplayNote from "./DisplayNote"
import NoteService from '../../services/noteService'
import { eventBus } from '../../main'
export default {
    name:"Archive",
    components:{DisplayNote},
    data(){
        return{
            archiveList:[],
            iconCategory:"archive",
            searchText:'',
            showSnackbar:false, 
      result: "",
        }
    },
    methods:{
    fetchArchiveList: function () {
      NoteService.fetchArchiveNotes().then((response) => {
        this.archiveList = response.data.data.data;
      });
    },
  },
  created() {
    this.fetchArchiveList();
    eventBus.$on("unarchivedNote", () => {
      this.archiveList = [];
      this.fetchArchiveList();
      this.showSnackbar=true
      this.result = "UnArchive Note Successfully"; 
    });
    eventBus.$on("searchCard", (data) => {
      this.searchText=data;
    });
  },
  computed:{
    filteredList:function(){
      return this.archiveList.filter((note)=>{
        return note.title.match(this.searchText);
      })
    }
  }
};
</script>
<style scoped>
.archive-display {
  display: flex;
  /* margin-top: 1%; */
  /* margin-left: 20%; */
  flex-direction: row;
  /* width: 65%; */
  flex-wrap: wrap;
}
</style> 