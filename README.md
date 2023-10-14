# ss23-friends-shelves

<h2> What is Friends Shelves?</h2>
<p>A book-sharing web app where friends can easily share and borrow books from each other. </p>
<b>The journey of the project can be followed in the <a href="https://docs.google.com/presentation/d/1EZPeXxqdA8jrfqqgfBLoJUVuynOpT45-4sRSK1vQk7A/edit#slide=id.g25fad21b0d1_1_0" target="_blank"> <b>presentation slides </b> </a>  for midterm and final presentation.</b>  


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
<p> <a href="https://www.linkedin.com/in/esther-rauschert-a4761128a/" target="_blank">Esther Rauschert</a> (backend) and Alexander (frontend)</p>
  <p>Mentor: <a href="https://www.linkedin.com/in/larrydalmeida/" target="_blank">Larry Almeida</a>
</section>

<section>
  <h1>Data Science</h1>
<p> Project Overview

- **Data Exploration and Cleaning:** In this phase, I analyzed the dataset to understand its structure, find missing data, and make necessary data preprocessing. The cleaned dataset forms the basis for the following steps.
- **Data Visualization:** I used various data visualization techniques to gain insights into the book data. This helps users and collaborators understand the data's characteristics and trends.
- **Linear Regression Model:** I implemented a linear regression model for predicting book ratings. This model allows users to estimate the ratings of books based on certain features or criteria, providing a valuable tool for book enthusiasts.
- **Collaborative Recommendation System (Work in Progress):** While the project includes a linear regression model, I am  actively working on implementing a collaborative recommendation system. This feature will provide users with book recommendations based on their preferences and behaviours, enhancing the app's usability.
-   <h3> Team members - Data Science</h3>
  Nitin Sain, Lena (part-time contribution) </p>
</section></p>

<section>
  <h1>User Experience</h1>
  <p>
 <a href="https://miro.com/app/board/uXjVMuxkwMY=/" target="_blank"> <b>UserFlow in Miro</b> </a>
  </p>
  <p>
 <a href="https://www.figma.com/file/aV0JFXdP7nezT5nc2NIfQ9/wireframe-web-app?type=design&node-id=0%3A1&mode=design&t=MWjyNCowByrmIhpU-1" target="_blank"> <b>Figma</b> </a>
  </p>
  <h3> Team members - User Experience</h3>
<p> <a href="https://www.linkedin.com/in/kasemire" target="_blank">/ Jennipher M. Kasemire</a> and <a href="https://www.linkedin.com/in/albert-kweku-bening-386b9a7a" target="_blank">/ Albert Kweku Bening</a></p>
  <p>Mentor: <a href="https://www.linkedin.com/in/oluwadamilare-vincent-akinyoyenu" target="_blank">Vincent Oluwadamilare Akinyoyenu</a></p>
</section>

<section>
  <h1>Deep Learning</h1>
</section>
<h3>Extracting Text from Image</h3>

Optical Character Recognition (OCR) software or online OCR tools to extract text from an image. Many free and paid OCR tools are available online that can help you to separate the text. In this project, Pytesseract is a Python wrapper used as a module for text extraction, an open-source Optical Character Recognition (OCR) engine that converts scanned images of text into machine-encoded text.

<h3>About the Project </h3>

Pytesseract enables the extraction of text from images, PDFs, or scanned documents by utilizing the OCR capabilities. It processes images and identifies the characters and words in the image, converting them into machine-readable text to perform further processes.


<h4>Prerequisites</h4>

You will need the following packages:
1. pandas
2. numpy
3. cv2
4. glob
5. bytes io
6. tqdm notebook

For Text Extraction:
1. pytesseract
2. pillow

few Installing can be done by

```
pip3 install numpy
pip3 install pillow
pip install opencv-python
```

## Simple Code Execution of the model 

You can see this in the below image when the user uploads the image from the local machine. The detector extracted text from the image Separately. Next, it takes the extracted text as input for further processing by performing a search and match task with the dataset; when it finds a matching text, it brings out all the corresponding data columns as final output.

## Step 1: Identifying the text and extracting

<img width="946" alt="image" src="https://github.com/TechLabs-Berlin/ss23-friends-shelves/assets/91853321/0245e146-1573-4770-b4ed-d85b369f306f">

## Step 2: Performing search, match

![image](https://github.com/TechLabs-Berlin/ss23-friends-shelves/assets/91853321/56403e29-be3a-4293-9971-93ca94d63646)


## Step 3: Execute result

![image](https://github.com/TechLabs-Berlin/ss23-friends-shelves/assets/91853321/abfe7784-ca2b-494c-8ac4-1cf809608f2b)


## Conclusion:

There are many methods to upload book covers, like uploading from our local device or directly pasting the URL from the web. Both ways, it will work with simple alterations in our code. Also, Many models are available, but I used Pytesseract as a text extractor despite its difficulties with low-quality images. I wanted to test with py-tesseract because the identifier must perform even if we write text on paper and upload it so that not just book covers but also thesis papers and journals our friends' shelves can have.

<h3> Team members - Deep Learning </h3>
<p> Jayashree Prabhakaran</p>
 <p>Mentor: Larry </p>
