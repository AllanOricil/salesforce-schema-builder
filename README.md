# Salesforce Schema Builder for VS Code

This extension enable developers to manage Salesforce Custom Objects without having to leave VS Code.
If you want to contribute with this work, please click on the button below!

<a href="https://www.buymeacoffee.com/allanoricil" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>

## Features

- [x] Create and Edit Custom Objects and fields.
- [x] Preview and Copy to Clipboard the Metadata XML.
- [ ] Create and Edit Validation Rules. ----> Depends on the implementation of the Formula Editor. <-----
- [ ] [Interactive 2D Schema Visualization.](#poc-schema-builder)

## Requirements

- sfdx-cli/7.58.2-937f666ed4 win32-x64 node-v10.15.3
- VS Code 1.32.0

## How to Use

First, configure a Default Username for SFDX.

```
sfdx force:config:set defaultusername=scratch_org_alias
sfdx force:config:set defaultusername=me@my.org
sfdx force:config:set defaultusername=me@myhub.org -g
```

In a SFDX Project directory, press `Ctrl+Shift+P`, type `SFDX: Schema Builder` and select it to open the Schema Builder.

<img src="https://drive.google.com/uc?id=1Be54v-Og83A9emO_tJAWZepjyiktnOMq" width="900px"></img>

The Schema Builder is divided in three sections, the Object Form on the left, the Field manager on the middle and the Field form on the right. In the Object Form you can configure the same options that are available in the Salesfore Setup to create a new Custom Object. The field manager is where you add, remove or search the fields. The field form is enabled every time you click on edit in a field in the field manager. The form is reactive, it is different for each type of field and it provides the same functionality available in the Setup.

<b>obs:</b> The formula builder is still being developed but you can paste your formula in the "Default" field when available.

<img src="https://drive.google.com/uc?id=1rOpCKTUxbTf6CgoEVK0u1sVhRKl7GuNM" width="900px"></img>
<img src="https://drive.google.com/uc?id=13uw7I39ltDF3YBLbFvk8dKQDV82uOo8P" width="900px"></img>
<img src="https://drive.google.com/uc?id=1rX9De8Dna95yjomtZvoFgzSPDYah30Ks" width="900px"></img>

If you want to see the Metadata XML, just click on the button on the top right hand corner of VS Code, like shown in the next image.

<img src="https://drive.google.com/uc?id=1yZJWrRdDjXfXEnuKUcinVidZEzE_ppsA" width="900px"></img>

<img src="https://drive.google.com/uc?id=1956XLUE0njEMwzrNBn8t1gem1incODK-" width="900px"></img>

When you finish to configure your new Custom Object, scroll down and click on the Save button.

<img src="https://drive.google.com/uc?id=1aWDJIVW5ApN4CViJnL_dO1e09cGONvCG" width="500px"></img>

The generated Metadata is saved inside the folder

Windows: `%USERPROFILE%\.vscode\extensions\.schema\DEFAULT_USERNAME\customObjects\CUSTOM_OBJECT_NAME`

Linux and MacOS: `~/.vscode/extensions/.schema/DEFAULT_USERNAME/customObjects/CUSTOM_OBJECT_NAME`

The variables `DEFAULT_USERNAME` and `CUSTOM_OBJECT_NAME` are defined by the default username configured in sfdx and the object api name you created or edited.

## POC Schema Builder

<img src="https://drive.google.com/uc?id=1aVk7LpoLj8WtkLoryQjPIvRrdkaFQcnz" width="900px"></img>
