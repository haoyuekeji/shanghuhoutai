var token = localStorage.getItem('token')
var authority = localStorage.getItem('authority')
var onlinecode = localStorage.getItem('onlinecode')
var localhost = 'https://www.cslapp.com'
function outline (data) {
  if (data.code === 102) {
    alert(data.message)
    location.href = 'index.html'
    return false
  }
}
