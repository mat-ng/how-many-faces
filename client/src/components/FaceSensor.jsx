import React, { useRef, useState, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'

import * as blazeface from '@tensorflow-models/blazeface'
import drawRectangle from '../utilities/drawRectangle'
import IsMobileBrowser from '../hooks/IsMobileBrowser.jsx'
import regeneratorRuntime from 'regenerator-runtime'
import Webcam from 'react-webcam'

const FaceSensor = () => {
  const [attendees, setAttendees] = useState(0)

  const webcamRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const startDetecting = async () => {
      const net = await blazeface.load()
      setInterval(() => {
        detectFaces(net)
      }, 100)
    }
    startDetecting()
  }, [])


  const detectFaces = async (net) => {
    if ( typeof webcamRef.current !== 'undefined' && webcamRef.current !== null && webcamRef.current.video.readyState === 4 ) {

      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight

      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      canvasRef.current.width = videoWidth
      canvasRef.current.height = videoHeight

      const detectedFaces = await net.estimateFaces(video)
      setAttendees(detectedFaces.length)

      const canvasContext = canvasRef.current.getContext('2d')
      drawRectangle(detectedFaces, canvasContext)
    }
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      { IsMobileBrowser() ?
          (typeof webcamRef.current === 'undefined' || webcamRef.current === null || webcamRef.current.video.readyState !== 4) ?
            <div>
              <h1 style={{fontFamily: 'Trebuchet MS', fontSize: 18, textAlign: 'center', width: 200}}>Please wait, your webcam is loading...</h1>
              <h1 style={{fontFamily: 'Trebuchet MS', fontSize: 18, marginLeft: 10, marginRight: 10, textAlign: 'center', width: 200}}>Please make sure your webcam is working and your browser has permission to use it.</h1>
            </div>
            :
            <h1 style={{fontFamily: 'Trebuchet MS', fontSize: 22, textAlign: 'center', marginBottom: 300}}>{attendees} attending</h1>
          :
          (typeof webcamRef.current === 'undefined' || webcamRef.current === null || webcamRef.current.video.readyState !== 4) ?
            <div>
              <h1 style={{fontFamily: 'Trebuchet MS', fontSize: 22, textAlign: 'center', width: 600}}>Please wait, your webcam is loading...</h1>
              <h1 style={{fontFamily: 'Trebuchet MS', fontSize: 22, marginLeft: 10, marginRight: 10, textAlign: 'center', width: 600}}>Please make sure your webcam is working and your browser has permission to use it.</h1>
            </div>
            :
            <h1 style={{fontFamily: 'Trebuchet MS', fontSize: 22, textAlign: 'center', marginBottom: 600}}>{attendees} attending</h1>
      }

      <Webcam
        ref={webcamRef}
        muted={true} 
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          right: 0,
          left: 0,
          textAlign: "center",
          zindex: 9,
          width: IsMobileBrowser() ? 267 : 640,
          height: IsMobileBrowser() ? 200 : 480,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          right: 0,
          left: 0,
          textAlign: "center",
          zindex: 9,
          width: IsMobileBrowser() ? 267 : 640,
          height: IsMobileBrowser() ? 200 : 480,
        }}
      />
    </div>
  )
}

export default FaceSensor
