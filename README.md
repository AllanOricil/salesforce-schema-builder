# Salesforce Schema Builder for VS Code

This extension goal is to enable developers to manage Salesforce Custom Objects without leaving VS Code.

## Features

- [x] Create Custom Objects and fields.
- [x] Preview the generate XML.
- [ ] 2D Schema Visualization.

## Requirements

- sfdx-cli/7.58.2-937f666ed4 win32-x64 node-v10.15.3
- VS Code 1.32.0

## How to Use

Configure a Default Username for SFDX

```
sfdx force:config:set defaultusername=scratch_org_alias
sfdx force:config:set defaultusername=me@my.org
sfdx force:config:set defaultusername=me@myhub.org -g
```

In a SFDX Project directory, press `Ctrl+Shift+P`, type `SFDX: Schema Builder` and select the option like in the image below

<img src="https://drive.google.com/uc?id=1Be54v-Og83A9emO_tJAWZepjyiktnOMq" width="900px"></img>

The Shema Builder is divided in three sections, the Object Form on the left, the Field manager on the middle and the Field form on the right, like shown in the images below. In the Object Form you can configure the same options that are available in the Salesfore Setup to create a new Custom Object. The field manager is where you add, remove or search the fields. The field form is enabled every time you click on edit in a field in the field manager. The form is reactive, it is different for each type of field and it provides the same functionality available in the Setup.

<b>obs:</b> The formula builder is still being developed but you can still paste your formula in the Default field when available.

<img src="https://drive.google.com/uc?id=1rOpCKTUxbTf6CgoEVK0u1sVhRKl7GuNM" width="900px"></img>
<img src="https://drive.google.com/uc?id=13uw7I39ltDF3YBLbFvk8dKQDV82uOo8P" width="900px"></img>
<img src="https://drive.google.com/uc?id=1rX9De8Dna95yjomtZvoFgzSPDYah30Ks" width="900px"></img>

If you want to see the generate metadata just click on the button on the top right corner of VS Code, like shown in the next image.

<img src="https://drive.google.com/uc?id=1yZJWrRdDjXfXEnuKUcinVidZEzE_ppsA" width="900px"></img>

<img src="https://drive.google.com/uc?id=1956XLUE0njEMwzrNBn8t1gem1incODK-" width="900px"></img>

When you finish to configure your new Custom Object, click on the Save button and just wait a few seconds. If everything deployed correctly VS Code will display a Success message on the bottom right corner of the screen.

<img src="https://drive.google.com/uc?id=1aWDJIVW5ApN4CViJnL_dO1e09cGONvCG" widht="900px">></img>
