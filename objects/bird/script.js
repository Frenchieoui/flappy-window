let spriteIndex = 0

setInterval(() => {
    spriteIndex++
    if (spriteIndex > 3) {
        spriteIndex = 0
    }

    $("#bird").attr("src", `../../assets/bird/bird${spriteIndex}.png`)
}, 500)

window.resizeWindow(100, 100)

const gameWorker = new SharedWorker("../../worker/game.js");
gameWorker.port.onmessage = (e) => {
    // window.resizeWindow(100, 100)
    window.centerPlace(e.data.x, e.data.y)
    window.focus()
};
gameWorker.port.start()

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
gameWorker.port.postMessage({ id })

document.addEventListener("keydown", (e) => {
    gameWorker.port.postMessage({ type: "keydown", key: e.key })
})

document.addEventListener("keyup", (e) => {
    gameWorker.port.postMessage({ type: "keyup", key: e.key })
})