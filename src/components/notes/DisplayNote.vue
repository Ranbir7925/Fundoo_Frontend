<template>
  <div class="display-notes">
    <div class="note-cards" v-for="note in noteList" :key="note">
      <md-card>
        <div class="card-items">
          <label class="content-part">{{ note.title }}</label>
          <label class="description-part">{{ note.description }}</label>
        </div>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayNotes",
  props: ["noteList"],
  data() {
    return {
      note:[]
    }
  },
  methods: {}
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
</style>