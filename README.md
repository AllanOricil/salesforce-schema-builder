# Salesforce Schema Builder for VS Code

This extension enable developers to manage Salesforce Custom Objects without having to leave VS Code.
If you want to contribute with this work, please click on the button below!

<a href="https://www.buymeacoffee.com/allanoricil" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>

## Features

- [x] Create and Edit Salesforce Objects.
- [x] Enhanced Formula builder.
- [ ] Save the Metadata directly to your SFDX Project.
- [ ] Create and Edit Validation Rules.
- [ ] [Interactive 2D Schema Visualization.](#poc-schema-builder)

## Requirements

- sfdx-cli 7.58.2 or above
- VS Code 1.32.0 or above

# Instalation

Open VS Code, click on the Extension button in the side bar menu, search for `Salesforce Schema Builder` and click `Install`.

<img src="https://drive.google.com/uc?id=18AxpHzeGz9_dUEdVC1GEerkRLnW2ZDMv" width="800px"></img>

<<<<<<< HEAD
Then wait for the Activation Message to appear.

<img src="https://drive.google.com/uc?id=1SdsySV3__XbDMdWFxZX4khTNlcfs_l-m" width="600px"></img>

# How to Deploy a new Custom Object

### Configure a Default Username
=======
Then wait for the following message to appear.

<img src="https://drive.google.com/uc?id=1SdsySV3__XbDMdWFxZX4khTNlcfs_l-m" width="800px"></img>

# How to Deploy a new Custom Object

## Configure SFDX
>>>>>>> e971c068a8cbd31c1f921e6a5e53b10d51d80ccf

Configure a Default Username in the SFDX using the Global flag. The UI will this user to save your Custom Object.

```
sfdx force:config:set defaultusername=me@myhub.org -g
```

<<<<<<< HEAD
## Open the Schema Builder

Open a SFDX Project, press `Ctrl+Shift+P`, type `SFDX: Schema Builder` and select it to open the Schema Builder.
=======
## Open Schema Builder

Open a SFDX Project, press `Ctrl+Shift+P`, type `SFDX: Schema Builder` and select it to open the Schema Builder.

<img src="https://drive.google.com/uc?id=1Be54v-Og83A9emO_tJAWZepjyiktnOMq" width="600px"></img>

## Configure your Object and Fields

Create the new SObject and its Fields.

<img src="https://drive.google.com/uc?id=1YZDUKFz3eu2VjLRRUXip_tFd31t8vMcF" width="900px"></img>

## Save
>>>>>>> e971c068a8cbd31c1f921e6a5e53b10d51d80ccf

Make sure there are no errors and then Click on Save. The Save button only works if the forms are all valid.
You will notice that the button changed to `Deploying...`. While the Custom Object is being deployed the forms are disabled.

<<<<<<< HEAD
## Configure your Object and Fields

Create the new SObject and its Fields.

<img src="https://drive.google.com/uc?id=1YZDUKFz3eu2VjLRRUXip_tFd31t8vMcF" width="1200px"></img>

Make sure there are no errors and then Click on Save. The Save button only works if the forms are all valid.
You will notice that the button changed to `Deploying...`. Also, while the Custom Object is being deployed, the forms are disabled.

<img src="https://drive.google.com/uc?id=1v3JjZtHxeBGGHs6bEcXiPygsLAEjOIUU" width="1200px"></img>

If the Custom Object was deployed correctly you should see the following notification message.

<img src="https://drive.google.com/uc?id=16iNrrrjMToIEUEWFoS_6Yr4525jNjOFO" width="600px"></img>

If the deploy failed you will see the following notification message.

<img src="https://drive.google.com/uc?id=15LvELxLWXVyTCusoC8E0orZR1blm7ZRA" width="600px"></img>

You can see the error message clicking on the `Show Output` button to see the errors.

<img src="https://drive.google.com/uc?id=12_34OqZGNtxPYY2jVr02qN05LnUqxrcP" width="1200px"></img>
=======
<img src="https://drive.google.com/uc?id=1v3JjZtHxeBGGHs6bEcXiPygsLAEjOIUU" width="900px"></img>

If the Custom Object was deployed correctly you should see the following notification message.

<img src="https://drive.google.com/uc?id=16iNrrrjMToIEUEWFoS_6Yr4525jNjOFO" width="900px"></img>

If the deploy failed you will see the following notification message.

<img src="https://drive.google.com/uc?id=15LvELxLWXVyTCusoC8E0orZR1blm7ZRA" width="900px"></img>

You can see the error message clicking on the `Show Output` button to see the errors.

<img src="https://drive.google.com/uc?id=12_34OqZGNtxPYY2jVr02qN05LnUqxrcP" width="900px"></img>
>>>>>>> e971c068a8cbd31c1f921e6a5e53b10d51d80ccf

# How to Deploy to a different Environment

Change the defaultusername again with the following command.

```
sfdx force:config:set defaultusername=me@myhub.org -g
```
<<<<<<< HEAD

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

A panel with the generated Metadata XML will open. You can use it to verify if the Metadata is correct. If you find something wrong you can open an issue [here](https://github.com/AllanOricil/schema-builder-issues).
=======

Then click on the Save button and the new object will be on the new Environment.

# How to Load the Custom Objects, Labels, Global Value Sets from the new Environment

Everytime you choose a new Environment click on the Refresh button and wait a few seconds to see Custom Objects, Labels and Global Value Sets on the forms.
You can also close and open again the Schema Builder to get the metadata related to the new environment.

<img src="https://drive.google.com/uc?id=1zOw1hvf2aWz34BpLr19RXm805YA0RjKt" width="900px"></img>

# How to Preview the Metadata XML

To preview the Metadata while creating your SObject, click on the indicated button in the image below.

<img src="https://drive.google.com/uc?id=1HB9pBCFvtx-d_pHP_HMyKVWGmfPUedRo" width="900px"></img>
>>>>>>> e971c068a8cbd31c1f921e6a5e53b10d51d80ccf

This metadata is also saved in the following location, depending on your OS.

Windows: `%USERPROFILE%\.schema\DEFAULT_USERNAME\customObjects\CUSTOM_OBJECT_NAME`

Linux and MacOS: `~/.schema/DEFAULT_USERNAME/customObjects/CUSTOM_OBJECT_NAME`

The variables `DEFAULT_USERNAME` and `CUSTOM_OBJECT_NAME` are defined by the default username configured in sfdx and the object api name you created.

## POC Schema Builder

<img src="https://drive.google.com/uc?id=1aVk7LpoLj8WtkLoryQjPIvRrdkaFQcnz" width="900px"></img>
