import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bodyParser from "body-parser"
// import  {Book}  from "./models/bookModel.js";
import Book from './models/bookModel.js';


const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Middleware for parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to MERN Stack Tutorial");
});

app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const data = new Book(newBook)
await data.save()
    // const book = await Book.insertOne(newBook);

    return response.status(201).send(data);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Update a Book
app.put('/books/:id', async(request, response) => {
    try{
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
          ) {
            return response.status(400).send({
              message: "Send all required fields: title, author, publishYear",
            });
          }

          const { id } = request.params;

          const result = await Book.findByIdAndUpdate(id, request.body);

          if(!result){
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return response.status(400).json({ message: 'Invalid ObjectId' });
              }

            return response.status(404).json({ message: 'Book not found'});
          }

          return response.status(200).send({ message: 'Book Updated Successfully' });
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

// Route for Get All Books frm database
app.get('/books', async ( request, response) => {
    try{
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
    });
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get All Books frm database by id
app.get('/books/:id', async ( request, response) => {
    try{

        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});



mongoose.connect('mongodb://127.0.0.1:27017/book_store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.listen(PORT, () => {
  console.log('Server is listening....');
});
