// //1 vers. async await function.
// async function main() {
//   const n = await fetch('https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users');
//   const d = await n.json()
//   console.log(d)
// }
// main()

// //2 vers. fetch.
// fetch('https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users')
//   .then(response => response.json())
//   .then(users => alert(users));

// //3 vers. async =>.
// let f = async () => {
//   const n = await fetch('https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users');
//   const d = await n.json()
//   console.log(d)
// }
// f()

function column(value, string) {
  let cell = document.createElement('td')
  string.append(cell)
  cell.append(value)
}

function button_del(string){
  const button_del = document.createElement('input')
  button_del.type = 'button'
  button_del.value = 'delete'
  string.append(button_del)
}

async function get() {
  const url = 'https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users'
  const response = await fetch(url);
  const data = await response.json();

  const table_body = document.querySelector('tbody')

  for (let i = 0; i < data.length; i++) {
    const string = document.createElement('tr')
    table_body.append(string);

    column(data[i].user_age, string);
    column(data[i].user_name, string);
    column(data[i].user_sex, string);
    button_del(string);
  }
  //console.log(data)
}
get()


