<template>
  <div class="color-palette">
    <md-menu md-size="medium" md-align-trigger md-direction="top-start">
      <md-icon md-menu-trigger>palette</md-icon>

      <md-menu-content>
        <div class="color-items">
          <div class="color-tray" id="transparent" @click="setColor('#ffffff')">
            <span class="color-tray-text">Default</span>
          </div>

          <div class="color-tray" id="red" @click="setColor('#f61c08')">
            <span class="color-tray-text">Red</span>
          </div>

          <div class="color-tray" id="orange" @click="setColor('#f0b401')">
            <span class="color-tray-text">Orange</span>
          </div>

          <div class="color-tray" id="yellow" @click="setColor('#ffea04')">
            <span class="color-tray-text">Yellow</span>
          </div>

          <div class="color-tray" id="green" @click="setColor('#87fc02')">
            <span class="color-tray-text">Green</span>
          </div>

          <div class="color-tray" id="teal" @click="setColor('#00eef7')">
            <span class="color-tray-text">Teal</span>
          </div>

          <div class="color-tray" id="blue" @click="setColor('#a9eaf8')">
            <span class="color-tray-text">Blue</span>
          </div>

          <div class="color-tray" id="darkBlue" @click="setColor('#3803f5')">
            <span class="color-tray-text">Dark Blue</span>
          </div>

          <div class="color-tray" id="purple" @click="setColor('#8707f7')">
            <span class="color-tray-text">Purple</span>
          </div>

          <div class="color-tray" id="pink" @click="setColor('#f5a8e2')">
            <span class="color-tray-text">Pink</span>
          </div>

          <div class="color-tray" id="brown" @click="setColor('#cc5d31')">
            <span class="color-tray-text">Brown</span>
          </div>

          <div class="color-tray" id="grey" @click="setColor('#6a6d6d')">
            <span class="color-tray-text">Grey</span>
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
  methods: {
    setColor: function (colorId) {
      if (this.createNote == true) {
        eventBus.$emit("getColorUpdated", colorId);
      } else {
        const colorData = {
          color: colorId,
          noteIdList: [this.note],
        };
        NoteService.changeCardColor(colorData).then(() => {
          eventBus.$emit("getAfterUpdatedNoteList");
        });
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
  width: 12%;
  min-height: fit-content;
  z-index: 9999;
  position: absolute;
}
.color-items {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 6px;
}
.color-tray {
  margin-bottom: 10%;
  width: 22%;
  height: 30px;
  border-radius: 50%;
  margin: 2px;
  border: 1px solid rgb(231, 227, 227);
}
.color-tray .color-tray-text {
  visibility: hidden;
  width: 50px;
  color: black;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: sticky;
  font-size: 12px;
  cursor: pointer;
}
.color-tray:hover .color-tray-text {
  visibility: visible;
}
#transparent {
  background-color: #ffffff;
}
#red {
  background-color: #f61c08;
}
#orange {
  background-color: #f0b401;
}
#yellow {
  background-color: #ffea04;
}
#green {
  background-color: #87fc02;
}
#teal {
  background-color:  #00eef7;
}
#blue {
  background-color: #a9eaf8;
}
#darkBlue {
  background-color:  #3803f5;
}
#purple {
  background-color: #8707f7;
}
#pink {
  background-color:  #f5a8e2;
}
#brown {
  background-color:  #cc5d31;
}
#grey {
  background-color:  #6a6d6d;
}
</style>