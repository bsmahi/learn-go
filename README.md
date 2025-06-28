
1. go version
2. go mod init github.com/bsmahi/react-go-tutorial
3. Right-click on learn-go and create main.go
4. go run main.go
5. go get github.com/gofiber/fiber/v2

var myName string = "Puneeth Sai"

const mySecondName string = "Swarna Kumari"

myThirdName := "Yakshith Sriram"

fmt.Println(myName)

fmt.Println(mySecondName)

fmt.Println(myThirdName)

go install github.com/cosmtrek/air@latest - deprecated

go install github.com/air-verse/air@latest

export PATH="$PATH:$(go env GOPATH)/bin"

go get github.com/joho/godotenv

## GO API's WITH IN MEMORY DB

```go

package main

import (
   "fmt"
   "log"
   "os"

   "github.com/gofiber/fiber/v2"
   "github.com/joho/godotenv"
)

type Todo struct {
   ID int `json:"id"`
   Completed bool `json:"completed"`
   Body string `json:"body"`
}

func main() {
   fmt.Println("Go Hello World!")
   var x int = 5

   var p *int = &x

   fmt.Println(p) // returns the memory address of the variable
   fmt.Println(*p) // returns the value of the variable

   app := fiber.New()

   err := godotenv.Load(".env")

   if err != nil {
     log.Fatal("Error loading .env file")
   }

   PORT := os.Getenv("PORT")

   todos := []Todo{}

   app.Get("/api/todos", func(c *fiber.Ctx) error {
      return c.Status(200).JSON(todos)
   })

   // CREATE A TODO
   app.Post("/api/todos", func(c *fiber.Ctx) error {
      todo := &Todo{}

      if err := c.BodyParser(todo); err != nil {
        return err
      }

      if todo.Body == "" {
         return c.Status(400).JSON(fiber.Map{"error": "Todo body is required"})
      }

      todo.ID = len(todos) + 1
      todos = append(todos, *todo)

      var x int = 5

      var p *int = &x

      fmt.Println(p)
      fmt.Println(*p)

      return c.Status(201).JSON(todo)
   })

   // UPDATE TODO
   app.Patch("/api/todos/:id", func(c *fiber.Ctx) error {
     id := c.Params("id")

     for i, todo := range todos {
       if fmt.Sprint(todo.ID) == id {
         todos[i].Completed = true
         return c.Status(200).JSON(todos[i])
       }
     }
     return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
   })

   // DELETE TODO

   app.Delete("/api/todos/:id", func(c *fiber.Ctx) error {
     id := c.Params("id")

     for i, todo := range todos {
       if fmt.Sprint(todo.ID) == id {
          todos = append(todos[:i], todos[i+1:]...)
          return c.Status(200).JSON(fiber.Map{"success": true})
       }
     }

   return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})

   })


   log.Fatal(app.Listen(":"+PORT))
}
```

WITH MONGODB

go get go.mongodb.org/mongo-driver/mongo