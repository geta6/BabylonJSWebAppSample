
class RotateXDialCommand implements IDialCommand {
    displayText = "Rotate X";
    icon = Windows.Storage.Streams.RandomAccessStreamReference.createFromUri(new Windows.Foundation.Uri("ms-appx:///icons/RotX.png"));

    useAutomaticHapticFeedback = true;
    rotationResolutionInDegrees = 10;

    dialManager: DialManager;

    private initialRot: number;

    constructor(private mesh: BABYLON.AbstractMesh) {
        this.initialRot = mesh.rotation.x;
    }

    invoked(ev) {
    }

    buttonClicked(ev) {
        this.mesh.rotation.x = this.initialRot;
    }

    rotationChanged(ev: Windows.Foundation.TypedEventHandlerArgumentType<Windows.UI.Input.RadialController, Windows.UI.Input.RadialControllerRotationChangedEventArgs>) {
        this.mesh.rotation.x += ev.detail[0].rotationDeltaInDegrees * (Math.PI / 180);
    }
}