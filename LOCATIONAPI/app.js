let latitude,
  longitude = "";
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
} else {
  alert("Tarayıcınız konum bilgisini alamıyor...");
}

function onSuccess(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  

  const api_key ="a56e30d3a091429cb55f7774368ec3c3";
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`;

  fetch(url).then(response =>response.json())
  .then(result =>{
    let details = result.results[0].components;
    let {country,postcode,province,quarter} =details;
    document.querySelector('#results').innerHTML=`
    <p>Ülke:${country}</p>
    <p>PostaKodu:${postcode}</p>
    <p>Şehir:${province}</p>
    <p>İlçe:${quarter}</p>
    
    
    `
    console.log(result)
  });
}
function onError(err) {
  if (err.code == 1) {
    alert("Kullanıcı erişim iznini reddetti.");
  } else if (err.code == 2) {
    alert("Konum alınamadı");
  } else {
    alert("Bir hata oluştu");
  }
}
