const express = require("express")
const app = express()
const port = 3000
const studentsRoutes = require('./src/student/routes')

app.use(express.json())
app.use('/api/v1/students',studentsRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})