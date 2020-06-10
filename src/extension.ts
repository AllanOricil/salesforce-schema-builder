// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "salesforce-schema-builder.helloWorld",
      () => {
        const panel = vscode.window.createWebviewPanel(
          "test",
          "Schema Builder",
          vscode.ViewColumn.One,
          {
            enableScripts: true,
            retainContextWhenHidden: true,
          }
        );

        panel.webview.html = getHtml();
      }
    )
  );
}

function getHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <title>Future Flow Demo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous">
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous">
    </script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous">
    </script>

    <script src="https://unpkg.com/future-flow@0.0.19/dist/future-flow.js"></script>
    <style>
        body {
            margin: 0px;
            overflow: hidden;
            background-color: #202124;
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        pre::-webkit-scrollbar {
            display: none;
        }

        /* Hide scrollbar for IE and Edge */
        pre {
            -ms-overflow-style: none;
        }

        p {
            margin-top: 10px;
            padding-left: 15px;
            margin-bottom: 0px;
            color: white;
        }

        li {
            font-size: 12px;
            color: white;
        }

        pre {
            color: white;
            transition: width 0.2s linear;
        }

        .string {
            color: rgb(206, 145, 120);
        }

        .number {
            color: rgb(181, 206, 168);
        }

        .boolean {
            color: rgb(86, 156, 214);
        }

        .null {
            color: rgb(197, 134, 192);
        }

        .key {
            color: rgb(156, 220, 254);
        }

        #entitydata {
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        .flex-grow-1 {
            -ms-flex-positive: 1 !important;
            flex-grow: 1 !important;
        }

        /*
            pointer-events:none; 
            */
        .h-35 {
            height: 35% !important;
        }

        .h-65 {
            height: 65% !important;
        }

        #block-details {
            transition: width 0.1s ease-in-out, opacity 0.1s ease-in;
        }

        html, body, #fullheight {
            min-height: 100% !important;
            height: 100%;
        }
    </style>
</head>

