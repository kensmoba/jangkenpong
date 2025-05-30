🖐️ Jangkenpong: Multiplayer Rock-Paper-Scissors ✂️
Experience the classic game with a modern, multiplayer twist!

📝 Description
Jangkenpong is a multiplayer rock-paper-scissors game that brings the classic hand game to life with a stunning gradient-based UI, smooth animations, and real-time gameplay. Powered by Colyseus, players can create or join rooms to compete against others, with scores updating dynamically and immersive sound effects enhancing the experience.

🛠️ Technologies Used
HTML
CSS
JavaScript
Tailwind CSS
GSAP
Colyseus
Typescript  

✨ Features

Multiplayer Gameplay: Create or join rooms to play rock-paper-scissors against opponents in real time.  
Dynamic Animations: Enjoy smooth transitions and effects with GSAP, including scaling cards and animated score updates.  
Gradient Styling: A visually appealing UI with gradient backgrounds (from gray to indigo to purple) and interactive buttons.  
Sound Effects: Toggleable audio for button clicks, wins, losses, and ties, with adjustable volume settings.  
Responsive Design: Optimized for both mobile and desktop with Tailwind CSS responsive classes.


🚀 Setup Instructions
Get Jangkenpong running locally with both server and client:  

Clone the repository:  git clone https://github.com/kensmoba/jangkenpong.git


Navigate to the project directory:  cd jangkenpong


Install dependencies:  npm install


Start the server:  
Navigate to the server directory (if separate):  cd server


Run the server on port 2567:  node index.js


The server will be accessible at ws://localhost:2567.


Start the client:  
Navigate back to the root directory (if needed):  cd ..


Run the development server on port 5173:  npm run dev


Open your browser and visit http://127.0.0.1:5173 to play!



Note: Ensure both server and client are running in separate terminal windows. The client connects to the server at ws://localhost:2567 for multiplayer functionality.

🤖 AI Support Explanation
Jangkenpong does not use AI for gameplay mechanics. The computer's moves in single-player mode (if implemented) would rely on a random selection algorithm. The multiplayer aspect is powered by Colyseus, which handles real-time communication between players, while the UI and animations are enhanced with Tailwind CSS and GSAP.

🎮 Ready to play? Challenge a friend in Jangkenpong!⭐ Don’t forget to give it a star on GitHub!
