﻿
class BabylonApp {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.FreeCamera;
    private _light: BABYLON.Light;

    constructor(canvasElement: string) {
        // create canvas and engine
        this._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
    }

    createScene(): void {
        // create a basic BJS Scene object
        this._scene = new BABYLON.Scene(this._engine);

        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        this._camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), this._scene);

        // target the camera to scene origin
        this._camera.setTarget(BABYLON.Vector3.Zero());

        // attach the camera to the canvas
        this._camera.attachControl(this._canvas, false);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        this._light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this._scene);

        // create a built-in "sphere" shape; with 16 segments and diameter of 2
        /*let sphere = BABYLON.MeshBuilder.CreateSphere("sphere1",
            { segments: 16, diameter: 2 }, this._scene);*/

        // move the sphere upward 1/2 of its height
        //sphere.position.y = 1;

        // create a built-in "ground" shape
        let ground = BABYLON.MeshBuilder.CreateGround("ground1",
           { width: 6, height: 6, subdivisions: 2 }, this._scene);

        //let stlloader = new BABYLON.STLFileLoader();
        //stlloader.importMesh()

        BABYLON.SceneLoader.ImportMesh("", "models/", "teapot.stl", this._scene,
            (newMeshes, particles, skeletons) => {
                // Set the target of the camera to the first imported mesh
                console.log("Loaded Mesh? " + newMeshes.length);
                newMeshes[0].position = new BABYLON.Vector3(0, 1, 0);
                newMeshes[0].scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
                let material = new BABYLON.StandardMaterial("material01", this._scene);
                material.diffuseColor = new BABYLON.Color3(0, 1, 1);
                newMeshes[0].material = material;
            },
            null,
            (scene, err) => {
                console.error(err);
            }
        );
    }

    animate(): void {
        // run the render loop
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // the canvas/window resize event handler
        window.addEventListener("resize", () => {
            this._engine.resize();
        });
    }
}