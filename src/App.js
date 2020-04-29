import React from 'react';
import logo from './logo.svg';
import './App.css';
import MaterialTable from "material-table";

const noga = [
  { title: "Age", field: "user_age", type: "numeric" },
  { title: "Name", field: "user_name" },
  { title: "Sex", field: "user_sex" }
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

  render() {
    return (<div style={{ maxWidth: "100%" }}>
      <MaterialTable
        columns={noga}
        data={this.state.lico}
        editable={
          {
            onRowDelete: oldData => new Promise((resolve, reject) => {
              setTimeout(() => {
                // console.log(oldData.id)
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
