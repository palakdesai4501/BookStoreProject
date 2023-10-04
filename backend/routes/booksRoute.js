// Route For Save a New Book
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
  
  // Route for delete a book
  app.delete('/books/:id', async (request, response) => {
      try{
          const { id } = request.params;
  
          const result = await Book.findByIdAndDelete(id);
  
          if(!result){
  
            return response.status(404).json({ message: 'Book not found'});
          }
  
          return response.status(200).send({ message: 'Book Deleted Successfully' });
      }catch(error){
          console.log(error.message);
          response.status(500).send({ message: error.message })
      }
  });