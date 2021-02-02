<template>
  <div>
    <md-icon class="icon" @click.native="showDialog = true">person_add</md-icon>
    <md-tooltip md-direction="bottom">collaborator</md-tooltip>
    <md-dialog :md-active.sync="showDialog" class="pop-up">
      <md-dialog-title>Collaborator:</md-dialog-title>
      <div class="owner">
        <md-button class="md-icon-button owner-icon">
          <md-avatar class="md-avatar-icon">{{ initialName }}</md-avatar>
        </md-button>
        <div class="owner-content">
          <span class="username">{{ username }} (Owner)</span>
          <span class="email">{{ email }}</span>
        </div>
      </div>
      <div class="collaborator">
        <div class="collaborator-icon">
          <md-button class="md-icon-button">
            <md-icon class="icon">person_add</md-icon>
          </md-button>
        </div>
        <div class="collaborator-content" @keyup="getCollaboratorListData">
          <md-autocomplete
            v-model="newmail"
            :md-options="
              collaboratorList.map((x) => ({
                email: x.email,
                toLowerCase: () => x.email.toLowerCase(),
                toString: () => x.email,
              }))">
            <label>Select</label>
          </md-autocomplete>
        </div>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="addColab(), (showDialog = false)">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-snackbar 
        md-position="left" 
        :md-active.sync="showSnackbar" 
        md-persistent>
      <span>{{result}}</span>
    </md-snackbar> 
  </div>
</template>

<script>
import NoteService from "../../services/noteService";

export default {
  props: ["note"],
  name: "Collaborator",
  data: () => ({
    initialName: "R",
    showDialog: false,
    newmail: "",
    collaboratorList: [],
    showSnackbar:false,
    result:""
  }),

  methods: {
    getCollaboratorListData() {
      const searchData = {
        searchWord: this.newmail,
      };
      NoteService.getCollaboratorList(searchData)
        .then((response) => {
          this.collaboratorList = response.data.data.details;
        })
        .catch((error) => console.log(error));
    },
    addColab() {
      const data = this.collaboratorList.find(
        (x) => x.email === this.newmail.email
      );
      console.log(this.note,data);
      NoteService.addCollaborator(data,this.note)
      .then(()=>{
        this.showSnackbar=true;
        this.result="Collaborator added"
      })
    },
  },
  created() {
    this.email = localStorage.getItem("email");
    this.username = localStorage.getItem("username");
  },
};
</script>

<style scoped>
.pop-up {
  width: 650px !important;
  z-index: 6 !important;
}

.getlables {
  display: flex;
  flex-direction: column;
}

.owner,
.collaborator {
  align-items: center;
  display: flex;
  padding-bottom: 10px;
}
.collaborator-content {
  width: 100% !important;
}
.owner-content {
  display: flex;
  flex-direction: column;
}
.username {
  font-weight: 700;
}
.email {
  color: #5f6368;
  height: 10px;
}
</style>