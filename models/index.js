var Sequelize = require('sequelize');
var path = require('path');
var fs = require('fs');
var dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize({
  dialect : 'sqlite',
  storage : 'database.sqlite',
  freezeTableName : true 
});

let db = [];

fs.readdirSync(__dirname)
    .filter(file => {
        return file.indexOf('.js')&& file !== 'index.js'
    })
    .forEach(file => {
        // var model = sequelize.import(path.join(__dirname, file));
        // 위의 코드가 안되서 아래로 대체
        var model = require(path.join(__dirname, file))(sequelize, Sequelize);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if("associate" in db[modelName]){
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;



/*
async function loadSequelize(){
  try{
    await sequelize.authenticate();
    console.log('Connection has been established successfully');
    await sequelize.sync({force: true});
    console.log("All models were synchronized successfully.");

  }catch( error ){
    console.error('Unable to connect to the database : ', error);
  }finally{
    sequelize.close();
  }
}

loadSequelize();
*/