var Dia_chi_Dich_vu = "http://localhost:1000"
var Dia_chi_Media = "http://localhost:1001"
var Thu_muc_File = "../Files/";
function DownloadFile(tap_tin, ten_moi) {
    var element = document.createElement("a")
    document.body.appendChild(element)
    element.setAttribute("href", `${Thu_muc_File}/${tap_tin}`)
    element.setAttribute("download", `${ten_moi}`)
    element.click()
    document.body.removeChild(element)
}

function XL_Upload() {
    var Ngay = Tao_Chuoi_The_hien_Ngay()
    Ngay = Ngay.replace(/[/]/g,"_")
    var Ma_so = `Don_Xin_Ung_tuyen-${Ngay}-${Th_Dien_thoai.value}.pdf`
    
	var reader = new FileReader();
    var Du_lieu_pdf = "";
    reader.onload = function (e) {
        Du_lieu_pdf = e.target.result;
        var Du_lieu = { "Chuoi_nhi_phan": Du_lieu_pdf, "Ten": Ma_so };
        var Xu_ly_HTTP = new XMLHttpRequest()
        var Dia_chi_Xu_ly = `${Dia_chi_Media}/Ghi_PDF`
        Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
        var Chuoi_Goi = JSON.stringify(Du_lieu)
        Xu_ly_HTTP.send(Chuoi_Goi)
        var Chuoi_KQ = Xu_ly_HTTP.responseText
        return Chuoi_KQ
    }
    Th_Thong_bao.innerHTML="Cửa hàng Chúng tôi đã nhận đơn của bạn.<br>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất"
    reader.readAsDataURL(Th_file.files[0]);
    Th_Close.click()
}

function Tao_the_hien_Upload(Th_Cha) {
    Th_Cha.innerHTML = ""
    var The_hien = document.createElement("table");
    Th_Cha.appendChild(The_hien);
    The_hien.className = "table table-bordered";
    var noi_dung = "";
    noi_dung += `<tr>`
    noi_dung += `<td>Họ Tên</td><td><input type="text" id="Th_Ten" style="width:20rem" /></td>`
    noi_dung += `</tr>`
    noi_dung += `<tr>`
    noi_dung += `<td>Điện thoại</td><td><input type="text" id="Th_Dien_thoai" /></td>`
    noi_dung += `</tr>`
    noi_dung += `<tr>`
    noi_dung += `<td>Tập tin (pdf)</td><td><input type="file" id="Th_file" /></td>`
    noi_dung += `</tr>`
    noi_dung += `<tr align="center">`
    noi_dung += `<td colspan=2><button class="btn btn-danger" onclick="XL_Upload()">Đồng ý</button> </td>`
    noi_dung += `</tr>`
    The_hien.innerHTML = noi_dung
}

function Tao_Chuoi_The_hien_Ngay(Ngay) {
    var Chuoi_The_hien = ""
    if (!Ngay)
        Ngay = new Date()
    Chuoi_The_hien = Ngay.getDate() + "/" + (Ngay.getMonth() + 1) + "/" + Ngay.getFullYear()
    return Chuoi_The_hien
}