var File = require("fs")
var Thu_muc_Du_lieu = "Du_lieu"
var Thu_muc_Media = "Media"
var Cong_nghe = "json"

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Lỗi ...');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

class XL_LUU_TRU {
  Doc_Thong_tin_Dich_vu() {
    var Chuoi_HTML = ""
    var Duong_dan = "index.html"
    if (File.existsSync(Duong_dan))
      Chuoi_HTML = File.readFileSync(Duong_dan)
    return Chuoi_HTML
  }
  Doc_Nhi_phan_Media(Ten) {
    var Nhi_phan = ""
    var Duong_dan = Thu_muc_Media + "//" + Ten
    if (File.existsSync(Duong_dan))
      Nhi_phan = File.readFileSync(Duong_dan)
    return Nhi_phan
  }
  Ghi_Nhi_phan_Media(Ten, Chuoi_nhi_phan) {
    var Kq = "OK"
    try {
      var Nhi_phan = decodeBase64Image(Chuoi_nhi_phan);
      var Duong_dan = Thu_muc_Media + "//" + Ten
      File.writeFileSync(Duong_dan, Nhi_phan.data);
    } catch (Loi) {
      Kq = Loi.toString()
    }
    return Kq
  }
  Doc_Thong_tin_Cua_hang() {
    var Cua_hang = {}
    var Duong_dan = Thu_muc_Du_lieu + "//Cua_hang.json"
    var Chuoi_JSON = File.readFileSync(Duong_dan, "UTF-8")
    Cua_hang = JSON.parse(Chuoi_JSON)
    return Cua_hang
  }
  Doc_Thong_tin_Nguoi_dung() {
    var Danh_sach_Nguoi_dung = []
    var Duong_dan = Thu_muc_Du_lieu + "//Nguoi_dung.json"
    var Chuoi_JSON = File.readFileSync(Duong_dan, "UTF-8")
    Danh_sach_Nguoi_dung = JSON.parse(Chuoi_JSON)
    return Danh_sach_Nguoi_dung
  }

  Doc_Danh_sach(Loai_Doi_tuong) {
    var Danh_sach = []
    var Duong_dan = Thu_muc_Du_lieu + "//" + Loai_Doi_tuong
    var Danh_sach_Ten_Tap_tin = File.readdirSync(Duong_dan, "UTF-8")
    Danh_sach_Ten_Tap_tin.forEach(Ten => {
      if (Ten.toLowerCase().endsWith(Cong_nghe)) {
        var Chuoi = File.readFileSync(Duong_dan + "//" + Ten, "UTF-8")
        var Doi_tuong = JSON.parse(Chuoi)
        Danh_sach.push(Doi_tuong)
      }

    })
    return Danh_sach
  }

  Doc_Danh_sach_Thanh_ly(Loai_Doi_tuong) {
    var Danh_sach = []
    var Duong_dan = Thu_muc_Du_lieu + "//" + Loai_Doi_tuong + "//Thanh_ly"
    var Danh_sach_Ten_Tap_tin = File.readdirSync(Duong_dan, "UTF-8")
    Danh_sach_Ten_Tap_tin.forEach(Ten => {
      if (Ten.toLowerCase().endsWith(Cong_nghe)) {
        var Chuoi = File.readFileSync(Duong_dan + "//" + Ten, "UTF-8")
        var Doi_tuong = JSON.parse(Chuoi)
        Danh_sach.push(Doi_tuong)
      }

    })
    return Danh_sach
  }
  Ghi_moi_Doi_tuong(Loai_Doi_tuong, Doi_tuong) {
    var Kq = ""
    try {
      var Duong_dan = Thu_muc_Du_lieu + "//" + Loai_Doi_tuong + "//" + Doi_tuong.Ma_so + "." + Cong_nghe
      var Chuoi = JSON.stringify(Doi_tuong, null, "\t")
      File.writeFileSync(Duong_dan, Chuoi, "UTF-8")
    } catch (Loi) {
      Kq = Loi
    }

    return Kq
  }
  Cap_nhat_Doi_tuong(Loai_Doi_tuong, Doi_tuong) {
    return this.Ghi_moi_Doi_tuong(Loai_Doi_tuong, Doi_tuong)
  }
  Thanh_ly_Doi_tuong(Loai_Doi_tuong, Doi_tuong) {
    var Kq = ""
    try {

      var Duong_dan = Thu_muc_Du_lieu + "//" + Loai_Doi_tuong + "//" + Doi_tuong.Ma_so + "." + Cong_nghe
      var Duong_dan_Thanh_ly = Thu_muc_Du_lieu + "//" + Loai_Doi_tuong + "//Thanh_ly//" + Doi_tuong.Ma_so + "." + Cong_nghe
      File.unlinkSync(Duong_dan)
      var Chuoi = JSON.stringify(Doi_tuong,null,"\t")
      File.writeFileSync(Duong_dan_Thanh_ly, Chuoi, "UTF-8")
    } catch (Loi) {
      Kq = Loi
    }

    return Kq
  }
  Phuc_hoi_Doi_tuong(Loai_Doi_tuong, Doi_tuong) {
    var Kq = ""
    try {

      var Duong_dan = Thu_muc_Du_lieu + "//" + Loai_Doi_tuong + "//" + Doi_tuong.Ma_so + "." + Cong_nghe
      var Duong_dan_Thanh_ly = Thu_muc_Du_lieu + "//" + Loai_Doi_tuong + "//Thanh_ly//" + Doi_tuong.Ma_so + "." + Cong_nghe
      File.unlinkSync(Duong_dan_Thanh_ly)
      var Chuoi = JSON.stringify(Doi_tuong,null,"\t")
      File.writeFileSync(Duong_dan, Chuoi, "UTF-8")
    } catch (Loi) {
      Kq = Loi
    }

    return Kq
  }
  Xoa_Doi_tuong(Loai_Doi_tuong, Doi_tuong) {
    var Kq = ""
    try {
      var Duong_dan = Thu_muc_Du_lieu + "//" + Loai_Doi_tuong + "//" + Doi_tuong.Ma_so + "." + Cong_nghe
      var Duong_dan_Xoa = Thu_muc_Du_lieu + "//" + Loai_Doi_tuong + "//Xoa//" + Doi_tuong.Ma_so + "." + Cong_nghe
      File.unlinkSync(Duong_dan)
      var Chuoi = JSON.stringify(Doi_tuong,null,"\t")
      File.writeFileSync(Duong_dan_Xoa, Chuoi, "UTF-8")

    } catch (Loi) {
      Kq = Loi
    }

    return Kq
  }

}

var Xu_ly = new XL_LUU_TRU()
module.exports = Xu_ly


