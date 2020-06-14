const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

const templateCustomObjectMetadata = (templatesPath, data) => {
  return new Promise((resolve) => {
    let template = fs.readFileSync(path.join(templatesPath, "SObject.xml"), {
      encoding: "utf-8",
    });

    template = templateCustomObjectNameField(
      template,
      data.dataType === "Text"
        ? "SObjectNameFieldText.xml"
        : "SObjectNameFieldAutoNumber.xml",
      templatesPath
    );

    for (let [key, value] of Object.entries(data)) {
      const regex = new RegExp(`{{${key}}}`, "gi");
      template = template.replace(regex, value);
    }

    resolve(template);
  });
};

const templateCustomObjectNameField = (template, type, templatesPath) => {
  const nameFieldRegex = new RegExp("{{nameField}}", "gi");
  const nameFieldTemplate = fs.readFileSync(path.join(templatesPath, type), {
    encoding: "utf-8",
  });
  template = template.replace(nameFieldRegex, nameFieldTemplate);
  return template;
};

const sfdxSpawn = (cmd, dir) => {
  const sfdxExecOptions = {
    cwd: dir,
  };
  console.log(cmd);
  cmd += " --json";
  console.log(cmd);
  return new Promise((resolve) => {
    resolve(execSync(cmd, sfdxExecOptions));
  });
};

module.exports = {
  templateCustomObjectMetadata,
  sfdxSpawn,
};
