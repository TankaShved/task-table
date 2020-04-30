import React from 'react';
import './App.css';
import MaterialTable from "material-table";

const noga = [
  { title: "Age", field: "user_age", type: "numeric" },
  { title: "Name", field: "user_name" },
  { title: "Sex", field: "user_sex", lookup: { 'M': "Man", 'F': "Woman" } }
]

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { lico: [] }
  }
  componentWillMount() {
    this.nash_usersGet()
  }
  nash_usersGet() {
    const gopa = async () => {
      const url = 'https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users'
      const responce = await fetch(url)
      const data = await responce.json()
      this.setState({
        lico: data
      })
    }
    gopa()
  }
  nash_usersDel(id) {
    const lopsf = async () => {
      let response = await fetch('https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users/' + id,
        { method: 'DELETE' })
      if (response.ok) {
        //alert(await response.text())
      } else {
        alert("Ошибка HTTP: " + response.status);
      }
      this.nash_usersGet()
    }
    lopsf()
  }
  nash_userUpdate(id, user) {
    const tapok = async () => {
      await fetch('https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users/' + id,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        })
      this.nash_usersGet()
    }
    tapok()
  }
  nash_userAdd(user) {
    const lol = async () => {
      await fetch('https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      this.nash_usersGet()
    }
    lol()
  }

  render() {
    return (<div style={{ maxWidth: "100%" }}>
      <MaterialTable
        options={{
          sorting: true
        }}
        columns={noga}
        data={this.state.lico}
        editable={
          {
            onRowAdd: newData => new Promise((resolve, reject) => {
              setTimeout(() => {
                if (newData.user_age <= 0) {
                  alert("Введите положительное число")
                  reject()
                }
                else {
                  let user = {
                    age: newData.user_age,
                    name: newData.user_name,
                    sex: newData.user_sex
                  }
                  this.nash_userAdd(user)
                  resolve()
                }
              }, 10);
            }),
            onRowUpdate: newData => new Promise((resolve, reject) => {
              setTimeout(() => {
                if (newData.user_age <= 0) {
                  alert("Введите положительное число")
                  reject()
                }
                else {
                  let user = {
                    age: newData.user_age,
                    name: newData.user_name,
                    sex: newData.user_sex
                  }
                  this.nash_userUpdate(newData.id, user)
                  resolve();
                }
              }, 10);
            }),
            onRowDelete: oldData => new Promise((resolve) => {
              setTimeout(() => {
                this.nash_usersDel(oldData.id)
                resolve();
              }, 10);
            })
          }
        }
        title="Users"
      />
    </div>)
  }
}

export default App;
