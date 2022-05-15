const path = require('path')

const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv').config({path: path.resolve(__dirname, '../../.env')})
const favicon = require('serve-favicon')
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
const PORT = process.env.PORT || 3001

const app = express()
app.use(cors({origin: true}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, '../../client/dist')))
app.use(favicon(path.resolve(__dirname, '../../client/src/assets/favicon.ico')))
app.listen(PORT, () => console.log(`Listening on ${PORT}`))

app.post('/send', (req, res) => {
  const { phone, attendees } = req.body

  twilio.messages.create({
     body: `Attendees: ${attendees}`,
     from: '+19853228077',
     to: phone
   })

   return res.send('Text sent successfully')
})
