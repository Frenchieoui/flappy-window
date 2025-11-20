importScripts("gameObject.js")

class Engine {
    constructor(frameRate) {
        this.width = null
        this.height = null
        this.master = null
        this.gameObjects = {}
        this.frameRate = frameRate
        this.updateInterval = null
        this.lastUpdate = null

        self.onconnect = this.onConnect.bind(this)
    }

    onReady() {

    }

    _onReady() {
        this.onReady()

        this.lastUpdate = Date.now()

        this.updateInterval = setInterval(this._update.bind(this), 1000 / this.frameRate)
    }

    _update() {
        const now = Date.now()
        const dt = now - this.lastUpdate
        this.lastUpdate = now

        this.update(dt)

        for (const id in this.gameObjects) {
            this.gameObjects[id].update(dt)
        }
    }

    update(dt) {

    }

    onConnect(e) {
        const port = e.ports[0]

        port.onmessage = (e) => {
            if (e.data.type) {
                this.onMessage(port, e)
            } else {
                this.initOnMessage(port, e)
            }
        }
    }

    onMessage(port, e) {

    }

    initOnMessage(port, e) {
        if (e.data.isMaster) {
            this.master = port
            this.master.onmessage = undefined;
            this.width = e.data.width
            this.height = e.data.height

            this._onReady()
        } else {
            this.gameObjects[e.data.id].setPort(port)
            port.id = e.data.id
        }

        port.postMessage({ type: "msg", msg: (e.data.isMaster ? "master" : e.data.id) + " connected to worker" })

        console.log((e.data.isMaster ? "master" : e.data.id) + " connected")
    }
}