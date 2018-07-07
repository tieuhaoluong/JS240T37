
//************** Xử lý Lưu trữ ***********
function Doc_Du_lieu() {
 
  var Du_lieu = ""
  var Xu_ly_HTTP = new XMLHttpRequest()
  Xu_ly_HTTP.open("GET", "../Du_lieu_Luu_tru/Ho_ten.txt", false)
  Xu_ly_HTTP.send("")
  var Chuoi_Ho_ten = Xu_ly_HTTP.responseText.trim()
 
  if (Chuoi_Ho_ten != "") 
    Du_lieu =  Chuoi_Ho_ten
   
  return Du_lieu
}