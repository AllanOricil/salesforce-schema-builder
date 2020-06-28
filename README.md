# Salesforce Schema Builder for VS Code

This extension enable developers to manage Salesforce Custom Objects without having to leave VS Code.
If you want to contribute with this work, please click on the button below!

<a href="https://www.buymeacoffee.com/allanoricil" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>

## Features

- [x] Create Salesforce SObjects.
- [x] [Enhanced Formula Editor](#enhanced-formula-editor).
- [ ] Edit Salesforce SObjects.
- [ ] Save the Metadata directly to your SFDX Project.
- [ ] Create and Edit Validation Rules.
- [ ] [Interactive 2D Schema Visualization.](#poc-schema-builder)

## Requirements

- sfdx-cli 7.58.2 or above
- VS Code 1.32.0 or above
- MUST BE USED FROM A SFDX PROJECT

# Instalation

Open VS Code, click on the Extension button in the side bar menu, search for `Salesforce Schema Builder` and click `Install`.

<img src="https://drive.google.com/uc?id=18AxpHzeGz9_dUEdVC1GEerkRLnW2ZDMv" width="800px"></img>

Then wait for the Activation Message to appear.

<img src="https://drive.google.com/uc?id=1SdsySV3__XbDMdWFxZX4khTNlcfs_l-m" width="600px"></img>

# How to Deploy a new Custom Object

### Configure a Default Username

Configure a Default Username in the SFDX using the Global flag. The UI will this user to save your Custom Object.

```
sfdx force:config:set defaultusername=me@myhub.org -g
```

## Open the Schema Builder

Open a SFDX Project, press `Ctrl+Shift+P`, type `SFDX: Schema Builder` and select it to open the Schema Builder.

Make sure there are no errors and then Click on Save. The Save button only works if the forms are all valid.
You will notice that the button changed to `Deploying...`. While the Custom Object is being deployed the forms are disabled.

## Create a new Custom Object with Fields

Create the new SObject and its Fields.

<img src="https://drive.google.com/uc?id=1YZDUKFz3eu2VjLRRUXip_tFd31t8vMcF" width="1200px"></img>

Make sure there are no errors and then Click on the Save button. The Save button only works if the forms are all valid.
You will notice that the button changed to `Deploying...`. Also, while the Custom Object is being deployed, the forms are disabled.

<img src="https://drive.google.com/uc?id=1v3JjZtHxeBGGHs6bEcXiPygsLAEjOIUU" width="1200px"></img>

If the Custom Object was deployed correctly you should see the following notification message.

<img src="https://drive.google.com/uc?id=16iNrrrjMToIEUEWFoS_6Yr4525jNjOFO" width="600px"></img>

If the deploy failed you will see the following notification message.

<img src="https://drive.google.com/uc?id=15LvELxLWXVyTCusoC8E0orZR1blm7ZRA" width="600px"></img>

You can see the error message clicking on the `Show Output`. It displays exactly what you would have seen on the `Deploy Status` page on the Setup.

<img src="https://drive.google.com/uc?id=12_34OqZGNtxPYY2jVr02qN05LnUqxrcP" width="1200px"></img>

# How to Deploy to a different Environment

Change the defaultusername with the following command.

```
sfdx force:config:set defaultusername=me@myhub.org -g
```

Then click on the Save button and the new object will be on the new Environment.

# How to Refresh Custom Objects, Labels and Global Value Sets for the new Username

Everytime you choose a new Environment click on the Refresh button and wait a few seconds to see new Custom Objects, Labels and Global Value Sets on the forms.
You can also close and open again the Schema Builder to get the metadata related to the new environment.

<img src="https://drive.google.com/uc?id=1zOw1hvf2aWz34BpLr19RXm805YA0RjKt" width="600px"></img>

If the Metadata was refreshed with success you receive some notifications, one for each type that has been loaded again.

<img src="https://drive.google.com/uc?id=1qFCqN8fgszKwZ7jwh3ixDiXcuDuibr1a" width="600px"></img>
<img src="https://drive.google.com/uc?id=1xIYIp9F1Um17Y1g2BjCvQaQ0mGDWbmj5" width="600px"></img>

# How to Preview the Metadata XML

To preview the Metadata while creating your SObject, click on the indicated button in the image below.

<img src="https://drive.google.com/uc?id=1HB9pBCFvtx-d_pHP_HMyKVWGmfPUedRo" width="600px"></img>

A panel with the generated Metadata XML will open. You can use it to verify if the Metadata is correct. If you find something wrong you can open an Issue [here](https://github.com/AllanOricil/schema-builder-issues).

<img src="https://drive.google.com/uc?id=1956XLUE0njEMwzrNBn8t1gem1incODK-" width="600px"></img>

This metadata is also saved in the following location, depending on your OS.

<b>Windows:</b> `%USERPROFILE%\.schema\DEFAULT_USERNAME\customObjects\CUSTOM_OBJECT_NAME`

<b>Linux and MacOS:</b> `home/username/.schema/DEFAULT_USERNAME/customObjects/CUSTOM_OBJECT_NAME`

The variables `DEFAULT_USERNAME` and `CUSTOM_OBJECT_NAME` are defined by the default username configured in sfdx and the object api name you created.

# Enhanced Formula Editor

Now functions and operators can be easily found on top of the text area.

<img src="https://drive.google.com/uc?id=1W415UkSflJ3i8HLs6lkRecoKJRBBS01j" width="600px"></img>

And if you need to get a field reference you can click on the `Insert Field` button to open the field selection.

<img src="https://drive.google.com/uc?id=1gDyWZf0FIDN664EBjPtaHvMMf2cuUOf8" width="1200px"></img>

<b>OBS:</b> Currently there are more fields being displayed then it should. I have to put in a blacklist some of the fields manually because the Salesforce API's do not have any info saying that the field is referenceable on a formula or not. You can help me to do it opening an Issue [here](https://github.com/AllanOricil/schema-builder-issues).

# POC Schema Builder

Once the solution to create and edit SObjects is stable, I will start to develop this POC.

<img src="https://drive.google.com/uc?id=1aVk7LpoLj8WtkLoryQjPIvRrdkaFQcnz" width="900px"></img>
