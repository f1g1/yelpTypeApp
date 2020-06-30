export let handleOpenNow = allHours => {
  let today = new Date();
  let i = today.getDay();
  let currentHour = toDate(today.getHours() + ":" + today.getMinutes());
  console.log("currentHour", currentHour);

  let hours = allHours[i];
  return currentHour > toDate(hours.open) && currentHour < toDate(hours.close);
};
function toDate(dStr) {
  var now = new Date();
  now.setHours(dStr.substr(0, dStr.indexOf(":")));
  now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
  now.setSeconds(0);
  return now;
}

export function toDataUrl(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}
