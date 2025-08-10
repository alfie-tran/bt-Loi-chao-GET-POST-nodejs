//khai báo sử dụng thư viện hàm
const HTTP = require('http');
const URL = require('url');
const QUERYSTRING = require('querystring');

//khai báo và khưởi động ứng dụng
let Ung_dung = HTTP.createServer((req, res) => {
	//console.log('>>>check hàm ứng dụng', req.url);
	if (req.url === '/') {
		//console.log('>>>check dòng if khởi động hàm');
		//goi ham khoi dong
		XL_Khoi_dong(req, res);
	} else if (req.url.startsWith('/Loi_chao') && req.method === 'GET') {
		//Tao loi chao
		XL_Tao_Loi_chao(req, res);
	} else {
		//console.log('>>>Không trùng khớp URL:', req.url);
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('404 Not Found');
	}
});
Ung_dung.listen(3000);

//khai bao ham Xu ly Bien co
function XL_Khoi_dong(req, res) {
	console.log('>>>check hàm KHởi động');
	let Chuoi_HTML = `<div>Ứng dụng lời chào GET </div>
    <form action='/Loi_chao' method='GET'>
        Họ tên <input name='Th_Ho_ten' autocomplete='off'/>
        <button type='submit'>Đồng Ý</button>
    </form>
    `;
	res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	res.end(Chuoi_HTML);
}

let XL_Tao_Loi_chao = (req, res) => {
	console.log('>>>check hàm Tạo lời chào');
	//nhap lieu ho ten
	let Dia_chi = URL.parse(req.url);
	let Tham_so = QUERYSTRING.parse(Dia_chi.query);
	let Ho_ten = Tham_so.Th_Ho_ten;

	//Xu ly nghiep vu
	let Loi_chao = `<div>Xin chào ${Ho_ten}</div>`;

	//Ket xuat
	let Chuoi_HTML = `<div>Ứng dụng Lời Chào (GET)</div>
    <form action='/Loi_chao' method='GET'>
        Họ tên <input name='Th_Ho_ten' autocomplete='off' value='${Ho_ten}'/>
        <button type='submit'>Đồng ý</button>
    </form>
    ${Loi_chao}`;
	res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	res.end(Chuoi_HTML);
};
