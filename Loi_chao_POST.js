const HTTP = require('http');
const URL = require('url');
const QUERYSTRING = require('querystring');

//khai bao ung dung va khoi dong
let Ung_dung = HTTP.createServer((req, res) => {
	if (req.url === '/') {
		XL_Khoi_dong(req, res);
	} else if (req.url.startsWith('/Loi_chao') && req.method === 'POST') {
		XL_Tao_Loi_chao(req, res);
	} else {
		console.log('>>>Không trùng khớp URL:', req.url);
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('404 Not Found');
	}
});
Ung_dung.listen(3000);
//khai bao ham xu ly bien co
let XL_Khoi_dong = (req, res) => {
	let Chuoi_HTML = `<div>Ứng dụng xin chào POST</div>
    <form action='/Loi_chao' method='POST'>
        Họ tên <input name='Th_Ho_ten' autocomplete='off'/>
        <button type='submit'>Đồng ý</button>
    </form>
    `;
	res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	res.end(Chuoi_HTML);
};

//khai bao ham Tao loi chao
let XL_Tao_Loi_chao = (req, res) => {
	let Chuoi_Tham_so = '';
	req.on('data', (x) => {
		Chuoi_Tham_so += x;
	});
	req.on('end', () => {
		let Tham_so = QUERYSTRING.parse(Chuoi_Tham_so);

		let Ho_ten = Tham_so.Th_Ho_ten;

		let Loi_chao = `<div>Xin chào ${Ho_ten}</div>`;

		let Chuoi_HTML = `<div>Ứng dụng xin chào POST</div>
        <form action='/Loi_chao' method='POST'>
            Họ tên <input name='Th_Ho_ten' autocomplete='off' value='${Ho_ten}'/>
            <button type='submit'>Đồng ý</button>
        </form>${Loi_chao}`;

		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
		res.end(Chuoi_HTML);
	});
};
