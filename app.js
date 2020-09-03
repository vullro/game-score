const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const db = require('./models');


class App {
  constructor(){
    // express 초기화
    this.app = express();
    // db연결
    this.dbConnection();
    // viewEngine 세팅
    this.setViewEngine();
    // middleware 세팅
    this.setMiddleWare();
    // 로케일 세팅
    this.setLocales();

    // 정적 디렉토리 추가
    this.setStatic();    


    // 라우팅
    this.getRoute();
  }
  
  // async await 방식
  async dbConnection(){
    try{
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await db.sequelize.drop();
    console.log('DB Sync complete.');
    await db.sequelize.sync();
    }catch(err){
      console.error('Unable to connect to the database:', err);
    }
  }

  setViewEngine(){
    nunjucks.configure('views/nunjucks', {
      autoescape: true,
      express: this.app
    });
  }

  setMiddleWare(){
    this.app.use(morgan('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));    
  }

  setLocales(){
    this.app.use((req, res, next)=>{
      this.app.locals.req_path = req.path;
      next();
    });
  }

  setStatic (){
    this.app.use('/static', express.static('static'));
  }  

  getRoute(){
    this.app.get('/', ( _ , res )=>{
      res.render('index.html');
    });
    this.app.use(require('./controllers'));
  }
}

module.exports = new App().app;
