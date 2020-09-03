const { Router } = require('express');
const router = Router();
const billiard_ctrl = require('./billiard.ctrl');
const game_ctrl = require('./game.ctrl');

// 게임 입력
router.get ('/', game_ctrl.get_games);
router.get ('/write', game_ctrl.get_games_write);
router.post('/write', game_ctrl.post_games_write);
router.get ('/detail/:name', game_ctrl.get_games_detail);
router.get ('/edit/:name', game_ctrl.get_games_edit);
router.post('/edit/:name', game_ctrl.post_games_edit);


// 당구(?)
router.get('/billiard', billiard_ctrl.get_billiard);
router.get('/billiard/write', billiard_ctrl.get_billiard_write);
router.post('/billiard/write', billiard_ctrl.post_billiard_write);

module.exports = router ;
