
/**
 * Helper class for managing Dial Events based on Dial Mode.
 */
class DialManager {
    private static instance: DialManager;

    private controller: Windows.UI.Input.RadialController;
    private config: Windows.UI.Input.RadialControllerConfiguration;

    private sets: { [key: string]: DialCommandSet } = {};

    public current: DialCommandSet = new DialCommandSet();
    public currentKey: string;

    private constructor() {
        this.controller = Windows.UI.Input.RadialController.createForCurrentView();
        this.config = Windows.UI.Input.RadialControllerConfiguration.getForCurrentView();

        this.controller.addEventListener("buttonclicked", (ev) => {
            // returns null if system tool is active.
            if (this.controller.menu.getSelectedMenuItem() != null &&
                this.current.selectedCommand &&
                this.current.selectedCommand.buttonClicked) {

                this.current.selectedCommand.buttonClicked(ev);
            }
        });

        this.controller.addEventListener("rotationchanged", (ev) => {
            // returns null if system tool is active.
            if (this.controller.menu.getSelectedMenuItem() != null &&
                this.current.selectedCommand &&
                this.current.selectedCommand.rotationChanged) {

                this.current.selectedCommand.rotationChanged(ev);
            }
        });
    }

    static getInstance() {
        if (!DialManager.instance) {
            DialManager.instance = new DialManager();
        }
        return DialManager.instance;
    }

    /**
     * Registers 
     * @param key
     * @param modeset
     */
    registerContext(key: string, modeset: DialCommandSet)
    {
        this.sets[key] = modeset;

        modeset.dialManager = this;
    }

    /**
     * Changes the Dial Menu to be in the context of the passed in mode set.
     *
     * @param modeset mode set to switch to
     * @returns the mode set corresponding to the requested key
     */
    setContext(key: string): DialCommandSet {
        //var prev = this.current;

        let selectedMode: string = null;
        if (this.current && this.current.selectedCommand) {
            selectedMode = this.current.selectedCommand.displayText;
        }
        let systemSelected = (this.controller.menu.getSelectedMenuItem() === null);

        // TODO: Check for key first
        this.current = this.sets[key];
        this.currentKey = key;
        this.current.dialManager = this;

        // call any events here for notification?

        // update Controller
        if (this.current.systemItems.length !== DialCommandSet.NumberOfSystemItems) {
            // TODO: Check how this interacts with the 'next track' injection...
            this.config.setDefaultMenuItems(<any>this.current.systemItems);
        }

        var toSelect: Windows.UI.Input.RadialControllerMenuItem = null;
        this.controller.menu.items.clear();
        this.current.customItems.forEach((item, index) => {
            if (item.displayText === selectedMode) {
                toSelect = item;
            }
            this.controller.menu.items.push(item);
        });

        if (!systemSelected && toSelect) {
            // TODO: This invokes the menu item again
            // Probably want to compare lists and not clear out menu items if same mode within it...
            this.controller.menu.selectMenuItem(toSelect);
        }

        return this.current;
    }

    // Following two functions called by DialCommandSet automatically when switching modes
    // INTERNAL
    changeHapticFeedback(value: boolean) {
        this.controller.useAutomaticHapticFeedback = value;
    }

    // INTERNAL
    changeRotationResolution(value: number) {
        this.controller.rotationResolutionInDegrees = value;
    }
}