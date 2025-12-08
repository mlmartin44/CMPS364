How to Run the Blog Application 

Follow these steps to clone the repository, install dependencies, and start the blog application.

1️ Clone the GitHub Repository

In a terminal, run:

git clone https://github.com/YourUsername/YourRepoName.git


Then move into the project folder:

cd YourRepoName/my-blog

2️ Install Required Dependencies

Run the following command to install all project packages:

npm install


This installs:

Express

Mongoose

Body-Parser

EJS

Dotenv

3️ Set Up the Environment File

Inside the project root, create a file named .env with the following content:

MONGO_URI="mongodb://127.0.0.1:27017/my_blog"
PORT=3000


If using MongoDB Atlas, replace the URI with your personal connection string.

4️ Start the Node Server

Run:

node app.js


If everything is working correctly, you will see:

Connected to MongoDB
Server running on http://localhost:3000

5️ Open the Blog in a Web Browser

Go to:

http://localhost:3000/

From here, you can:

View all existing blog posts

Create a new post (Title, Author, Content)

Open an individual post

Delete a post

See all updates reflected live from MongoDB
