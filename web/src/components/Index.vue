<template>
  <div class="container-fluid">
    <div class="row flex-grow">
      <div id="forms-panel" class="sidenav col-3 h-100">
        <s-object-form></s-object-form>
      </div>
      <div class="col-9"></div>
    </div>
  </div>
</template>

<script>
import SObjectForm from "./SObjectForm.vue";
export default {
  name: "Index",
  components: {
    SObjectForm
  },
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    getRootPath() {
      window.vscode.updateGlobalState({ test: "BATATA" });
      this.msg = window.webviewData.rootPath;
    },
    selectFile() {
      window.vscode.updateGlobalState({ test: "BATATA" });
      window.vscode.showOpenDialog({ canSelectFiles: true }).then(msg => {
        if (msg && msg.data) {
          this.msg = msg.data[0];
        }
      });
    },
    output() {
      window.vscode.showTxt2Output({ txt: `this is output dialog.` });
    }
  }
};
</script>

<style scoped>
#forms-panel {
  background-color: var(--vscode-sideBar-background) !important;
}

.sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #111; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
}
</style>
