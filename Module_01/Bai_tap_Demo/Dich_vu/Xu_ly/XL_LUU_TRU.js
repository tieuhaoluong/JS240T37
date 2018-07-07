
var File = require("fs")
var Duong_dan_Thu_muc_Du_lieu = "Du_lieu"


function Doc_Thong_tin_Cua_hang() {
  var Duong_dan = Duong_dan_Thu_muc_Du_lieu + "//Cua_hang.json"
  var Chuoi_JSON = File.readFileSync(Duong_dan, "UTF-8")
  var Doi_tuong_Cua_hang = JSON.parse(Chuoi_JSON)
  return Doi_tuong_Cua_hang
}

function Doc_Thong_tin_Dien_thoai() {
  var Duong_dan = Duong_dan_Thu_muc_Du_lieu + "//IPHONE_1.json"
  var Chuoi_JSON = File.readFileSync(Duong_dan, "UTF-8")
  var Doi_tuong_Dien_thoai = JSON.parse(Chuoi_JSON)
  return Doi_tuong_Dien_thoai
}

function Doc_Thong_tin_Dien_thoai() {
  var Duong_dan = Duong_dan_Thu_muc_Du_lieu + "//IPHONE_1.json"
  var Chuoi_JSON = File.readFileSync(Duong_dan, "UTF-8")
  var Thong_tin_Dien_thoai = JSON.parse(Chuoi_JSON)
  return Thong_tin_Dien_thoai
}

function Doc_Thong_tin_Hoc_sinh() {
  var Duong_dan = Duong_dan_Thu_muc_Du_lieu + "//HS_1.json"
  var Chuoi_JSON = File.readFileSync(Duong_dan, "UTF-8")
  var Thong_tin_Hoc_sinh = JSON.parse(Chuoi_JSON)
  return Thong_tin_Hoc_sinh
}
function Doc_Diem_Hoc_Ky_I() {
  var Duong_dan = Duong_dan_Thu_muc_Du_lieu + "//Diem_HK1.json"
  var Chuoi_JSON = File.readFileSync(Duong_dan, "UTF-8")
  var Diem_HK1 = JSON.parse(Chuoi_JSON)
  return Diem_HK1
}
function Doc_Diem_Hoc_Ky_II() {
  var Duong_dan = Duong_dan_Thu_muc_Du_lieu + "//Diem_HK2.json"
  var Chuoi_JSON = File.readFileSync(Duong_dan, "UTF-8")
  var Diem_HK2 = JSON.parse(Chuoi_JSON)
  return Diem_HK2
}

function Ghi_Thong_tin_Cua_hang(Cua_hang) {
  var Kq = "OK"

  try {
    var Duong_dan = Duong_dan_Thu_muc_Du_lieu + "//" + "Cua_hang.json"
    var Chuoi_JSON = JSON.stringify(Cua_hang, null, "\t")
    File.writeFileSync(Duong_dan, Chuoi_JSON, "UTF-8")
  }
  catch (Loi) {
    Kq = Loi.toString()
  }

  return Kq
}

class XL_LUU_TRU {
  Doc_Du_lieu() {
    var Du_lieu = {} // Đối tượng
    Du_lieu.Thong_tin_Cua_hang = Doc_Thong_tin_Cua_hang()
    Du_lieu.Thong_tin_Dien_thoai = Doc_Thong_tin_Dien_thoai()
    return Du_lieu
  }
  Ghi_Thong_tin_Cua_hang_Moi(Cua_hang) {
    var Kq = ""
    var Hop_le = Cua_hang
    if (Hop_le) {
      Kq = Ghi_Thong_tin_Cua_hang(Cua_hang)
    }
    return Kq
  }

}

var Xu_ly = new XL_LUU_TRU
module.exports = Xu_ly




