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
A user can create, read, update and delete his/her own books. He/she has access to all of his/her own books with all the data stored on the book object in the books collection. This includes all the past and currently open requests.
  </p>
  <p>
Apart from that the user can browse all books in the database, that he/she doesn't own, for these books he/she is only accessing the book info, but no sensible data about e.g. the books' owner or any requests the user didn't participate in. If a user is interested in borrowing a certain book from another user a borrowing request can be send. If the book owner accepts this request he thereby acknowledges the borrower to receive access to his/her user info. In the process of borrowing and lending a request passes through different states, which are aknowledegd by the appropriate user. The potential borrower (B) creates the borrowing request and sets the bookLocation of the request to home. The book owner (lender L) can now decide to either decline or accept the request and will set the request to declined or transferLtoB. Once the book reaches B he will set the book to atB. By sending messages back and forth in any state the B can e.g. ask for a prolonged reading time, thus the L can adjust the due date. Either B or L can set the request to transferBtoL. When the book made it backHome the L will click, that the book returned home.  
  </p>
  <b>Further Features:</b>
  <p>
    Not yet implemented in the prototype on the main branch are the following features, that already work on the BE and can be tried out using Postman (or similar programs):
    </p>
  <p>
    The FE prototype deletes a borrowingrequest when the owner clicks, that the book returned home. The BE can do a little more here. The book can be set to a state called backHome which closes the borrowing request and stores it on the book, so it is then accessible by the book owner in the books request history and by the borrower on his borrowingRequestLog. Furthermore books can be added to the users watchlist and a list, that contains all books, the user already read/knows. 
    </p>
  <p>
    Furthermore books can be added to the users watchlist and a list, that contains all books, the user already read/knows. Aditionally the CRUD routes for user reviews of books exist.
        </p>
  <p>   
    All these functionalities can be found in the branch watchlistAndSimilarLists.
     </p>
      <p>
    The branch initialsetup includes the intial ejs protoype which was remodeled to the MERN prototype on main.
     </p>
     <h3> Team members - Web Development</h3>
<p> Esther Rauschert (backend) and Alexander (frontend)</p>
  <p>Mentor: Larry</p>
</section>

<section>
  <h1>Data Science</h1>
  <h3> Team members - Data Science</h3>
<p> Lena (part time contribution) and Nitin </p>
</section>

<section>
  <h1>User Experience</h1>
  <p>
 <a href="https://miro.com/app/board/uXjVMuxkwMY=/" target="_blank"> <b>UserFlow in Miro</b> </a>
  </p>
  <p>
 <a href="https://www.figma.com/file/aV0JFXdP7nezT5nc2NIfQ9/wireframe-web-app?type=design&node-id=0%3A1&mode=design&t=MWjyNCowByrmIhpU-1" target="_blank"> <b>Figma</b> </a>
  </p>
  <h3> Team members - User Experience</h3>
<p> Jennipher M. Kasemire and Albert Kweku Bening</p>
  <p>Mentor: Vincent</p>
</section>

<section>
  <h1>Deep Learning</h1>
</section>

<h3> Team members - Deep Learning </h3>
<p> Jayashree </p>

