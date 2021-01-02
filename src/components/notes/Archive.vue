<template>
  <div class="display-notes">
    <DisplayNote
      v-bind:noteList="archiveList"
      v-bind:iconCategory="iconCategory"
    />
  </div>
</template>

<script>
import DisplayNote from "./DisplayNote"
import NoteService from '../../services/noteService'
export default {
    name:"Archive",
    components:{DisplayNote},
    data(){
        return{
            archiveList:[],
            iconCategory:"archive",
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
  },
};
</script>
<style scoped>
.display-notes {
  display: flex;
  /* margin-top: 1%; */
  /* margin-left: 20%; */
  flex-direction: row;
  /* width: 65%; */
  flex-wrap: wrap;
}
</style> 