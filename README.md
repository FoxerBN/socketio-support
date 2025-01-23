# Socket.IO Chat Application

This project is a basic real-time chat application built using **Socket.IO** 🧩, **React** ⚛️, and **Express.js** 🚀. It showcases how to create and join chat rooms 🏠, with a maximum of two participants per room 👥. When a room is created 🛠️, an email with the room link is sent 📧 to the support email using **SendGrid** 📤. The chat supports multiple rooms simultaneously, and rooms are dynamically removed 🗑️ when users leave.

---

## Features ✨

1. **Real-Time Messaging** 🕒: Messages are sent and received instantly ⚡ using WebSocket technology.
2. **Room Creation and Joining** 🏗️:
   - Users can create chat rooms dynamically 🛠️.
   - Each room supports up to **2 participants** 👥.
3. **Email Notifications** ✉️: A room creation triggers an email 📧 with the room's link sent to the support email.
4. **Dynamic Room Management** 🔄:
   - Rooms are automatically removed 🗑️ when all participants leave.
   - Only two users can join a room 👥.
5. **Multiple Rooms Support** 🏠🏠: Multiple chat rooms can exist simultaneously 🌍.

---

## Technologies Used 🛠️

### Frontend 🎨

- **React** ⚛️: For building the user interface.
- **Socket.IO-client** 🧩: For real-time communication.

### Backend 🛠️

- **Node.js** 🟩: Server-side JavaScript runtime.
- **Express.js** 🚀: Web framework for the backend.
- **Socket.IO** 🧩: For WebSocket-based real-time communication.
- **SendGrid** 📤: For sending emails.
- **dotenv** 🗂️: For managing environment variables.
- **cors** 🌐: For handling Cross-Origin Resource Sharing.

---

## Setup Instructions 🛠️

### Prerequisites 📋

Ensure you have the following installed on your machine 💻:

- Node.js 🟩
- npm or yarn 📦

### Steps 🧭

1. **Clone the Repository** 📂:

   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. **Install Dependencies** 📦:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables** 🔑:

   - Create a `.env` file in the `src/backend` directory 🗂️.
   - Add the following variables:
     ```env
     API_SENDGRID=<Your_SendGrid_API_Key>
     ```

4. **Run the Backend** ⚙️:

   ```bash
   cd src/backend
   node server.js
   ```

5. **Run the Frontend** ⚛️:

   ```bash
   npm run dev
   ```

6. **Access the Application** 🌐:
   Open `http://localhost:5173` in your browser 🖥️.

---

## How It Works 💡

### Room Creation 🏗️

1. A user clicks the **"Create Room"** button 🖱️.
2. The backend generates a unique `roomId` 🔢.
3. An email with the room link is sent to the support email 📧 via **SendGrid**.
4. The room is initialized with the user as its first participant 👤.

### Joining a Room 🔗

1. The second user joins the room using the link provided 🖱️.
2. The room becomes active and ready for chat 📢.

### Messaging 💬

- Messages are sent and received in real-time ⚡.
- The `isCreator` flag is used to differentiate between the room creator 🛠️ and the other participant 👥.

### Room Removal 🗑️

- When a user disconnects ❌, the backend removes their reference from the room.
- If both users leave, the room is deleted 🗑️.

---

## File Structure 🗂️

### Frontend 🎨

- **components**:
  - `Chat.jsx` 🗨️: Main chat logic.
  - `ChatHeader.jsx` 🖼️: Displays the chat header and room info.
  - `ChatMessages.jsx` 💬: Renders the chat messages.
  - `ChatInput.jsx` ⌨️: Handles user input for messages.
  - `ChatStatus.jsx` 🔄: Displays room connection/loading state.

### Backend 🛠️

- **server.js**: Main backend server file ⚙️.
- **socketioHandlers/chatHandler.js** 🧩: Handles all Socket.IO events.
- **utils/randNumb.js** 🔢: Utility for generating unique room IDs.

---

## Socket.IO Events 🔌

### Server-Side 🖥️

- **`createRoom`** 🏗️:
  - Generates a unique room ID 🔢 and emits `roomCreated` 🛠️.
  - Sends an email with the room link 📧.
- **`joinRoom`** 🔗:
  - Adds a user to an existing room 👥.
  - Emits `roomReady` when the room is full ✅.
- **`message`** 💬:
  - Broadcasts a message to all participants in the room 🗨️.
- **`disconnect`** ❌:
  - Removes the user from the room 🗑️.
  - Deletes the room if no participants remain 🗑️.

### Client-Side 🖱️

- **`recieveMessage`** 💬:
  - Listens for incoming messages 📨.
- **`roomReady`** ✅:
  - Triggers when both participants are present in the room 👥.
- **`roomNotReady`** ⚠️:
  - Triggers when one participant disconnects ❌.
- **`roomCreated`** 🛠️:
  - Notifies the room creator of the room ID 🔢.

---

## Future Improvements 🚀

1. Add authentication 🔒 to prevent unauthorized users from joining rooms.
2. Enhance the UI 🎨 with animations and improved accessibility.
3. Add support for storing chat history 🗂️ using a database 🛢️.
4. Enable file sharing 📂 in chat.

##
---

