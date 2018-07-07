
var Dia_chi_Dich_vu = "http://localhost:1000"
//************** Xử lý Lưu trữ ***********
function Doc_Du_lieu_Cua_hang(){
  var Du_lieu={}
  var Xu_ly_HTTP = new XMLHttpRequest()  
  var Tham_so=`Ma_so_Xu_ly=Doc_Thong_tin_Cua_hang`
  var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
  Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
  Xu_ly_HTTP.send("")
  var Chuoi_JSON = Xu_ly_HTTP.responseText
  
  if (Chuoi_JSON !="")
    Du_lieu=JSON.parse(Chuoi_JSON)
  return Du_lieu
}

function Doc_Du_lieu_Dien_thoai(){
  var Du_lieu={}
  var Xu_ly_HTTP = new XMLHttpRequest()  
  var Tham_so=`Ma_so_Xu_ly=Doc_Thong_tin_Dien_thoai`
  var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
  Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
  Xu_ly_HTTP.send("")
  var Chuoi_JSON = Xu_ly_HTTP.responseText
  
  if (Chuoi_JSON !="")
    Du_lieu=JSON.parse(Chuoi_JSON)
  return Du_lieu
}
function Ghi_Thong_tin_Cua_hang_Moi(Cua_hang){
  var Kq=""
  var Chuoi_Goi = JSON.stringify(Cua_hang)
  var Tham_so=`Ma_so_Xu_ly=Ghi_Thong_tin_Cua_hang_Moi`
  var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
  var Xu_ly_HTTP = new XMLHttpRequest() 
  Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
  Xu_ly_HTTP.send(Chuoi_Goi)
  var Kq = Xu_ly_HTTP.responseText
  return Kq 
}


function Doc_Du_lieu(){
  var Du_lieu={}
  var Xu_ly_HTTP = new XMLHttpRequest()  
  var Tham_so=`Ma_so_Xu_ly=Doc_Thong_tin_Cua_hang`
  var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
  Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
  Xu_ly_HTTP.send("")
  var Chuoi_JSON = Xu_ly_HTTP.responseText
  if (Chuoi_JSON !="")
    Du_lieu=JSON.parse(Chuoi_JSON)
  return Du_lieu
}

function Doc_Du_lieu_Bien_So(){
  var Du_lieu={}
  var Xu_ly_HTTP = new XMLHttpRequest()  
  var Tham_so=`Ma_so_Xu_ly=Doc_Du_lieu_Bien_So`
  var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
  Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
  Xu_ly_HTTP.send("")
  var Chuoi_JSON = Xu_ly_HTTP.responseText
  if (Chuoi_JSON !="")
    Du_lieu=JSON.parse(Chuoi_JSON)
  return Du_lieu 
}
// function Doc_Du_lieu_Dien_thoai(){
//   var Du_lieu={}
//   var Xu_ly_HTTP = new XMLHttpRequest()  
//   var Tham_so=`Ma_so_Xu_ly=Doc_Du_lieu_Dien_thoai`
//   var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
//   Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
//   Xu_ly_HTTP.send("")
//   var Chuoi_JSON = Xu_ly_HTTP.responseText
//   if (Chuoi_JSON !="")
//     Du_lieu=JSON.parse(Chuoi_JSON)
//   return Du_lieu 
// }

function Kiem_tra_Ngay(Chuoi_ngay) {
  var Thanh_phan_con = Chuoi_ngay.split("/")
  var Hop_le = Thanh_phan_con.length == 3 && !isNaN(Thanh_phan_con[0]) &&
      !isNaN(Thanh_phan_con[1]) && !isNaN(Thanh_phan_con[2])
  if (Hop_le) {
      var Ng = parseInt(Thanh_phan_con[0])
      var Th = parseInt(Thanh_phan_con[1])
      var Nm = parseInt(Thanh_phan_con[2])
      var So_ngay_cua_Th = new Date(Nm, Th, 0).getDate()
      Hop_le = Ng >= 1 && Ng <= So_ngay_cua_Th && Th >= 1 && Th <= 12 && Nm > 0
  }
  return Hop_le
}