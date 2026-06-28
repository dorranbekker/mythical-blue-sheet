package main

import (
	"log"
	"net/http"
	"path/filepath"

	"raperonzolo/character-sheet/pkg/server"
)

func main() {
	mux := http.NewServeMux()
	mux.Handle("/api/", server.NewAPIHandler(filepath.Join("public")))
	mux.Handle("/", http.FileServer(http.Dir("public")))

	log.Println("listening on :8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal(err)
	}
}
