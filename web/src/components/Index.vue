<template>
  <div class="container-fluid">
    <div class="row flex-grow">
      <div id="forms-panel" class="col-3 vh-100">
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
</style>
