import { getTodos } from "@/modules/fetch/todo";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CryptoJS from 'crypto-js';

const ShowTaskIncomplete = () => {

  const [todos, setTodos] = useState([]);
  console.log(todos[0]);
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

  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    status: '',
    priority: '',
    duedate: '',
    duetime: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleEdit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const token = localStorage.getItem('token'); 
      const encryptedId = localStorage.getItem('user_id');
      const storedUserId = CryptoJS.AES.decrypt(encryptedId, 'secret_key').toString(CryptoJS.enc.Utf8);
      const id = formData.id
      console.log(id);
      // console.log('Decrypted ID:', storedUserId);
      // Ambil token dari local storage
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await fetch(`http://localhost:4000/api/v1/users/${storedUserId}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Sertakan token dalam header Authorization
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Task added successfully!');
        setShowPopup(false); // Tambahkan logika untuk memuat ulang daftar tugas atau melakukan tindakan lain yang diperlukan
        setFormData({
        id: null,
        title: '',
        description: '',
        status: '',
        priority: '',
        duedate: '',
        duetime: '',
      });
      window.location.reload(); // Refresh halaman jika penambahan task berhasil
      } else {
        throw new Error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const token = localStorage.getItem('token'); 
      const encryptedId = localStorage.getItem('user_id');
      const storedUserId = CryptoJS.AES.decrypt(encryptedId, 'secret_key').toString(CryptoJS.enc.Utf8);
      const id = formData.id
      console.log(id);
      // console.log('Decrypted ID:', storedUserId);
      // Ambil token dari local storage
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await fetch(`http://localhost:4000/api/v1/users/${storedUserId}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Sertakan token dalam header Authorization
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Task added successfully!');
        setShowPopup(false); // Tambahkan logika untuk memuat ulang daftar tugas atau melakukan tindakan lain yang diperlukan
        setFormData({
        id: null,
        title: '',
        description: '',
        status: '',
        priority: '',
        duedate: '',
        duetime: '',
      });
      window.location.reload(); // Refresh halaman jika penambahan task berhasil
      } else {
        throw new Error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error.message);
    }
  };

  return (
    <section className="showTask">
        <p className="head">
          <span>
              <span className="title">Task Incomplete</span>
          </span>
        
        </p>
        <ul> 
          {todos.map((todos) => (
            <li className={todos.status == 'done' ? "hidden" : "card"} key={todos.id}>
                <p>
                  <span className="hidden">{todos.id}</span>
                  <span className="title">{todos.title}</span>
                  <span className="name">{todos.description}</span>
                  <span className={`${todos.priority === 'high' ? 'high' : todos.priority === 'medium'? 'medium2' : 'low'}`}>Priority : {todos.priority}</span>
                  <span className="time">{todos.duedate} Pukul {todos.duetime}</span>
                  <span className="time"></span>
                </p>
                <i className="bi bi-check2-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                  </svg>
                </i>
                <i className="bi bi-pencil-square" onClick={() => {
                    setFormData({
                        id: todos.id,
                        title: todos.title,
                        description: todos.description,
                        status: todos.status,
                        priority: todos.priority,
                        duedate: todos.duedate,
                        duetime: todos.duetime,
                    });
                    setShowPopup(true);
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg>
                </i>
                <i className="bi bi-trash" onClick={() => {
                    setFormData({
                        id: todos.id,
                        title: todos.title,
                        description: todos.description,
                        status: todos.status,
                        priority: todos.priority,
                        duedate: todos.duedate,
                        duetime: todos.duetime,
                    });
                    handleDelete();
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                  </svg>
                </i> 
            </li>
          ))}
              
            
        </ul>

        {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
            
            

            <form class="max-w-md mx-auto" onSubmit={handleEdit}>
              <div>{formData.id}</div>
              <div class="relative z-0 w-full mb-5 group">
                  <input type="title" name="title" value={formData.title} onChange={handleInputChange} id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label for="title" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder=" " className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                <label for="title" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Decription</label>

              </div>
              <div class="grid md:grid-cols-2 md:gap-6">
                <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                  <option value="">Select Status</option>
                  <option value="todo">ToDo</option>
                  <option value="done">Done</option>
                </select>
                <label for="priority" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Priority</label>
                <select name="priority" value={formData.priority} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                  <input type="date" name="duedate" value={formData.duedate} onChange={handleInputChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  required />
                  <label for="date" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date</label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <input type="time" name="duetime" value={formData.duetime} onChange={handleInputChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  required />
                  <label for="time" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Time</label>
                </div>
              </div>
              <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

          </div>
        </div>
      )}
    </section>
  )
}

export default ShowTaskIncomplete;