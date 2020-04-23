// //2 vers. fetch.
// fetch('https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users')
//   .then(response => response.json())
//   .then(users => alert(users));


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

// function user_post(){}

async function get() {
  const url = 'https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users'
  const response = await fetch(url);
  const data = await response.json();

  const table_body = document.querySelector('tbody')

  const string = document.createElement('tr')
  table_body.append(string);

  for (let i = 0; i < data.length; i++) {

    user_get(data[i].user_age, string);
    user_get(data[i].user_name, string);
    user_get(data[i].user_sex, string);

    // button_delete(string);
    const but_del = document.createElement('input')
    but_del.type = 'button'
    but_del.value = 'delete'
    but_del.onclick = function () {
      async function user_delete() {
        const a = data[i].id
        await fetch('https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users/' + a,
          { method: 'DELETE' })
        table_body.remove()
        get()
      }
      user_delete()
    }
    string.append(but_del)
  }

  // ADD
  const but_add = document.querySelector('.add_user')
  but_add.onclick = function () {
    const val_age = document.querySelector('.user_age').value
    const val_name = document.querySelector('.user_name').value
    const val_sex = document.querySelector('.user_sex').value

    let user = {
      name: val_name,
      sex: val_sex,
      age: val_age,
    }

    async function user_add() {
      let response = await fetch('https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });

      let result = await response.json();
      console.log(result);
    }
    user_add()
    
  }
  //console.log(data)
}
get()


