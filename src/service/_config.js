import jsSHA from 'jssha'
//--------------------
export function getAuthorizationHeader() {
  let AppID = '125f67eef61d44189819c6378e4da9cb';
  let AppKey = 'Pn9PITNbREc7_yBevt-7udS0UOE';
  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  let HMAC = ShaObj.getHMAC('B64');
  let Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';
  return { 'Authorization': Authorization, 'X-Date': GMTString };
}