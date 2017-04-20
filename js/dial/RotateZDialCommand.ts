
class RotateZDialCommand implements IDialCommand {
    displayText = "Rotate Z";
    icon = Windows.Storage.Streams.RandomAccessStreamReference.createFromUri(new Windows.Foundation.Uri("ms-appx:///icons/RotZ.png"));

    useAutomaticHapticFeedback = true;
    rotationResolutionInDegrees = 10;

    dialManager: DialManager;

    private initialRot: number;

    constructor(private mesh: BABYLON.AbstractMesh) {
        this.initialRot = mesh.rotation.z;
    }

    invoked(ev) {
    }

    buttonClicked(ev) {
        this.mesh.rotation.z = this.initialRot;
    }

    rotationChanged(ev: Windows.Foundation.TypedEventHandlerArgumentType<Windows.UI.Input.RadialController, Windows.UI.Input.RadialControllerRotationChangedEventArgs>) {
        this.mesh.rotation.z += ev.detail[0].rotationDeltaInDegrees * (Math.PI / 180);
    }
}