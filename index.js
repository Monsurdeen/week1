const joi = require('joi');
const express = require('express');
const app = express();


app.use(express.json()); 

const items = [
    {id: 1, name: 'monsur'},
    {id: 2, name: 'monsur'}
];


app.get('/', (req, res) => {
    res.send('hello world');
});


app.get('/api/item', (req, res) => {
    res.send([1, 2, 3]);
});

app.get('/api/item/:id', (req, res) => {
    const item = items.find(c => c.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).send('The item with the given ID was not found.');
    }
    res.send(item);
});


app.post('/api/item', (req, res) => {
    const {error} = validateItem(req.body);
    if (error)  return  res.status(400).send(error.details[0].message);
        
    
  
    const item = {
        id: items.length + 1,
        name: req.body.name 
    };

    items.push(item); 
    res.status(201).send(item);  
});


app.put('/api/item/:id', (req, res) => {
    const item = items.find(c => c.id === parseInt(req.params.id));
    if (!item)  return res.status(404).send('The item with the given ID was not found.');
    

    const {error} = validateItem(req.body);
    if (error) 
        return  res.status(400).send(error.details[0].message);
        

    item.name = req.body.name;
    res.send(item);
});


function validateItem(item) {
    const schema = {
        name: joi.string().min(3).required()
    };
    return joi.validate(item, schema);
}


app.delete('/api/item/:id' , (req ,res) => {
    const item = items.find(c => c.id === parseInt(req.params.id));
    if (!item)  return res.status(404).send('The item with the given ID was not found.');
    

    const index = items.indexOf(item);
    items.splice(index, 1);

    res.send(item);
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


