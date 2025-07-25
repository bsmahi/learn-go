import { Container, Stack } from '@chakra-ui/react'
import Navbar from './components/navbar'
import TodoForm from './components/todoform'
import TodoList from './components/todolist'

export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

function App() {
  return (
    <Stack h="100vh">
      <Navbar/>
      <Container>
        <TodoForm/>
        <TodoList/>
      </Container>

    </Stack>
  )
}

export default App
