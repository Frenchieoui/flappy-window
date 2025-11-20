let start = false
let windows = []

$("#start").on("click", () => {
    $("#title").text("Minimize the tab to start... please uwu?")
    $("#start").text("Close All Windows")
    if (!windows.length) start = true
    for (const win of windows) {
        try {
            win.close()
            console.log("window close :)")
        } catch {
            console.log("window no close :(")
        }
    }
})

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== "hidden" || !start) return;

    start = false

    const getAvailableGameArea = window.open("getAvailableGameArea.html", "getAvailableGameArea", "popup=true,width=1,height=1")
    const bc = new BroadcastChannel("getAvailableGameArea")

    bc.onmessage = (e) => {
        getAvailableGameArea.close()
        bc.close()

        const gameWorker = new SharedWorker("worker/game.js");
        gameWorker.port.onmessage = onMessage;
        gameWorker.port.start()

        gameWorker.port.postMessage({ isMaster: true, width: e.data.width, height: e.data.height })
    }
})

function onMessage(e) {
    if (e.data.type === "msg") {
        console.log(e.data.msg)
    } else if (e.data.type === "create game object") {
        windows.push(
            window.open(e.data.file + "?id=" + e.data.id, e.data.id, "popup=true,width=1,height=1")
        )
    }
}