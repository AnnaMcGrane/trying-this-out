const express = require('express')
const app = express();
const db = require('./db')
const {Employee} = db.models;
const path = require('path')


app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')))
app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use(require('body-parser').json())

app.get('/api/employees', (req, res, next)=>{
    Employee.findAll({
        include: [
            {
                model: Employee, 
                as: 'manager'
            }
        ]
    })
        .then(employees => res.send(employees))
        .catch(next)
})

app.post('/api/employees', (req, res, next) =>{
    const employee = (req.body)
    if (!employee.managerId){
        delete employee.maangerId
    }
    Employee.create(employee)
        .then (employee => {
            return Employee.findById(employee.id, {
                include: [
                    {model: Employee, as: 'manager'}
                ]
            })
        })
        .then (employee => res.send(employee))
        .catch(next)
})
//you need a body parser!!! that's why it didn't work before!!! :)

const port = process.env.PORT || 3000

app.listen(port, console.log(`listening on port ${port}`))

db.syncAndSeed();
