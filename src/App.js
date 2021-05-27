import { Component } from 'react'
import './App.css';
import { CardList } from './components/card-list/card-list.component'
import { SearchBox } from './components/search-box/search-box.component'


class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    this.setState({ searchField: e.target.value })
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => {
        console.log("response", users)
        this.setState({ monsters: users })
      }).catch(err => {
        console.log("error", err)
      })
  }
  render() {
    const { monsters, searchField } = this.state;
    const filteredArray = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase()))
    return (
      <div className="App">
        <h1>Monster Rolodex</h1>
        <SearchBox
          placeholder='Search Monsters'
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredArray} />
      </div>
    );
  }
}

export default App;
