const express = require('express');
const morgan = require('morgan');
const app = express();
const methodOverride = require('method-override');
const models = require('./models')
//console.log(db);

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname +'public'));

app.use(methodOverride('X-HTTP-Method-Override'));

models.db.authenticate().then( () => {
    console.log('connected to the database, you\'re welcome.');
})


app.get('/', (req, res) => {
    try{
        res.send('hello World');
    }
    catch{
        res.send(err);
    }
});

const init = async () => {
    await models.db.sync({ force: true });
};

const PORT = 1337;

app.listen(PORT, () => {
    console.log(`app listinening on: ${PORT}`)
});

init();