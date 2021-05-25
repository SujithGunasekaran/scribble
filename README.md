# scribble

Notes Taking app 📕


## Tech Stack 📋

  1. `react.js`
  2. `typescript`
  3. `mongodb`
  4. `express.js`

## How to run locally

### Server Setup

  1. run `npm install` command.   
  2. Create a .env file in root path
  3. Copy below code and paste it in .env
  
      <code>
        PORT = your port number
        MONGO_URI = your mongodb uri
        JWT_KEY = your JWT key
      </code>
  
  4. Run the following command `tsc -w` typescript watchMode server. 
  
  4. If you like to populate sample data in your mongodb, Please follow below step.
      
     * Edit sample data `/scribble_server/sampleData/index.ts`
     
     * run the following command `npm run populateSampleData` 
      
  5. Finally run `npm start` command to run server. 

### Client Setup

  1. In scribble_client folder run `npm install` command.
  2. Run `npm start` command to start client.


## App Info

<h3>Author</h3>

<h4>Sujith Gunasekaran</h3>

<h3>License</h3>

<h4>This project is licensed under the MIT License</h4>


