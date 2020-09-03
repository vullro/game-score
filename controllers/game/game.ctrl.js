const models = require('../../models');
const util = require('../../util');

// 게임을 조회한다.
exports.get_games = async ( _ , res) => {
	try{
		let games = await models.Games.findAll({

		});

		res.render( 'game/games.html', {games});
	}catch( err ){
		console.error(err);
	}
};

// 게임 작성하기 화면을 연다.
exports.get_games_write = ( _ , res) => {
    res.render( 'game/write.html');
};

// 게임을 저장한다.
exports.post_games_write = async ( req , res ) => {
  try{
    await models.Games.create({
        name : req.body.name,
        type : req.body.type,
        description : req.body.description,
		imgUrl : await util.scrap.naver(req.body.name),
    });
    res.redirect('/game');
  }catch( err ){
    console.error(err);
  }
};

// 게임상세보기를 조회한다.
exports.get_games_detail = async ( req, res ) => {
  try{
    //req.params.name
    const game = await models.Games.findByPk(req.params.name);

    res.render( 'game/detail.html', {game});
  }catch( err ){
    console.error(err);
  }
};

// 게임수정화면을 연다.
exports.get_games_edit = async ( req, res ) => {
  try{
    const game = await models.Games.findByPk(req.params.name);
    res.render( 'game/write.html', {game, isEdit: true});
  }catch( err ){
    console.error(err);
  }
};

// 게임수정한다.
exports.post_games_edit = async ( req, res ) => {
  try{
    const game = await models.Games.update(
		{
			name : req.body.name,
			type : req.body.type,
			description : req.body.description
		},
		{
			where : {
				name : req.params.name
			}
		}
	);
    res.redirect('/game/detail/' + req.body.name);
  }catch( err ){
    console.error(err);
	res.send('data err');
  }
};
