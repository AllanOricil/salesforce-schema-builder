<template>
  <form class="m-2 my-5">
    <h2 class="text-left text-uppercase mb-3">New Object</h2>
    <div class="form-row">
      <div class="form-group col-12">
        <label for="sObjectLabel">Label</label>
        <input type="text" class="form-control" id="sObjectLabel" v-model="sObjectDefinition.label" />
      </div>
      <div class="form-group col-12">
        <label for="sObjectPluralName">Plural Name</label>
        <input
          type="text"
          class="form-control"
          id="sObjectPluralName"
          :v-model="sObjectDefinition.pluraName"
        />
      </div>
      <div class="form-group col-12">
        <label for="sObjecctGender">Gender</label>
        <select class="form-control" id="sObjecctGender" v-model="sObjectDefinition.gender">
          <option>Feminine</option>
          <option>Masculine</option>
        </select>
      </div>
      <div class="form-group col-12">
        <label for="sObjectDescription">Description</label>
        <textarea
          class="form-control"
          id="sObjectDescription"
          rows="3"
          v-model="sObjectDefinition.description"
        ></textarea>
      </div>
      <div class="form-group col-12">
        <label for="sObjectApiName">API Name</label>
        <input
          type="text"
          class="form-control"
          id="sObjectApiName"
          v-model="sObjectDefinition.apiName"
        />
      </div>
      <div class="form-group col-12">
        <label for="sObjectRecordName">Record Name</label>
        <input
          type="text"
          class="form-control"
          id="sObjectRecordName"
          v-model="sObjectDefinition.recordName"
        />
      </div>
      <div class="form-group col-12">
        <label for="sObjectDataType">Data Type</label>
        <select class="form-control" id="sObjectDataType" v-model="sObjectDefinition.dataType">
          <option>Text</option>
          <option>Auto Number</option>
        </select>
      </div>
      <div class="form-group col-12">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="defaultCheck1"
            v-model="sObjectDefinition.allowReports"
          />
          <label class="form-check-label" for="defaultCheck1">Allow Reports</label>
        </div>
      </div>
      <div class="form-group col-12">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="defaultCheck1"
            v-model="sObjectDefinition.allowActivities"
          />
          <label class="form-check-label" for="defaultCheck1">Allow Activities</label>
        </div>
      </div>
      <div class="form-group col-12">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="defaultCheck1"
            v-model="sObjectDefinition.trackFieldHistory"
          />
          <label class="form-check-label" for="defaultCheck1">Track Field History</label>
        </div>
      </div>
      <div class="form-group col-12">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="defaultCheck1"
            v-model="sObjectDefinition.allowInChatterGroups"
          />
          <label class="form-check-label" for="defaultCheck1">Allow in Chatter Groups</label>
        </div>
      </div>
      <div class="form-group col-12">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="defaultCheck1"
            v-model="sObjectDefinition.allowSharing"
          />
          <label class="form-check-label" for="defaultCheck1">Allow Sharing</label>
        </div>
      </div>
      <div class="form-group col-12">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="defaultCheck1"
            v-model="sObjectDefinition.allowBulkApiAccess"
          />
          <label class="form-check-label" for="defaultCheck1">Allow Bulk API Access</label>
        </div>
      </div>
      <div class="form-group col-12">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="defaultCheck1"
            v-model="sObjectDefinition.allowStreamingApiAccess"
          />
          <label class="form-check-label" for="defaultCheck1">Allow Streaming API Access</label>
        </div>
      </div>

      <div class="form-group col-12">
        <label for="sObjectDeploymentStatus">Deployment Status</label>
        <select
          class="form-control"
          id="sObjectDeploymentStatus"
          v-model="sObjectDefinition.deploymentStatus"
        >
          <option>In Development</option>
          <option>Deployed</option>
        </select>
      </div>
      <div class="form-group col-12">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="defaultCheck1"
            v-model="sObjectDefinition.allowSearch"
          />
          <label class="form-check-label" for="defaultCheck1">Allow Search</label>
        </div>
      </div>
      <div class="form-group col-12">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="defaultCheck1"
            v-model="sObjectDefinition.addNotesAndAttachements"
          />
          <label class="form-check-label" for="defaultCheck1">Add Notes and Attachments</label>
        </div>
      </div>
      <div class="form-group col-12">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="defaultCheck1"
            v-model="sObjectDefinition.launchCustomTabWizard"
          />
          <label class="form-check-label" for="defaultCheck1">Create Custom Tab?</label>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" @click="sendFormDataToVSCode()">Create</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      sObjectDefinition: {
        name: "",
        label: "",
        apiName: "",
        description: "",
        pluraName: "",
        gender: "Feminine",
        recordName: "",
        dataType: "Text",
        allowReports: false,
        allowActivities: false,
        trackFieldHistory: false,
        allowInChatterGroups: false,
        allowSharing: false,
        allowBulkApiAccess: false,
        allowStreamingApiAccess: false,
        allowSearch: false,
        addNotesAndAttachements: false,
        launchCustomTabWizard: false,
        deploymentStatus: "Deployed"
      }
    };
  },
  watch: {
    "sObjectDefinition.label"(newValue, oldValue) {
      this.sObjectDefinition.apiName =
        this.sObjectDefinition.label.replace(" ", "_") + "__c";
      this.sObjectDefinition.name = this.sObjectDefinition.label;
      this.sObjectDefinition.recordName =
        this.sObjectDefinition.label + " Name";
    }
  },
  methods: {
    sendFormDataToVSCode() {
      window.vscode.showMessage({
        txt: "Sent Data to VS Code"
      });
      window.vscode.post({
        cmd: "sendFormDataToVSCode",
        args: this.sObjectDefinition
      });
    }
  }
};
</script>

<style scoped>
input {
  border: 1px solid transparent !important;
  border-radius: 0;
  background-color: var(--vscode-input-background);
  color: var(--vscode-input-foreground);
}

input:focus {
  outline: none;
  border: 1px solid var(--vscode-focusBorder) !important;
  background-color: var(--vscode-input-background);
  color: var(--vscode-input-foreground);
  box-shadow: none;
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: var(--vscode-input-placeholderForeground);
  opacity: 1;
  /* Firefox */
}

label {
  color: var(--vscode-menu-foreground);
  font-family: var(--vscode-font-family);
  font-weight: var(--vscode-font-weight);
  font-size: var(--vscode-font-size);
}

h2 {
  color: var(--vscode-menu-foreground);
  font-family: var(--vscode-font-family);
  font-weight: var(--vscode-font-weight);
}

button {
  background-color: var(--vscode-button-background);
  color: var(--vscode-button-foreground);
  border: none;
}
button:focus,
button:hover,
button:active {
  border: none !important;
  background-color: var(--vscode-button-hoverBackground) !important;
  box-shadow: none !important;
}
</style>