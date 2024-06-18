// https://www.npmjs.com/package/express
// npm i express
// "express": "^4.0.0",
// semnatic versioning: MAJOR.MINOR.PATCH
// requires express version 4.0.0 or later but less than version 5.0.0

/*
Example of
creating a server ("Express app")
*/
// node 0.mjs

import express from 'express'

const app = express()

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})