package main

import (
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("src"))
	http.Handle("/", fs)

	log.Println("Listening on port 5000")
	http.ListenAndServe("127.0.0.1:5000", nil)
}
