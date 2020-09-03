
exports.get_billiard = ( _ , res) => {
    res.render( 'game/billiard.html');
}

exports.get_billiard_write = ( _ , res) => {
    res.render( 'game/write.html');
}

exports.post_billiard_write = ( req , res ) => {
    res.send(req.body);
}
