const { Sequelize} = require('sequelize');
const db = new Sequelize('users', 'root', '', {
    host: 'localhost',
    dialect:  'mysql'
})
//   }).authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })

 module.exports=db