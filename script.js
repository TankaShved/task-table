//create cell in string 
function user_cell(value, string) {
  const cell = document.createElement('td')
  string.append(cell)
  cell.append(value)
  return cell
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

    const cell_age = user_cell(data[i].user_age, string);
    const cell_name = user_cell(data[i].user_name, string);
    const cell_sex = user_cell(data[i].user_sex, string);

    //button delete
    const button_delete = document.createElement('input')
    button_delete.type = 'button'
    button_delete.value = 'delete'

    const a = data[i].id // users id

    button_delete.onclick = function () {
      async function user_delete() {
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

    //button edit
    const button_edit = document.createElement('input') // button
    button_edit.type = 'button'
    button_edit.value = 'edit'

    button_edit.onclick = function () {  //onclick button "edit"
      const new_age = document.createElement('input')  // create input
      new_age.type = 'text'
      const new_name = document.createElement('input')  // create input
      new_name.type = 'text'
      const new_sex = document.createElement('input')  // create input
      new_sex.type = 'text'

      cell_age.innerHTML = ''  // clear cell
      cell_age.append(new_age)  // add input
      cell_name.innerHTML = ''
      cell_name.append(new_name)
      cell_sex.innerHTML = ''
      cell_sex.append(new_sex)

      button_edit.value = 'save' // change name button "edit" on button "save"

      button_edit.onclick = function () { // onclick button "save"      
        const edit_age = new_age.value // variable edit_age = inpput value   
        const edit_name = new_name.value
        const edit_sex = new_sex.value
        let user = {
          name: edit_name,
          sex: edit_sex,
          age: edit_age
        }
        async function user_edit() {
          let b = Number.isNaN(Number.parseInt(user.age))
          if (user.sex != 'M' && user.sex != 'F') {
            alert('пол должен содержать M или F')
          } else if (b === true || Number.parseInt(user.age) < 0) {
            alert('возраст должен быть положительным числом')
          } else {
            await fetch('https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users/' + a, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(user)
            })
            button_edit.value = 'edit'
            table_body.innerHTML = ""
            get()
          }
        }
        user_edit()
      }
    }
    string.append(button_edit)
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
      age: val_age
    }

    async function user_add() {
      let b = Number.isNaN(Number.parseInt(user.age))
      if (user.sex != 'M' && user.sex != 'F') {
        alert('пол должен содержать M или F')
      } else if (b === true || Number.parseInt(user.age) < 0) {
        alert('возраст должен быть положительным числом')
      } else {
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
    }
    user_add()
  }
}
get()


