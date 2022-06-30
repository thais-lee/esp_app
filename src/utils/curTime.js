export function currentTime() {
  let date = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();
  let hour = new Date().getHours();
  let min = new Date().getMinutes();
  let sec = new Date().getSeconds();

  return (
    hour + ':' + min + ':' + sec + ' ' + date + '/' + month + '/' + year
  );
}
