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

function user_get(value, string) {
  const cell = document.createElement('td')
  string.append(cell)
  cell.append(value)
}

// function button_delete(string) {
//   const but_del = document.createElement('input')
//   but_del.type = 'button'
//   but_del.value = 'delete'
//   but_del.onclick = function () {
//     //  let bobr = await fetch(url, {method: 'POST', body: JSON.stringify( ? )});
//     alert(3456)
//   }
//   string.append(but_del)
// }

// function user_post(){
//   const user_add = [
//     {document.querySelector('.user-age'): "31",
//     "user_name": "Test",
//     "user_sex": "M"
//   ]
// }

async function get() {
  const url = 'https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users'
  const response = await fetch(url);
  const data = await response.json();

  const table_body = document.querySelector('tbody')

  for (let i = 0; i < data.length; i++) {
    const string = document.createElement('tr')
    table_body.append(string);

    user_get(data[i].user_age, string);
    user_get(data[i].user_name, string);
    user_get(data[i].user_sex, string);
    // button_delete(string);

    const but_del = document.createElement('input')
    but_del.type = 'button'
    but_del.value = 'delete'
    but_del.onclick = function () {
      async function delUser() {
        const noga = data[i].id
        await fetch('https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users/' + noga, { method: 'DELETE' })
        table_body.innerHTML = ""
        get()
      }
      delUser()

    }
    string.append(but_del)

  }
  console.log(data)


  //for testing

  // const exampleId = "3e28ea39-1b0e-4e76-82b9-7985c5108e20"
  // const dsf = await fetch('https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users/' + exampleId,
  //   { method: 'DELETE' })

}
get()


