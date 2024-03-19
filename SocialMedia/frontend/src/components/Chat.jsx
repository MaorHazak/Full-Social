import React, { useEffect, useState } from "react";
import axios from "axios";
import { postRequest } from "../utils/postRequest";
import { NavLink } from "react-router-dom";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const getUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users/");
    if (res.data) {
      setUsers(res.data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // const handleUserClick = async (receiverId) => {
  //   try {
  //     // Check if a chat room exists between the current user and the clicked user
  //     const response = await axios.get(`http://localhost:5000/api/chats/${receiverId}`);

  //     if (response.data) {
  //       // Chat room exists, retrieve all messages
  //       const chatId = response.data._id;
  //       const messagesResponse = await axios.get(`http://localhost:5000/api/messages/${chatId}`);
  //       setChatMessages(messagesResponse.data);
  //     } else {
  //       // Chat room doesn't exist, create a new one
  //       const newChatResponse = await postRequest('/api/chats', { receiverId });
  //       const newChatId = newChatResponse.data._id;
  //       setChatMessages([]);
  //     }
  //   } catch (error) {
  //     console.error('Error handling user click:', error);
  //   }
  // };
  const user_data = localStorage.getItem('user_data') !== 'undefined' ? JSON.parse(localStorage.getItem('user_data')) : null;

  console.log(user_data)
  const handleUserClick = async (userId1, userId2) => {
    try {
      // Send a GET request to fetch the chat room between the two users
      const response = await axios.get(`http://localhost:5000/api/chats/${userId1}/${userId2}`);
      // Handle the response from the server
      if (response.data) {
        // If a chat room is found, display the messages in the chat component
        setChatMessages(response.data.messages);
      } else {
        // If no chat room is found, create a new one
        // You can implement this logic based on your requirement
        console.log('No chat room found. Creating a new one...');
      }
    } catch (error) {
      // Handle any errors that occur during the GET request
      console.error('Error fetching chat room:', error);
    }
  };

  const sendMessage = async () => {
    try {
      // Send message to the chat room
      // You need to implement the API endpoint to send a message
      // const response = await postRequest(`/api/messages/${chatId}`, { message });
      // Handle response as needed
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex flex-row justify-between h-800">
      <div className="flex flex-col gap-5 bg-gray-100">
      {users.map((user) => (
  <div className="flex flex-row gap-5 bg-gray-200" onClick={() => handleUserClick(user_data.id, user.id)}>
    <img
      src={user?.info?.imageUrl}
      className="w-8 h-8 rounded-full shadow:sm"
      alt="user"
    />
    {user?.info?.name}
  </div>
))}
      </div>
      <div className="flex flex-col justify-between w-full bg-gray-100 p-4">
        <div>
          <h2>Chat</h2>
          <div className="flex flex-col gap-3">
            {chatMessages.map((msg, index) => (
              <div key={index} className="flex flex-row">
                <strong>{msg.user}:</strong> {msg.message}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            className="p-2 border rounded w-full"
          />
          <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
