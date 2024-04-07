import { getTodos } from "@/modules/fetch/todo";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CryptoJS from 'crypto-js';

const ShowTaskComplete = () => {

  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (typeof window !== "undefined") {
          const encryptedId = localStorage.getItem('user_id');
          const storedUserId = CryptoJS.AES.decrypt(encryptedId, 'secret_key').toString(CryptoJS.enc.Utf8);
          console.log('Decrypted ID:', storedUserId);
          if (storedUserId) {
            const response = await getTodos(storedUserId);
            console.log(response.status);
            if (response.status == "error") {
              setTodos([]);
            } else {
              console.log(response.data.data);
              setTodos(response.data.data);
            }
          }
        }
      } catch (e) {
        //console.log(e);
      }
    };
    fetchProducts();
  }, []);
  
  return (
    <section className="showTask">
        <p className="head">
          <span>
              <span className="title">Task Complete</span>
              {/* <span className="count">{taskList.length}</span> */}
          </span>
          {/* <span className="clearAll" onClick={() => setTaskList([taskList.map(task2 => task2.completed = true)])}>Clear All</span> */}
        </p>
        <ul>
          {todos.map((todos) => (
              <li className={todos.status == 'todo' ? "hidden" : "card"} key={todos.id}>
                <p>
                  <span className="title">{todos.title}</span>
                  <span className="name">{todos.description}</span>
                  <span className={`${todos.priority === 'high' ? 'high' : todos.priority === 'medium'? 'medium2' : 'low'}`}>Priority : {todos.priority}</span>
                  <span className="time">{todos.duedate} Pukul {todos.duetime}</span>
                  <span className="time"></span>

                </p>
                <i className="bi bi-x-circle-fill">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                  </svg>
                </i>
                <i className="bi bi-trash">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                  </svg>
                </i> 
              </li>
          ))}
        </ul>
    </section>
  )
}

export default ShowTaskComplete;
