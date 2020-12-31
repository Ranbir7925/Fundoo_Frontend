<template>
    <div class="delete-Notes" @click="DeletedNotesInTrash()">
        <div>
            <h1>{{notes}}</h1>
        </div>
        <md-icon>delete</md-icon>
    </div>

</template>

<script>
import { eventBus } from '../../main'
import NoteService from '../../services/noteService'
export default {
    name:'DeleteNotes',
    props:['note'],
    methods:{
        DeletedNotesInTrash: function(){
            const trashData = {
                noteIdList:[this.note],
                isDeleted: true

            }
            NoteService.DeletedNoteMoveToTrash(trashData)
            .then(()=>{
                eventBus.$emit("getAfterUpdatedNoteList")
            })
        }
    }
}
</script>

<style scoped>
.delete-Notes {
  cursor: pointer;
}
</style> 