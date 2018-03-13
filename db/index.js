const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.database_url || 'postgres://localhost/acme_routing')

const Employee = conn.define('employee', {
    name: {
        type: Sequelize.STRING
    }
})

Employee.belongsTo(Employee, {as: 'manager'})
Employee.hasMany(Employee), {as: 'manager', foreignKey: 'managerId'}

const syncAndSeed = ()=>{
    conn.sync({force:true})
    .then (()=> Promise.all([
        Employee.create({name: 'moe'}),
        Employee.create({name: 'larry'}),
        Employee.create({name: 'curly'})
    ]))
    .then(([larry,moe, curly]) => {
        return Promise.all([
            larry.setManager(moe),
            curly.setManager(moe)
        ])
    });
}

module.exports = {
    syncAndSeed,
    models: {
        Employee
    }
}