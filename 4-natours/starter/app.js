const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

/////////////////////////////////////
//routing get requests using express.

// console.log(app);
// console.log(express);

// const port = 3000;
//  app.listen(port, () => {
//   console.log('port is on');
  
//  });

//  app.get('/', (req, res) =>{
//   res
//   .status(200)
//   .json({message: 'Hello from main'});

// });
//  app.get('/about', (req, res) =>{
//   res.send('hello to about');
// });
//  app.get('/exir', (req, res) =>{
//   res.send('hello to exit');
// });
// app.post('/', (req, res)=>{
//   res.send('you can post here')
//   .status(200);
// });
// app.use((req, res) => {
//   res.status(404).send('404 not found')
// });

////////////////////////////////////
//building the natours api using REST

const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`));

//sending json data to the client
//upon request.

app.get('/api/v1/tours', (req, res) => {
  res
  .status(200)
  .json({
    status: 'success',
    data: {
      tours: tours
    }
  })
});

//accepting json data from the client
//and writing it to the file upon client
//request

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({id: newId}, req.body);
  tours.push(newTour);
  fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours), err => {
    res
    .status(201)
    .json({
        status: 'success',
        data: {
            tour: newTour 
        }
    })
  });
});

/////////////////////////////////////
//handling url params

app.get('/api/v1/tours/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    const tour = tours.find(function (el){
        
        if(el.id == id){
            // console.log(el.id);
            return true;
        }
    });
    if(!tour){
        res
        .status(404)
        .json({
            status: '404 not found',
            data: {
                tour
            }
        });
    }
    else{
    res
    .status(200)
    .json({
        status: 'success',
        data: {
            tour
        }
    });
    }
    
});
/////////////////////////////////////
//handling patch requests

app.patch('/api/v1/tours/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const tour = tours.find(function (el){
        
        if(el.id == id){
            // console.log(el.id);
            return true;
        }
    }); 
    //not implemented yet
    //incomplete......

});

/////////////////////////////////////
//listening on localhost
const port = 3000;
app.listen(port, (req, res) =>{
  console.log('listening on port: ' + port);
});
