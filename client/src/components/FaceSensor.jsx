import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import * as blazeface from '@tensorflow-models/blazeface'
import * as tf from '@tensorflow/tfjs'
import regeneratorRuntime from 'regenerator-runtime'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import drawRectangle from '../utilities/drawRectangle'
import IsMobileBrowser from '../hooks/IsMobileBrowser.jsx'
import SendToMobileIcon from '@mui/icons-material/SendToMobile'
import TextField from '@mui/material/TextField'
import Webcam from 'react-webcam'

const API_URL = process.env.API_URL


const FaceSensor = () => {
  const [attendees, setAttendees] = useState(0)
  const [contactDialogOpen, setContactDialogOpen] = useState(false)

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

  const renderContactDialog = () => {
    const [phone, setPhone] = useState('')
    
    const closeContactDialog = () => {
      setContactDialogOpen(false)
    }

    const handleSend = () => {
      axios.post(API_URL + '/send', { phone: phone, attendees: attendees })
      setContactDialogOpen(false)
    }

    return (
      <Dialog open={contactDialogOpen} onClose={closeContactDialog}>
        <DialogTitle style={{fontFamily: 'Trebuchet MS', fontSize: 20}}>Send yourself the attendance report</DialogTitle>
        <div style={{padding: '0px 25px 30px', marginTop: -15}}>
          <p style={{fontFamily: 'Trebuchet MS', fontSize: 15, marginTop: 17}}>Phone Number</p>
          <TextField onChange={e => setPhone(e.target.value)} placeholder='Enter phone number here' style={{backgroundColor: '#FFFFFF', width: '100%', marginTop: -8}} />
        </div>
        <DialogActions style={{padding: '0px 10px 20px'}}>
            <Button onClick={handleSend} variant='contained'>Send</Button>
            <Button onClick={closeContactDialog} variant='outlined'>Cancel</Button>
          </DialogActions>
      </Dialog>
    )
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      {renderContactDialog()}
      { IsMobileBrowser() ?
          (typeof webcamRef.current === 'undefined' || webcamRef.current === null || webcamRef.current.video.readyState !== 4) ?
            <div>
              <h1 style={{fontFamily: 'Trebuchet MS', fontSize: 15, textAlign: 'center', width: 100}}>Please wait, your webcam is loading...</h1>
            </div>
            :
            <h1 style={{fontFamily: 'Trebuchet MS', fontSize: 22, textAlign: 'center', marginBottom: 300}}>
              {attendees} attending
              <Button onClick={() => setContactDialogOpen(true)} style={{marginLeft: '10px'}}><SendToMobileIcon/></Button>
            </h1>
          :
          (typeof webcamRef.current === 'undefined' || webcamRef.current === null || webcamRef.current.video.readyState !== 4) ?
            <div>
              <h1 style={{fontFamily: 'Trebuchet MS', fontSize: 22, textAlign: 'center', width: 600}}>Please wait, your webcam is loading...</h1>
              <h1 style={{fontFamily: 'Trebuchet MS', fontSize: 22, marginLeft: 10, marginRight: 10, textAlign: 'center', width: 600}}>Please make sure your webcam is working and your browser has permission to use it.</h1>
            </div>
            :
            <h1 style={{fontFamily: 'Trebuchet MS', fontSize: 22, textAlign: 'center', marginBottom: 600}}>
              {attendees} attending
              <Button onClick={() => setContactDialogOpen(true)} style={{marginLeft: '10px'}}><SendToMobileIcon/></Button>
            </h1>
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
