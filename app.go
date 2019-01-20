package main

import (
	"log"
	"mime"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	gin := gin.Default()

	gin.Use(static.Serve("/", static.LocalFile("./src", true)))

	gin.Use(cors.Default())

	mime.AddExtensionType(".mjs", "text/javascript")

	PORT := ":5000"
	gin.Run(PORT)
	log.Println("Listening on port localhost" + PORT)
}
