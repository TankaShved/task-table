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


async function get() {
  const url = 'https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users'
  const response = await fetch(url);
  const data = await response.json();
  let table_body = document.querySelector('tbody')

  for (let i = 0; i < data.length; i++) {
    let string = document.createElement('tr')
    table_body.append(string);
    
    let column_age = document.createElement('td')
    string.append(column_age)
    column_age.append(data[i].user_age)

    let column_name = document.createElement('td')
    string.append(column_name)
    column_name.append(data[i].user_name)

    let column_sex = document.createElement('td')
    string.append(column_sex)
    column_sex.append(data[i].user_sex)
  }
  console.log(data)
}
get()


