const drawRectangle = (faces, canvasContext) => {
  faces.forEach(face => {
    const x = face.topLeft[0]
    const y = face.bottomRight[1]

    const width = face.bottomRight[0] - x
    const height = face.topLeft[1] - y

    canvasContext.rect(x, y, width, height)
    canvasContext.strokeStyle = '#00FF00'
    canvasContext.stroke()
  })
}

export default drawRectangle
