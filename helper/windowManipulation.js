window.centerPlace = (x, y) => {
    window.moveTo(x + innerWidth / 2, y - (outerHeight - innerHeight) + innerHeight / 2)
}

window.cornerPlace = (x, y) => {
    window.moveTo(x, y - (outerHeight - innerHeight))
}

window.resizeWindow = (width, height) => {
    window.resizeTo(width, height + (outerHeight - innerHeight))
}