import React,{useEffect} from 'react'
import { message, Table } from "antd";
import axios from '../http';
import TodoForm from '../components/TodoForm';

const Home = () => {
    const [showTodoForm, setShowTodoForm] = React.useState(false);
    const [todos, setTodos] = React.useState([]);
    const [selectedTodo, setSelectedTodo] = React.useState(null);

    const deleteTodo = async (id:any) => {
        try {
            const response = await axios.post("/api/todo/delete-todo", {
                id,
            });
            if(response.data.success){
                message.success(response.data.message);
                getTodos();
            }
            else{
                message.error(response.data.message);
            }
        }
        catch (error:unknown) {
            console.log(error);
        }
    }

    const columns = [
        {
          title: "Title",
          dataIndex: "title",
        },
        {
          title: "status",
          dataIndex: "status",
        },
        {
          title: "Action",
          dataIndex: "action",
          render: (action:any, record:any) => {
            return (
              <div className="d-flex flex-row gap-4">
                <i
                  className="ri-delete-bin-line "
                  onClick={() => {
                    deleteTodo(record._id);
                  }}
                ></i>
                <i
                  className="ri-pencil-line"
                  onClick={() => {
                    setSelectedTodo(record);
                    setShowTodoForm(true);
                  }}
                ></i>
              </div>
            );
          },
        },
      ];
    const getTodos = async () => {
        try {
            const response = await axios.post("/api/todo/getTodos");
            if(response.data.success){
                setTodos(response.data.data);
            }
            else{
                message.error(response.data.message)
            }
        }
        catch (error:unknown) {
            console.log(error)
        }
    }
    useEffect(() => {
        getTodos();
    }, [])
  return (
    <div>
    <div className="d-flex justify-content-between p-5">
      <button
        className="btn btn-primary"
        onClick={() => {
          setShowTodoForm(true);
        }}
      >
        Add Todo
      </button>
    </div>

    <Table
      columns={columns}
      dataSource={todos}
      pagination={{ pageSize: 5 }}
    />

    {showTodoForm && (
      <TodoForm
        showTodoForm={showTodoForm}
        setShowTodoForm={setShowTodoForm}
        type={selectedTodo ? "edit" : "add"}
        selectedTodo={selectedTodo}
        getData={getTodos}
        setSelectedTodo={setSelectedTodo}
      />
    )}
  </div>
  )
}

export default Home