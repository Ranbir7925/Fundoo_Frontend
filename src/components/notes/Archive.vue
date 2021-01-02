<template>
  <div class="archive-display">
    <DisplayNote
      v-bind:noteList="filteredList"
      v-bind:iconCategory="iconCategory"
    />
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
            searchText:''
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
    if (localStorage.getItem("access_token") == undefined) {
      this.$router.push("/signIn");
    }
    this.fetchArchiveList();
    eventBus.$on("unarchivedNote", () => {
      this.archiveList = [];
      this.fetchArchiveList();
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