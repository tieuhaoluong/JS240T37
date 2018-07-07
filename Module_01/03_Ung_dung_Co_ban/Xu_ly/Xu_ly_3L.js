
//************** Xử lý Lưu trữ ***********
function Doc_Ho_ten() {
  var Chuoi_ho_ten=""
  
  var Xu_ly_HTTP = new XMLHttpRequest()
  Xu_ly_HTTP.open("GET", "../Du_lieu_Luu_tru/hoc_vien.txt", false) // Đồng bộ
  Xu_ly_HTTP.send()
  Chuoi_ho_ten = Xu_ly_HTTP.responseText // Giá trị trả về 
  
  
  return Chuoi_ho_ten
}