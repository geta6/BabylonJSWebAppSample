
class RotateYDialCommand implements IDialCommand {
    displayText = "Rotate Y";
    icon = Windows.Storage.Streams.RandomAccessStreamReference.createFromUri(new Windows.Foundation.Uri("ms-appx:///icons/RotY.png"));

    useAutomaticHapticFeedback = true;
    rotationResolutionInDegrees = 10;

    dialManager: DialManager;

    private initialRot: number;

    constructor(private mesh: BABYLON.AbstractMesh) {
        this.initialRot = mesh.rotation.y;
    }

    invoked(ev) {
    }

    buttonClicked(ev) {
        this.mesh.rotation.y = this.initialRot;
    }

    rotationChanged(ev: Windows.Foundation.TypedEventHandlerArgumentType<Windows.UI.Input.RadialController, Windows.UI.Input.RadialControllerRotationChangedEventArgs>) {
        this.mesh.rotation.y += ev.detail[0].rotationDeltaInDegrees * (Math.PI / 180);
    }
}