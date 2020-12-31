<template>
  <div class="display-notes">
    <div class="note-cards" v-for="note in noteList" :key="note.id">
      <md-card>
        <div class="card-items" @click="updateNotes(note)">
          <label class="content-part">{{ note.title }}</label>
          <label class="description-part">{{ note.description }}</label>
        </div>
        <div class="icon-notes">
          <IconArchive />
          <DeleteNote v-bind:note="note.id" />
        </div>
      </md-card>
    </div>
  </div>
</template>

<script>
import DeleteNote from '../notes/DeleteNote'
import IconArchive from '../notes/IconArchive'
import { eventBus } from '../../main'
export default {
  name: "DisplayNotes",
  props: ["noteList","iconCategory"],
  data() {
    return {
      cardId:[],
      updateNotesShow:false,
      noteData:{}
    }
  },
  components:{
    DeleteNote,IconArchive
  },
  methods: {
    updateNotes: function(note){
      this.updateNotesShow = true;
      this.noteData = note;
    }
  },
  created() {
    eventBus.$on("closeDialogBox",
    (data)=>{
      this.updateNotesShow =data
    })
  },
};
</script>

<style>
.display-notes {
  display: flex;
  margin-top: 1%;
  margin-left: 16%;
  flex-direction: row;
  width: 80%;
  flex-wrap: wrap;
}
.card-items {
  display: flex;
  flex-direction: column;
  height: min-content;
  text-align: start;
  padding: 10px;
}
.md-card {
  margin: 8px;
  padding: 18px;
  width: 190px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5%;
}
.content-part {
  font-weight: bold;
  font-size: 18px;
  max-width: 90%;
  opacity: 0.6;
  cursor: text;
  margin: 0px 0px 10px 0px;
}
.description-part {
  font-size: 16px;
  font-weight: 500;
}
.icon-notes {
  justify-content: space-evenly;
  display: flex;
  flex-direction: row;
}
</style>