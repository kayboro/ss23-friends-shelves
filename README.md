# ss23-friends-shelves

<h2> What is Friends Shelves?</h2>
<p>A book-sharing web app where friends can easily share and borrow books from each other. </p>

<section>
<h1>Webdevelopment</h1>
<h2> How to run the prototype?</h2>
<p>The in this repo created prototype is a MERN WebApp. To run it from the console you need node installed and npm install all the necessary packages from the backend and from the frontend directory. 
To connect to the MongoAtlas Database you need to ask a team member for the content of the .env file. If you want to run it without the .env just on your local machine, you might use it with your local mongo store. To do so, change the mongo.connect in the backend/app.js and backend/seeds/index.js files accordingly. As a next step you need to run the app from the backend directory using "node app.js" and from the frontend directory using "npm run dev". Opening http://localhost:5173/ in your browser will then direct you to the login page. Using the shared MongoDB you might now register your own account and use the app. If you went with the local mongo DB, please create 3 users and extract their user._id's from the DB or the react developer tools, once logged in. To seed the database, replace the 3 user._ids called bookOwners at the bottom of backend/seeds/seedHelpers.js. Then run "node seeds/index.js" from the backend directory to seed the local database and restart the backend server. You should now have a fully functioning prototype to test.  </p>

<h2>What the prototype can do/ functionalities the code includes</h2>  
<b>Authentification:</b>
<p>
The App uses expression-session and passport to authenticate the user. 
</p>
<b>What a user can do:</b>
<p>
A user can access all of his/her own books with all the data that might be stored on the book object in the books collection. This includes all the past and currently open requests. The owner of the book can also edit and delete books from her own book shelf.
  </p>
  <p>
Apart from that the user can browse all books in the database, that he/she doesn't own, only accessing the book info, but no sensible data about e.g. the books' owner or any requests the user didn't participate in. If a user is interested in borrowing a certain book from another user a borrowing request can be sent. If the book owner accepts this request he thereby acknowledges the borrower to receive access to his/her user info. 
  </p>
  <p>
    Furthermore books can be added to the users watchlist and a list, that contains all books, the user already read/knows. (20231008 not yet implemented on the FE, but working on the BE - see branch watchlistAndSimilarFeatures)
</section>
<section>
  <h1>Data Science</h1>
</section>
<section>
  <h1>User Experience</h1>
</section>
<section>
  <h1>Deep Learning</h1>
</section>

<h3> Team members</h3>
<p> Web Development: Esther (backend) and Alexander (frontend)</p>
<p> Data Science: Lena (part time contribution) and Nitin </p>
<p> User Experience: Jennifer and Albert</p>
<p> Deep Learning: Jayashree </p>

