<h1>🗨️ Real-Time Chat App</h1>

<p>
A Simple Real-time chat application built using <b>React</b>, <b>Node.js</b>, <b>Express</b>, 
<b>MongoDB Atlas</b>, <b>Socket.IO</b>, and <b>Google Authentication</b>.
</p>

<p>This app supports Real-time Messaging, Google Login, and has clean UI. Fully deployed using Render/Vercel.</p>

<hr />

<h2>🔗 Live Demo</h2>
<p>
  <a href="https://real-time-chat-application-cyan-gamma.vercel.app" target="_blank">
    👉 Click here to view the live app
  </a>
</p>

<hr />

<h2>✅ Features</h2>

<ul>
  <li>🔐 Google Login Authentication</li>
  <li>💬 Real-time Chat Messaging (Socket.IO)</li>
  <li>👤 User Sessions + Cookies</li>
  <li>📡 REST API (Express)</li>
  <li>🗄️ MongoDB Atlas Integration</li>
  <li>🎨 Simple Clean UI</li>
  <li>🚀 Fully Deployed (Frontend + Backend)</li>
</ul>

<hr />

<h2>🔧 Tech Stack</h2>

<h3>Frontend</h3>
<ul>
  <li>React</li>
  <li>Axios</li>
  <li>Tailwind CSS</li>
  <li>React Router</li>
  <li>Context API</li>
</ul>

<h3>Backend</h3>
<ul>
  <li>Node.js</li>
  <li>Express</li>
  <li>Socket.IO</li>
  <li>Passport Google OAuth</li>
  <li>MongoDB Atlas</li>
</ul>

<hr />

<h2>🚀 Installation</h2>

<h3>🔹Backend Setup</h3>

<pre><code>
cd backend
npm install
npm start
</code></pre>

<p>Create a <code>.env</code> file in backend:</p>

<pre><code>
PORT=4000
MONGO_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
GOOGLE_CALLBACK_URL='http://localhost:4000/users/auth/google/callback'
SESSION_SECRET=your_secret
JWT_SECRET=your_jwt_secret
</code></pre>

<hr />

<h3>🔹Frontend Setup</h3>

<pre><code>
cd frontend
npm install
npm run dev
</code></pre>

<p>Create a <code>.env</code> file in frontend:</p>

<pre><code>
VITE_BASE_URL=http://localhost:4000
</code>
</pre>

<hr />

<h2>▶️ Deployment Notes</h2>

<ul>
  <li>Backend deployed on <b>Render</b></li>
  <li>Frontend deployed on <b>Vercel</b></li>
</ul>

<hr />

<h2>✅ Working Status</h2>

<ul>
  <li>Google Login ✅</li>
  <li>Socket real-time messaging ✅</li>
  <li>MongoDB Atlas connection ✅</li>
  <li>Deployment successful ✅</li>
</ul>

<hr />

<h2>📜 License</h2>

<p>This project is for learning and practice purposes.</p>
