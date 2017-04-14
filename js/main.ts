
window.addEventListener("DOMContentLoaded", () => {
    // make window full screen
    Windows.UI.ViewManagement.ApplicationView.getForCurrentView().tryEnterFullScreenMode();
    Windows.UI.ViewManagement.ApplicationView.preferredLaunchWindowingMode = Windows.UI.ViewManagement.ApplicationViewWindowingMode.fullScreen;

    // create the app using the 'renderCanvas'
    let app = new BabylonApp("renderCanvas");

    // create the scene
    app.createScene();

    // start animation
    app.animate();
});