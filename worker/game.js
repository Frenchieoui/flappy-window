importScripts("engine.js")

const engine = new Engine(60)

engine.onReady = () => {
    const bird = new GameObject(engine, "objects/bird/index.html")
    bird.x = 1000
    bird.y = 300
    bird.yVel = 0
    bird.keys = {}
    bird.onMessage = (e) => {
        if (e.data.type === "keydown") {
            bird.keys[e.data.key] = true
        }
        if (e.data.type === "keyup") {
            bird.keys[e.data.key] = false
        }
    }
    bird.update = (dt) => {
        if (bird.keys[" "]) {
            bird.yVel = -5;
        } else {
            bird.yVel += 0.2;
        }

        bird.y += bird.yVel

        if (bird.y - 50 < 0) {
            bird.y = 50
        }
        if (bird.y + 50 > engine.height) {
            bird.y = engine.height - 50
        }

        if (bird.port) bird.port.postMessage({ x: bird.x, y: bird.y })
    }
}
