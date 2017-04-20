
class ZoomDialCommand implements IDialCommand {
    displayText = "Zoom";
    icon = Windows.UI.Input.RadialControllerMenuKnownIcon.zoom;

    useAutomaticHapticFeedback = true;
    rotationResolutionInDegrees = 1;

    dialManager: DialManager;

    private initialPos: number;

    constructor(private camera: BABYLON.FreeCamera) {
        this.initialPos = camera.position.z;
    }

    invoked(ev) {
    }

    buttonClicked(ev) {
        this.camera.position.z = this.initialPos;
    }

    rotationChanged(ev: Windows.Foundation.TypedEventHandlerArgumentType<Windows.UI.Input.RadialController, Windows.UI.Input.RadialControllerRotationChangedEventArgs>) {
        this.camera.position.z += ev.detail[0].rotationDeltaInDegrees;
    }
}