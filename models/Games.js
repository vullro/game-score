const moment = require('moment');


// 게임 모델
// 게임명(name), 게임방식(type), 게임설명(description)
module.exports = function(sequelize, DataTypes){
    const Games = sequelize.define('Games',
        {
            name : { type: DataTypes.STRING, primaryKey: true },
            type : { type: DataTypes.STRING},
            description : { type: DataTypes.TEXT },
			imgUrl : {type: DataTypes.STRING},
        }
    );

    Games.prototype.dateFormat = (data) => {
		console.log(data);
		today = moment().format("YYYY-MM-DD");
		target = moment(data).format("YYYY-MM-DD");
		if ( today === target ){
			target = moment(data, "YYYYMMDD").fromNow();
		}
		return target;
    };

    return Games;
}