<body>
    <div class="d-flex flex-column h-100 m-0 p-0" style="height: 100%">
        <div class="d-flex flex-grow-0 w-100 h-100 m-0 p-0" style="height: 100%">
            <canvas id="canvas" class="d-flex m-0 p-0" style="height: 100%"></canvas>
        </div>

        <div id="block-details" class="d-flex flex-column h-100" style="position: absolute; width: 0px; opacity: 0;">
            <div id="close-form" class="btn btn-dark" style="border-radius: 0;">
                Close
            </div>
            <div class="d-flex flex-column h-100" style="background-color: white;  overflow-y: auto;">
                <h3 id="entity-name" class="m-2"></h3>
                <form id="form" style="display: inline !important;" class="flex-grow-1 my-2">
                    <div class="form-group">
                        <label for="entity-background-color">Entity Background Color</label>
                        <input type="color" class="form-control" id="entity-background-color"
                            style=" height: 50;padding: 0; border: 0;  margin: 0;" />
                    </div>
                    <div class="form-group">
                        <label for="entity-border-color">Border Color</label>
                        <input type="color" class="form-control" id="entity-border-color"
                            style=" height: 50;padding: 0; border: 0;  margin: 0;" />
                    </div>
                    <div class="form-group">
                        <label for="entity-border-width">Border Width</label>
                        <input type="range" class="form-control p-0" value="0" min="0" max="50" step="1"
                            id="entity-border-width" style=" height: 50;padding: 0; border: 0;  margin: 0;" />
                    </div>

                    <div class="form-group">
                        <label for="border-radius">Border Radius</label>
                        <input type="range" class="form-control p-0" value="0" min="0" max="50" step="1"
                            id="border-radius" />
                    </div>
                    <div class="form-group">
                        <label for="entity-border-selected-color">Border Color [onSelected]</label>
                        <input type="color" class="form-control" id="entity-border-selected-color"
                            style=" height: 50;padding: 0; border: 0;  margin: 0;" />
                    </div>
                    <div class="form-group">
                        <label for="entity-border-selected-width">Border Width [onSelected]</label>
                        <input type="range" class="form-control p-0" value="0" min="0" max="50" step="1"
                            id="entity-border-selected-width" style=" height: 50;padding: 0; border: 0;  margin: 0;" />
                    </div>
                    <div class="form-group">
                        <label for="entity-border-hover-color">Border Color [onHover]</label>
                        <input type="color" class="form-control" id="entity-border-hover-color"
                            style=" height: 50;padding: 0; border: 0;  margin: 0;" />
                    </div>
                    <div class="form-group">
                        <label for="entity-border-hover-width">Border Width [onHover]</label>
                        <input type="range" class="form-control p-0" value="0" min="0" max="50"
                            id="entity-border-hover-width" style=" height: 50;padding: 0; border: 0;  margin: 0;" />
                    </div>
                    <div class="form-group">
                        <label for="header">Header</label>
                        <textarea class="form-control" id="header" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="body">Body</label>
                        <textarea class="form-control" id="body" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="footer">Footer</label>
                        <textarea class="form-control" id="footer" rows="3"></textarea>
                    </div>
                </form>
            </div>
            <!--
                <div class="d-flex h-35 overflow-auto">
                    <pre id="entitydata"></pre>
                </div>-->
        </div>
    </div>

    <script type="text/javascript">
        const options = {
            background: {
                color: '#202124',
            },
            zoom: {
                level: futureFlow.isMobile() ? 0.8 : 1,
                max: 2,
                min: 0.2,
            },
            drawOrigin: false,
            drawGrid: true,
            editor: false,
            canMoveBlocks: false,
            canDragCanvas: false,
            autoArrange: false,
        }

        let data = {
            start: {
                position: {
                    x: 216,
                    y: 31,
                },
                isDraggable: true,
                states: ['start', 'completed'],
                connections: [{
                    to: 'condition1',
                    isEditable: false,
                    line: {
                        weight: 1,
                        color: 'rgb(212,212,212)',
                        enableBezierCurves: true,
                        dashed: [5, 5],
                    },
                    connector: {
                        shape: 'triangle',
                        dimension: {
                            width: 10,
                            height: 10
                        },
                        color: 'rgb(212,212,212)',
                        fillColor: 'rgb(212,212,212)',
                    },
                    animation: {
                        speed: 5,
                        type: 'circle',
                        particleDistance: 20,
                        fillColor: 'rgb(247, 129, 244)',
                    },
                }, ],
                background: {
                    color: {
                        red: 59,
                        green: 64,
                        blue: 66,
                    },
                },
                shadow: {
                    offsetX: 10,
                    offsetY: 10,
                    color: 'black',
                    blur: 0
                },
                border: {
                    radius: 10,
                    padding: {
                        top: 50,
                        right: 50,
                        bottom: 50,
                        left: 50,
                    },
                    lineWidth: 1,
                    color: {
                        red: 59,
                        green: 64,
                        blue: 66,
                    },
                    selected: {
                        lineWidth: 1,
                        color: {
                            red: 59,
                            green: 64,
                            blue: 66,
                        },
                    },
                    hover: {
                        lineWidth: 1,
                        color: {
                            red: 59,
                            green: 64,
                            blue: 66,
                        },
                    },
                },
                body: {
                    text: 'Start',
                    alignment: 'start',
                    divider: {
                        width: 1,
                        color: 'rgb(0,0,0)',
                    },
                    font: {
                        family: 'Arial',
                        style: 'normal',
                        variant: 'normal',
                        color: 'rgb(212,212,212)',
                        size: 20,
                        weight: 'bold',
                    },
                },
            },
            condition1: {
                position: {
                    x: 164,
                    y: 176,
                },
                isDraggable: true,
                type: 'conditional',
                states: ['start', 'completed'],
                connections: [{
                        to: 'yes',
                        isEditable: false,
                        line: {
                            weight: 1,
                            color: 'rgb(212,212,212)',
                            enableBezierCurves: true,
                            dashed: [5, 5],
                        },
                        connector: {
                            shape: 'triangle',
                            dimension: {
                                width: 10,
                                height: 10
                            },
                            color: 'rgb(212,212,212)',
                            fillColor: 'rgb(212,212,212)',
                        },
                        animation: {
                            speed: 5,
                            type: 'circle',
                            particleDistance: 20,
                            fillColor: 'rgb(247, 129, 244)',
                        },
                    },
                    {
                        to: 'no',
                        isEditable: false,
                        line: {
                            weight: 1,
                            color: 'rgb(212,212,212)',
                            enableBezierCurves: true,
                            dashed: [5, 5],
                        },
                        connector: {
                            shape: 'triangle',
                            dimension: {
                                width: 10,
                                height: 10
                            },
                            color: 'rgb(212,212,212)',
                            fillColor: 'rgb(212,212,212)',
                        },
                        animation: {
                            speed: 5,
                            type: 'circle',
                            fillColor: 'rgb(247, 129, 244)',
                            particleDistance: 20,
                        },
                    },
                ],
                background: {
                    color: 'rgb(59, 64, 66)',
                },
                padding: {
                    top: 50,
                    right: 50,
                    bottom: 50,
                    left: 50,
                },
                shadow: {
                    offsetX: 10,
                    offsetY: 10,
                    color: 'black',
                    blur: 0
                },
                border: {
                    radius: 10,
                    lineWidth: 1,
                    color: 'rgb(212, 212, 212)',
                    selected: {
                        lineWidth: 1,
                        color: 'rgb(212, 212, 212)',
                    },
                    hover: {
                        lineWidth: 1,
                        color: 'rgb(212, 212, 212)',
                    },
                },
                body: {
                    text: 'OS == Win32',
                    alignment: 'start',
                    divider: {
                        width: 1,
                        color: 'rgb(0,0,0)',
                    },
                    font: {
                        family: 'Arial',
                        style: 'normal',
                        variant: 'normal',
                        color: 'rgb(212,212,212)',
                        size: 20,
                        weight: 'bold',
                    },
                },
            },
            yes: {
                position: {
                    x: 51,
                    y: 362,
                },
                states: ['stage2'],
                isDraggable: true,
                connections: [{
                    to: 'stage2',
                    isEditable: false,
                    line: {
                        weight: 1,
                        color: 'rgb(212,212,212)',
                        enableBezierCurves: true,
                        dashed: [5, 5],
                    },
                    connector: {
                        shape: 'triangle',
                        dimension: {
                            width: 10,
                            height: 10
                        },
                        color: 'rgb(212,212,212)',
                        fillColor: 'rgb(212,212,212)',
                    },
                    animation: {
                        speed: 5,
                        type: 'circle',
                        fillColor: 'rgb(247, 129, 244)',
                        particleDistance: 20,
                    },
                }, ],
                background: {
                    color: 'rgb(59, 64, 66)',
                },
                shadow: {
                    offsetX: 10,
                    offsetY: 10,
                    color: 'black',
                    blur: 0
                },
                border: {
                    radius: 20,
                    lineWidth: 1,
                    color: 'rgb(212, 212, 212)',
                    selected: {
                        lineWidth: 1,
                        color: 'rgb(212, 212, 212)',
                    },
                    hover: {
                        lineWidth: 1,
                        color: 'rgb(212, 212, 212)',
                    },
                },
                header: {
                    text: 'Build',
                    alignment: 'center',
                    icon: {
                        src: 'https://imagens.canaltech.com.br/empresas/690.400.jpg',
                        position: {
                            x: 0,
                            y: 0,
                        },
                        dimension: {
                            width: 25,
                            height: 25,
                        },
                    },
                    font: {
                        family: 'Arial',
                        style: 'normal',
                        variant: 'normal',
                        color: 'rgb(212,212,212)',
                        size: 20,
                        weight: 'bold',
                    },
                    padding: {
                        top: 15,
                        left: 0,
                        right: 15,
                        bottom: 15,
                    },
                    divider: {
                        color: 'rgb(212, 212, 212)',
                        width: 1,
                    },
                },
                body: {
                    text: 'Windows',
                    alignment: 'start',
                    font: {
                        family: 'Arial',
                        style: 'normal',
                        variant: 'normal',
                        color: 'rgb(212,212,212)',
                        size: 20,
                        weight: 'bold',
                    },
                },
            },
            no: {
                position: {
                    x: 350,
                    y: 357,
                },
                isDraggable: true,
                states: ['stage2'],
                connections: [{
                    to: 'stage2',
                    isEditable: false,
                    line: {
                        weight: 1,
                        color: 'rgb(212,212,212)',
                        enableBezierCurves: true,
                        dashed: [5, 5],
                    },
                    connector: {
                        shape: 'triangle',
                        dimension: {
                            width: 10,
                            height: 10
                        },
                        color: 'rgb(212,212,212)',
                        fillColor: 'rgb(212,212,212)',
                    },
                    animation: {
                        speed: 5,
                        type: 'circle',
                        fillColor: 'rgb(247, 129, 244)',
                        particleDistance: 20,
                    },
                }, ],
                background: {
                    color: 'rgb(59, 64, 66)',
                },
                shadow: {
                    offsetX: 10,
                    offsetY: 10,
                    color: 'black',
                    blur: 0
                },
                border: {
                    radius: 20,
                    lineWidth: 1,
                    color: 'rgb(212, 212, 212)',
                    selected: {
                        lineWidth: 1,
                        color: 'rgb(212, 212, 212)',
                    },
                    hover: {
                        lineWidth: 1,
                        color: 'rgb(212, 212, 212)',
                    },
                },
                header: {
                    text: 'Build',
                    alignment: 'center',
                    font: {
                        family: 'Arial',
                        style: 'normal',
                        variant: 'normal',
                        color: 'rgb(212,212,212)',
                        size: 20,
                        weight: 'bold',
                    },
                    padding: {
                        top: 15,
                        left: 15,
                        right: 15,
                        bottom: 15,
                    },
                    divider: {
                        color: 'rgb(212, 212, 212)',
                        width: 1,
                    },
                },
                body: {
                    text: 'Linux',
                    alignment: 'start',
                    font: {
                        family: 'Arial',
                        style: 'normal',
                        variant: 'normal',
                        color: 'rgb(212,212,212)',
                        size: 20,
                        weight: 'bold',
                    },
                },
            },
            stage2: {
                position: {
                    x: 196,
                    y: 580,
                },
                isDraggable: true,
                states: ['start'],
                connections: [{
                    to: 'end',
                    isEditable: false,
                    line: {
                        weight: 1,
                        color: 'rgb(212,212,212)',
                        enableBezierCurves: true,
                        dashed: [5, 5],
                    },
                    connector: {
                        shape: 'triangle',
                        dimension: {
                            width: 10,
                            height: 10
                        },
                        color: 'rgb(212,212,212)',
                        fillColor: 'rgb(212,212,212)',
                    },
                    animation: {
                        speed: 5,
                        type: 'circle',
                        fillColor: 'rgb(247, 129, 244)',
                        particleDistance: 20,
                    },
                }, ],
                background: {
                    color: 'rgb(59, 64, 66)',
                },
                shadow: {
                    offsetX: 10,
                    offsetY: 10,
                    color: 'black',
                    blur: 0
                },
                border: {
                    radius: 20,
                    lineWidth: 1,
                    color: 'rgb(212, 212, 212)',
                    selected: {
                        lineWidth: 1,
                        color: 'rgb(212, 212, 212)',
                    },
                    hover: {
                        lineWidth: 1,
                        color: 'rgb(212, 212, 212)',
                    },
                },
                header: {
                    text: 'Deploy',
                    alignment: 'center',
                    font: {
                        family: 'Arial',
                        style: 'normal',
                        variant: 'normal',
                        color: 'rgb(212,212,212)',
                        size: 20,
                        weight: 'bold',
                    },
                    padding: {
                        top: 15,
                        left: 15,
                        right: 15,
                        bottom: 15,
                    },
                    divider: {
                        color: 'rgb(212, 212, 212)',
                        width: 1,
                    },
                },
                body: {
                    text: 'Sandbox',
                    alignment: 'start',
                    font: {
                        family: 'Arial',
                        style: 'normal',
                        variant: 'normal',
                        color: 'rgb(212,212,212)',
                        size: 20,
                        weight: 'bold',
                    },
                },
            },
            end: {
                position: {
                    x: 219,
                    y: 773,
                },
                isDraggable: true,
                isConnectable: true,
                canConnect: true,
                background: {
                    color: 'rgb(59, 64, 66)',
                },
                shadow: {
                    offsetX: 10,
                    offsetY: 10,
                    color: 'black',
                    blur: 0
                },
                border: {
                    radius: 20,
                    lineWidth: 1,
                    color: 'rgb(212, 212, 212)',
                    selected: {
                        lineWidth: 1,
                        color: 'rgb(212, 212, 212)',
                    },
                    hover: {
                        lineWidth: 1,
                        color: 'rgb(212, 212, 212)',
                    },
                },
                padding: {
                    top: 50,
                    right: 50,
                    bottom: 50,
                    left: 50,
                },
                body: {
                    text: 'End',
                    alignment: 'start',
                    font: {
                        family: 'Arial',
                        style: 'normal',
                        variant: 'normal',
                        color: 'rgb(212,212,212)',
                        size: 20,
                        weight: 'bold',
                    },
                },
            },
        }

        const flow = new futureFlow.Flow({
            options,
            data,
        })

        let selectedEntity = null
        const entityName = document.getElementById('entity-name')
        const entityBackgroundColorInput = document.getElementById(
            'entity-background-color'
        )
        const entityBodyTextInput = document.getElementById('body')
        const entityHeaderTextInput = document.getElementById('header')
        const entityFooterTextInput = document.getElementById('footer')
        const entityBorderRadiusInput = document.getElementById(
            'border-radius'
        )
        const entityBorderColorInput = document.getElementById(
            'entity-border-color'
        )
        const entityBorderWidthInput = document.getElementById(
            'entity-border-width'
        )
        const entityBorderSelectedColorInput = document.getElementById(
            'entity-border-selected-color'
        )
        const entityBorderSelectedWidthInput = document.getElementById(
            'entity-border-selected-width'
        )
        const entityBorderHoverColorInput = document.getElementById(
            'entity-border-hover-color'
        )
        const entityBorderHoverWidthInput = document.getElementById(
            'entity-border-hover-width'
        )

        document
            .getElementById('close-form')
            .addEventListener('click', () => {
                document.getElementById('block-details').style.width = '0px'
                document.getElementById('block-details').style.opacity = '0'
                document.getElementById('form').classList.remove('mx-2')
            })

        flow.on('mouseenterentity', event => {})

        flow.on('mouseleaveentity', event => {
            /*document.getElementById(
                'entitydata'
            ).innerHTML = event.detail.prettier()*/
        })

        flow.on('clickentity', event => {
            /*document.getElementById(
                'entitydata'
            ).innerHTML = event.detail.prettier()*/
            document.getElementById('block-details').style.width = '300px'
            document.getElementById('block-details').style.opacity = '1'
            document.getElementById('form').classList.add('mx-2')

            selectedEntity = event.detail
            console.log(selectedEntity);
            entityName.innerText = event.detail.name
            entityBorderRadiusInput.value = event.detail.shape.border.radius
            entityBackgroundColorInput.value =
                event.detail.shape.background.color.hex
            entityBodyTextInput.value = event.detail.body ?
                event.detail.body.text :
                null
            entityHeaderTextInput.value = event.detail.header ?
                event.detail.header.text :
                null
            entityFooterTextInput.value = event.detail.footer ?
                event.detial.footer.text :
                null
            entityBorderColorInput.value = event.detail.shape.border.color.hex
            entityBorderWidthInput.value = event.detail.shape.border.width
            entityBorderSelectedColorInput.value =
                event.detail.shape.border.selected.color.hex
            entityBorderSelectedWidthInput.value =
                event.detail.shape.border.selected.width
            entityBorderHoverColorInput.value =
                event.detail.shape.border.hover.color.hex
            entityBorderHoverWidthInput.value =
                event.detail.shape.border.hover.width
        })

        flow.on('dbtouch', event => {})

        flow.on('touchstartentity', event => {})

        flow.on('touchendentity', event => {})

        flow.on('onkeypress', event => {})

        entityBackgroundColorInput.addEventListener('input', e => {
            selectedEntity.shape.background.color = e.target.value
        })

        entityBodyTextInput.addEventListener('input', e => {
            selectedEntity.body.text = e.target.value
        })

        entityHeaderTextInput.addEventListener('input', e => {
            selectedEntity.header.text = e.target.value
        })
        entityFooterTextInput.addEventListener('input', e => {
            selectedEntity.footer.text = e.target.value
        })

        entityBorderRadiusInput.addEventListener('input', e => {
            selectedEntity.shape.border.radius = e.target.valueAsNumber
        })

        entityBorderColorInput.addEventListener('input', e => {
            selectedEntity.shape.border.color = e.target.value
        })

        entityBorderWidthInput.addEventListener('input', e => {
            selectedEntity.shape.border.width = e.target.value
        })

        entityBorderSelectedColorInput.addEventListener('input', e => {
            selectedEntity.shape.border.selected.color = e.target.value
        })

        entityBorderSelectedWidthInput.addEventListener('input', e => {
            selectedEntity.shape.border.selected.width = e.target.value
        })

        entityBorderHoverColorInput.addEventListener('input', e => {
            selectedEntity.shape.border.hover.color = e.target.value
        })

        entityBorderHoverWidthInput.addEventListener('input', e => {
            selectedEntity.shape.border.hover.width = e.target.value
        })

        //Changing the block status will dispatch an Event that can be hooked with a Callback
        setTimeout(() => {
            flow.getEntityByName('start').state = 'start'
        }, 3000)

        setTimeout(() => {
            flow.getEntityByName('condition1')
                .getConnectionByName('yes')
                .startAnimation()
        }, 6000)

        setTimeout(() => {
            flow.getEntityByName('yes').startAllAnimations()
        }, 9000)

        setTimeout(() => {
            flow.getEntityByName('stage2').state = 'start'
        }, 12000)

        //Block Status Event Callback
        flow.getEntityByName('start').on('start', e => {
            flow.getEntityByName('start').startAllAnimations()
        })

        flow.getEntityByName('stage2').on('start', e => {
            flow.getEntityByName('stage2').startAllAnimations()
        })
    </script>
</body>
</html>`;
}

// this method is called when your extension is deactivated
export function deactivate() {}
