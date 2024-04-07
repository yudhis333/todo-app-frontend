import { useEffect, useState } from "react";
import { getUser } from "@/modules/fetch/user";
import CryptoJS from 'crypto-js';

const AddTask = () => {

  const [user, setuser] = useState();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (typeof window !== "undefined") {
          const encryptedId = localStorage.getItem('user_id');
          const storedUserId = CryptoJS.AES.decrypt(encryptedId, 'secret_key').toString(CryptoJS.enc.Utf8);
          console.log('Decrypted ID:', storedUserId);
          if (storedUserId) {
            const response = await getUser(storedUserId);
            console.log(response.status);
            if (response.status == "error") {
              setuser(null);
            } else {
              console.log(response.data.data);
              setuser(response.data.data);
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();
  }, []);

const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    console.log(formData);
    try {
      const token = localStorage.getItem('token'); 
      const encryptedId = localStorage.getItem('user_id');
      const storedUserId = CryptoJS.AES.decrypt(encryptedId, 'secret_key').toString(CryptoJS.enc.Utf8);
      console.log('Decrypted ID:', storedUserId);
      // Ambil token dari local storage
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await fetch(`http://localhost:4000/api/v1/users/${storedUserId}/todos`, {
        method: 'POST',
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
    <section className="addTask">
      <div className="add">
        <h1 style={{ fontFamily: 'Arial', fontSize: '18px',  }}>HI, {user?.name}. Tambahkan data list baru</h1>
        <button className="button" onClick={() => setShowPopup(true)} style={{ fontFamily: 'Arial', fontSize: '18px' }}>Add</button>

      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
            
            

            <form class="max-w-md mx-auto" onSubmit={handleSubmit}>
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
  );

}

export default AddTask;
