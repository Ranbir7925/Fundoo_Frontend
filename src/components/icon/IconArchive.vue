<template>
  <div class="archive">
    <md-icon @click.native="sendToArchive">archive</md-icon>
  </div>
</template>

<script>
import NoteService from '../../services/noteService'
import { eventBus } from '../../main'
export default {
  name: "IconArchive",
  props:["note"],
  methods:{
    sendToArchive:function(){
      const archiveData={
        isArchived:true,
        noteIdList:[this.note]
      }
      NoteService.archiveNotes(archiveData).then(()=>{
        eventBus.$emit("getAfterUpdatedNoteList");
      })
    }
  }
};
</script>
<style>
.archive {
  cursor: pointer;
  margin-left: 5px;
}
</style>