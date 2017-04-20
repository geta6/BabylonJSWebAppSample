
class DialCommandSet {
    public static readonly NumberOfSystemItems = 4;

    private systemitems: Windows.UI.Input.RadialControllerSystemMenuItemKind[] = [
        Windows.UI.Input.RadialControllerSystemMenuItemKind.volume,
        Windows.UI.Input.RadialControllerSystemMenuItemKind.scroll,
        Windows.UI.Input.RadialControllerSystemMenuItemKind.zoom,
        Windows.UI.Input.RadialControllerSystemMenuItemKind.undoRedo
    ];

    private customitems: Windows.UI.Input.RadialControllerMenuItem[] = [];

    public dialManager: DialManager;

    private selected: IDialCommand;
    public get selectedCommand(): IDialCommand {
        return this.selected;
    }

    public get systemItems(): Windows.UI.Input.RadialControllerSystemMenuItemKind[] {
        // Make Copy to Prevent Modification
        return this.systemitems.slice();
    }
    public set systemItems(value: Windows.UI.Input.RadialControllerSystemMenuItemKind[]) {
        this.systemitems = value;

        if (this.systemitems.indexOf(Windows.UI.Input.RadialControllerSystemMenuItemKind.volume) === -1)
        {
            this.systemitems.unshift(Windows.UI.Input.RadialControllerSystemMenuItemKind.volume);
        }
    }

    public get customItems(): Windows.UI.Input.RadialControllerMenuItem[] {
        return this.customitems;
    }

    public removeSystemItem(item: Windows.UI.Input.RadialControllerSystemMenuItemKind) {
        if (item == Windows.UI.Input.RadialControllerSystemMenuItemKind.volume ||
            item == Windows.UI.Input.RadialControllerSystemMenuItemKind.nextPreviousTrack) {
            throw "Windows Guidelines Suggest Not Removing Volume Controls From User.";
        }

        this.systemitems.splice(this.systemitems.indexOf(item), 1);
    }

    public addMode(mode: IDialCommand) {
        var menuitem: Windows.UI.Input.RadialControllerMenuItem;
        if (<any>mode.icon instanceof Windows.Storage.Streams.RandomAccessStreamReference) {
            menuitem = Windows.UI.Input.RadialControllerMenuItem.createFromIcon(mode.displayText, <Windows.Storage.Streams.RandomAccessStreamReference>mode.icon);
        } else {
            menuitem = Windows.UI.Input.RadialControllerMenuItem.createFromKnownIcon(mode.displayText, <Windows.UI.Input.RadialControllerMenuKnownIcon>mode.icon);
        }
        menuitem.addEventListener("invoked", (ev) => {
            this.selected = mode;
            this.selected.dialManager = this.dialManager;
            // Change out feedback settings
            this.dialManager.changeHapticFeedback(this.selected.useAutomaticHapticFeedback);
            this.dialManager.changeRotationResolution(this.selected.rotationResolutionInDegrees);

            // notify mode
            mode.invoked(ev);
        });

        this.customitems.push(menuitem);
    }
}