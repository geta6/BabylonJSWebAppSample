
interface IDialCommand {
    displayText: string;
    icon: Windows.UI.Input.RadialControllerMenuKnownIcon | Windows.Storage.Streams.RandomAccessStreamReference;

    useAutomaticHapticFeedback: boolean; // true
    rotationResolutionInDegrees: number; // 10

    // set by parent on add
    dialManager: DialManager;

    invoked: (arg: { type: "invoked"; } & Windows.Foundation.TypedEventHandlerArgumentType<Windows.UI.Input.RadialControllerMenuItem, Object>) => Windows.Foundation.TypedEventHandlerReturnType<Windows.UI.Input.RadialControllerMenuItem, Object>;
    buttonClicked: (arg: { type: "buttonclicked"; } & Windows.Foundation.TypedEventHandlerArgumentType<Windows.UI.Input.RadialController, Windows.UI.Input.RadialControllerButtonClickedEventArgs>) => Windows.Foundation.TypedEventHandlerReturnType<Windows.UI.Input.RadialControllerMenuItem, Object>;
    // buttonreleased
    // buttonholding
    rotationChanged: (arg: { type: "rotationchanged"; } & Windows.Foundation.TypedEventHandlerArgumentType<Windows.UI.Input.RadialController, Windows.UI.Input.RadialControllerRotationChangedEventArgs>) => Windows.Foundation.TypedEventHandlerReturnType<Windows.UI.Input.RadialControllerMenuItem, Object>;
}