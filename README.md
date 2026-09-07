⚙️ Installation and Setup
1️⃣ Clone the Repository
git clone YOUR_GITHUB_REPOSITORY_URL
2️⃣ Navigate to the Project Directory
cd Wanderlust
3️⃣ Install Dependencies
npm install
4️⃣ Configure Environment Variables

Create a .env file in the root directory.

Example:

ATLASDB_URL=mongodb+srv://gaurav-kumar...
SESSION_SECRET=0d9c7a...
MAP_TOKEN=pk.eyJ1...

⚠️ Never upload your .env file to GitHub.

Make sure .env is included in your .gitignore.

5️⃣ Start the Application
node app.js

Or, if you use Nodemon:

nodemon app.js
6️⃣ Open the Application

Visit:

http://localhost:8080

The port may be different depending on your project configuration.

🔄 Application Workflow
User
  │
  ▼
Signup / Login
  │
  ▼
Explore Listings
  │
  ├──────────────► Search Destinations
  │
  ├──────────────► View Listing Details
  │
  └──────────────► View Location on Map
                         │
                         ▼
                    Add Review
                         │
                         ▼
                  Manage Listings
                  (Authorized Users)
                  
🔐 Authentication and Authorization

Wanderlust uses Passport.js for authentication.

The application provides:

User registration
Secure login
Session management
Logout functionality
Protected routes

Authorization ensures that:

Only logged-in users can create listings.
Only listing owners can edit or delete their listings.
Users can manage their own reviews.
📚 Key Concepts Implemented

This project helped in understanding and implementing:

Full-Stack Web Development
RESTful Routing
MVC Architecture
CRUD Operations
Authentication
Authorization
Session Management
MongoDB Database Integration
Mongoose ODM
Express Middleware
Error Handling
Server-Side Rendering using EJS
Interactive Maps
Form Validation
🎯 Future Improvements

Some features that can be added in the future:

🔍 Advanced search and filtering
📍 Location-based recommendations
🖼️ Image upload functionality using Cloudinary
❤️ Save favorite listings
👤 User profile pages
📱 Improved mobile responsiveness
💳 Online booking system
💬 Real-time messaging
📊 Admin dashboard
🧑‍💻 Learning Outcomes

Through this project, I gained hands-on experience with:

Building a complete full-stack web application
Designing RESTful APIs and routes
Connecting applications with MongoDB
Implementing authentication and authorization
Managing user sessions
Creating dynamic pages using EJS
Performing CRUD operations
Integrating interactive maps
Structuring applications using MVC architecture

👨‍💻 Author

Gaurav Kumar

B.Tech Information Technology Student

⭐ Show Your Support

If you found this project interesting, consider giving it a ⭐ on GitHub!

© 2026 Wanderlust

Built with ❤️ using Node.js, Express.js, MongoDB, and EJS.
