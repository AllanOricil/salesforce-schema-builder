# Salesforce Schema Builder for VS Code

This extension goal is to enable developers to manage Salesforce Custom Objects without leaving VS Code.

## Features

- [x] Create Custom Objects and fields.
- [x] Preview the generate XML.
- [ ] 2D Schema Visualization.

## Requirements

- sfdx-cli/7.58.2-937f666ed4 win32-x64 node-v10.15.3
- VS Code 1.32.0

<img src="https://drive.google.com/uc?id=12SxfJ_TqXn-lToUAr0VED31IPdK6FG-H"></img>

<img src="https://drive.google.com/uc?id=1956XLUE0njEMwzrNBn8t1gem1incODK-"></img>

## How to Use

This extension will always deploy metadata to the default org configured in the sfdx. So, in order to make it work, first configure your sfdx default username using one of the following commands

```
sfdx force:config:set defaultusername=scratch_org_alias
sfdx force:config:set defaultusername=me@my.org
sfdx force:config:set defaultusername=me@myhub.org -g
```

Open a SFDX Project and press `Ctrl+Shift+P`, type `SFDX: Schema Builder` and click on the option.

<img src="https://drive.google.com/uc?id=1Be54v-Og83A9emO_tJAWZepjyiktnOMq"></img>
