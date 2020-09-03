// 모듈선언
const request = require('request-promise');
const cheerio = require('cheerio');
module.exports.naver = async ( data ) => {
    try{

        //대한통운의 현재 배송위치 크롤링 주소
        const url = `https://search.naver.com/search.naver?where=image&sm=tab_jum&query=${encodeURI(data)}`;
        let result = []; //최종 보내는 데이터
        
        const html = await request(url);
        const $ = cheerio.load( html, { decodeEntities: false } //한글 변환
        );

		const imgElements = $('.photo_grid').find('._img');
		
		return imgElements[0].attribs['data-source'];
    }catch(e){
        console.log(e)
    }    
}

module.exports.google = async ( data ) => {
    try{

        //대한통운의 현재 배송위치 크롤링 주소
        const url = `https://www.google.com/search?q=${encodeURI(data)}&source=lnms&tbm=isch&sa=X`;
        let result = []; //최종 보내는 데이터
        
        const html = await request(url);
        const $ = cheerio.load( html, { decodeEntities: false } //한글 변환
        );
console.log( html);
		const imgElements = $('.islrc').find('.rg_i');
	//console.log(imgElements);
		return imgElements[0].attribs['data-source'];
    }catch(e){
        console.log(e)
    }    
}