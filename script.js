//create cell in string 
function user_cell(value, string) {
  const cell = document.createElement('td')
  string.append(cell)
  cell.append(value)
}

//get
async function get() {
  const url = 'https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users'
  const response = await fetch(url);
  const data = await response.json();

  const table_body = document.querySelector('tbody')

  for (let i = 0; i < data.length; i++) {
    const string = document.createElement('tr')
    table_body.append(string);

    user_cell(data[i].user_age, string);
    user_cell(data[i].user_name, string);
    user_cell(data[i].user_sex, string);

    //button delete
    const button_delete = document.createElement('input')
    button_delete.type = 'button'
    button_delete.value = 'delete'

    button_delete.onclick = function () {
      async function user_delete() {
        const a = data[i].id // users id
        let response = await fetch('https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users/' + a,
          { method: 'DELETE' })
        if (response.ok) {
          alert(await response.text())
        } else {
          alert("Ошибка HTTP: " + response.status);
        }
        table_body.innerHTML = ""
        get()
      }
      user_delete()
    }
    string.append(button_delete)
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
      age: Number.parseInt(val_age),
    }

    async function user_add() {
      await fetch('https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      table_body.innerHTML = ""
      get()
    }
    user_add()
  }
}
get()


