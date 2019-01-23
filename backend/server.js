const express = require('express');
const app = express();
const bodyParser = require("body-parser");
let jobsJson = require('./jobs') 
const morganImport = require ('morgan');
let data = require('./jobs');

let users = [];
const fakeUser = {email: 'sm@test.fr', password: 'aze'};
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';
const jwt = require('jsonwebtoken');

let initialJobs = data.jobs;
let addedJobs = [];

const getAllJobs = () => {
    return [...addedJobs, ...initialJobs];
}

const checkUserYoken = (req, res, next) => {
    // Authorization: Bearer 
    if(!req.header('Authorization')) {
        return res.status(401).json({success: false, message: "header authentification manquant"});
    }else{
        let token = req.header('Authorization'); 
            // Express headers are auto converted to lowercase
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length).trimLeft();
            if (token) {      
                jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Token is not valid'
                    });
                } else {
                    req.decoded = decoded;
                    console.log('decoded = ' + JSON.stringify(decoded));
                    next();
                }
                });
            }else{
                return res.status(401).json({success: false, message: "header authentification manquant"});
            }
        }else{
            return res.status(401).json({success: false, message: "header authentification manquant"});  
        }
    }
};

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use(morganImport('dev'));

const api = express.Router();
const auth = express.Router();

auth.post('/login', (req,res) => {
    console.log(req.body);
    if(req.body){
        const email = req.body.email.toLowerCase().trim();;
        const password = req.body.password.toLowerCase().trim();;
        console.log(req.body)
        if(email === fakeUser.email && password === fakeUser.password){
            delete req.body.password;
            //res.json({success: true, data: req.body});
            const token = jwt.sign({iss: 'http://localhost:4201', role: 'admin', email: email}, secret );
            res.json({success: true, token: token});
        }else{
            res.json({success: false, message: 'identifiants incorrects'});
        }
    }else{
        res.json({success: false, message: 'données manquantes'});
    }
})
auth.post('/register', (req,res) => {
    console.log(req.body)
    if(req.body){
        const email = req.body.email.toLowerCase().trim();
        const pass = req.body.password.toLowerCase().trim();
        users = [{id: Date.now(), email : email, password: pass}, ...users]
        res.json({success: true, users})
    }else{
        res.json({success: false, users})
    }
    
})

api.get('/jobs', (req,res) => {
    //console.log(getAllJobs());
    res.json({ success: true, "data" : getAllJobs() });
})
.post('/jobs', checkUserYoken, (req, res) => {
    console.log(req.body);
    const job = req.body;
    //console.log(job);
    addedJobs = [job, ...addedJobs];
    console.log("total added jobs " + getAllJobs().length)
    res.json({ success: true, "data" : job });
})
.get('/jobs/:id', (req, res) => {
    const id = parseInt(req.params.id,10);
    const job = getAllJobs().filter((jobTemp) => jobTemp.id === id )
    console.log(job[0])
    if (job.length === 1 ){
        res.json({ success: true, "data" : job[0] });
    }else {
        res.json({ success: false, message: 'no job for id : '+ id });
    }
})
.get('/search/:term/:place?', (req, res) => {
    const term = req.params.term.toLowerCase().trim();
    let place = req.params.place;
    let jobs = getAllJobs().filter( j => (j.description.toLowerCase().includes(term)) || j.title.toLowerCase().includes(term));
    if (place) {
        place = place.toLowerCase().trim();
        jobs = jobs.filter(j => j.city.toLowerCase().includes(place));
    }
    res.json({success: true, jobs});
})


app.use('/api',api);
app.use('/auth',auth);

const port = 4201;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});