class GameObject {
    constructor(engine, file) {

        this.id = String(Date.now() + Math.random())
        engine.gameObjects[this.id] = this

        this.file = file
        this.port = null
        this.onmessage = null

        engine.master.postMessage({ type: "create game object", file: this.file, id: this.id })
    }

    setPort(port) {
        this.port = port
        this.port.onmessage = this.onmessage
    }

    set onMessage(func) {
        this.onmessage = func
        if (this.port) this.port.onmessage = func
    }

    get onMessage() {
        return this.onmessage
    }

    update(dt) {

    }
}