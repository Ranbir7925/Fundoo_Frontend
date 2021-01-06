<template>
  <div class="color-palette">
    <md-menu md-size="medium" md-align-trigger md-direction="top-start">
      <md-icon md-menu-trigger>palette</md-icon>
      <md-menu-content>
        <div class="color-items">
          <div
            class="color-array"
            v-for="(color, index) in colorArray"
            v-bind:key="index"
            v-bind:style="{ background: color.color }"
            @click="changeColor(color.color)"
          >
            <md-tooltip md-direction="bottom">{{ color.name }}</md-tooltip>
          </div>
        </div>
      </md-menu-content>
    </md-menu>
  </div>
</template>

<script>
import NoteService from "../../services/noteService";
import { eventBus } from "../../main";
export default {
  name: "IconColorPalette",
  props: ["note", "createNote"],
  data() {
    return {
      isColorShow: false,
      showTooltip: false,
      noteIdList: [],
      setColor: "",
      noteId: "",
      colorArray: [
        { color: "#ffffff", name: "Default" },
        { color: "#f61c08", name: "Red" },
        { color: "#f0b401", name: "Orange" },
        { color: "#ffea04", name: "Yellow" },
        { color: "#87fc02", name: "Green" },
        { color: "#00eef7", name: "Teal" },
        { color: "#a9eaf8", name: "Blue" },
        { color: "#3803f5", name: "Dark Blue" },
        { color: "#8707f7", name: "Purple" },
        { color: "#f5a8e2", name: "Pink" },
        { color: "#cc5d31", name: "Brown" },
        { color: "#6a6d6d", name: "Grey" },
      ],
    };
  },
  methods: {
    changeColor: function (colorId) {
      if (this.createNote == true) {
        eventBus.$emit("getUpdatedColorOnNotes", colorId);
      } else {
        eventBus.$emit("getUpdated", colorData);
        const colorData = {
          color: colorId,
          noteIdList: [this.note],
        };
        NoteService.changeCardColor(colorData).then(() => {
          eventBus.$emit("getAfterUpdatedNoteList");
        })
        .catch(error => console.log(error))
      }
    },
  },
};
</script>

<style scoped>
.color-palette {
  cursor: pointer;
}
.md-menu-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.color-items {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 6px;
}
.color-array {
  border-radius: 100%;
  padding: 10%;
  margin: 1px;
  border: 1px solid rgb(204, 204, 204);
}
</style>