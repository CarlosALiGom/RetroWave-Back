# Endpoints

## <u>Ping</u>

### method:

- GET

### url:

- https://carlos-aliaga-final-project-back-202304.onrender.com

#### response:

- 200 Ok
- { "message": "🏓 Pong }

## <u>Login User</u>

### method:

- POST

### url:

- https://carlos-aliaga-final-project-back-202304.onrender.com/user/login

### request:

#### body:

- {
  "username": "admin",
  "password": "admin"
  }

### response:

- 200 Ok
- {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJzdWIiOiI2NDcwN2RkZjJkMDljZDE1NDBmMGZhYWYiLCJpYXQiOjE2ODY1MTk3MDgsImV4cCI6MTY4Njc3ODkwOH0.p2HrkjPHi8pGlJ42xduncZLHfAw6pk3mBPGl1omeFbg"
  }

## <u>Get Synths</u>

### method:

- GET

### url:

- https://carlos-aliaga-final-project-back-202304.onrender.com/synths

### request:

- params: {
  skip: 0,
  limit: 2, (in the app we ask for 6 each time)
  }

#### body:

- { auth: { bearer: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJzdWIiOiI2NDcwN2RkZjJkMDljZDE1NDBmMGZhYWYiLCJpYXQiOjE2ODY1MTk3MDgsImV4cCI6MTY4Njc3ODkwOH0.p2HrkjPHi8pGlJ42xduncZLHfAw6pk3mBPGl1omeFbg"}}}

### response:

- 200 Ok
- {
  "synths": [
  {
  "name": "Digitone",
  "brand": "Elektron",
  "imageUrl": "https://media.discordapp.net/attachments/1116096712147222663/1117082155370172496/1ELEKTRONDIGITAKT-1.webp?width=724&height=585",
  "description": "The Elektron Digitone is a powerful digital synthesizer that combines FM synthesis with a classic subtractive synthesis architecture. It offers a wide range of complex and evolving sounds, making it suitable for various musical styles. With its intuitive interface, versatile sequencer, and powerful sound engine, the Digitone allows for deep sound exploration and intricate pattern creation.",
  "yearOfCreation": "2018",
  "type": "Digital",
  "user": "64707ddf2d09cd1540f0faaf",
  "id": "648482e21423dff145f68c6c"
  },
  {
  "name": "System-1",
  "brand": "Roland",
  "imageUrl": "https://media.discordapp.net/attachments/1116096712147222663/1117089009907273748/system-1.webp?width=724&height=585",
  "description": "The Roland System-1 is a versatile synthesizer that combines analog modeling with digital sound processing. It offers a wide range of classic Roland synth sounds, along with the ability to create new and unique sounds using its flexible architecture. With its intuitive interface, powerful sound engine, and extensive control options, the System-1 is a popular choice for both studio production and live performances.",
  "yearOfCreation": "2014",
  "type": "Hybrid",
  "user": "64707ddf2d09cd1540f0faaf",
  "id": "648482e21423dff145f68c6b"
  }
  ],
  "totalSynths": 20
  }

## <u>Delete Synth</u>

### method:

- Delete

### url:

- https://carlos-aliaga-final-project-back-202304.onrender.com/synths/:synthId

### request:

#### body:

- 200 Ok
- { auth: { bearer: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJzdWIiOiI2NDcwN2RkZjJkMDljZDE1NDBmMGZhYWYiLCJpYXQiOjE2ODY1MTk3MDgsImV4cCI6MTY4Njc3ODkwOH0.p2HrkjPHi8pGlJ42xduncZLHfAw6pk3mBPGl1omeFbg"}}}

### response:

- {
  "message": "Synth deleted succesfully"
  }

## <u>Add Synth</u>

### method:

- POST

### url:

- https://carlos-aliaga-final-project-back-202304.onrender.com/synths

### request:

#### body:

- { auth: { bearer: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJzdWIiOiI2NDcwN2RkZjJkMDljZDE1NDBmMGZhYWYiLCJpYXQiOjE2ODY1MTk3MDgsImV4cCI6MTY4Njc3ODkwOH0.p2HrkjPHi8pGlJ42xduncZLHfAw6pk3mBPGl1omeFbg"}}}

- {
  "synth":
  {
  "name": "tr 4408",
  "brand": "Rol12312and",
  "imageUrl": "Rola12321nd tr 808 image",
  "yearOfCreation": "19823120",
  "type": "Hybrid",
  "description": "Anal12312og drum machine"
  }
  }

### response:

- 201, OK.
- {
  "synth": {
  "name": "tr 4408",
  "brand": "Rol12312and",
  "imageUrl": "Rola12321nd tr 808 image",
  "description": "Anal12312og drum machine",
  "yearOfCreation": "19823120",
  "type": "Hybrid",
  "user": "64707ddf2d09cd1540f0faaf",
  "id": "648641d8dbe68344b7162de1"
  }
  }
