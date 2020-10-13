const express = require("express")

const server =express()

const actionRouter = require("./project_actionFolder/actionRout");
const projectRouter=require("./project_actionFolder/projectRout")
const port = 3000

server.use(express.json())
server.use("/action",actionRouter)
server.use("/project",projectRouter)





// err mideleware
server.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).json({
      message:"Please try again later",
    })
    })

// wellcoming page
server.get("/", (req, res) => {
	res.json({
		message: "Welcome to My Web-Sprint",
	})
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})