import React, { Component } from 'react'
import fire from './fire.js'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentItem: '',
      username: '',
      items: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
      const itemsRef = fire.database().ref('items').orderByKey().limitToLast(30);;
      itemsRef.on('value', (snapshot) => {
        let list = snapshot.val();
        let newState = [];
        for (let obj in list) {
          newState.push({
            id: obj,
            item: list[obj].item,
            user: list[obj].user
          });
        }
        this.setState({
          items: newState
        });
      });
    }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    const itemsRef = fire.database().ref('items')
    itemsRef.push({
      item: this.state.currentItem,
      user: this.state.username
    })
    this.setState({
      currentItem: '',
      username: ''
    })
  }

  removeItem(itemId) {
    const itemRef = fire.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  render() {
    console.log(this.state.items)
    console.log('rendered')
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h2>So... what will you bring for this coming potluck?</h2>
              
            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
                <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                <button disabled={this.state.username == "" || this.state.currentItem == ""}>Add Item</button>
              </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
                {this.state.items.map((item, index) => {
                    return (
                      <li key={item.id}>
                        <h3>{`${index + 1}. ${item.item}`}</h3>
                        <p>brought by: {item.user}
                          <button onClick={ () => this.removeItem(item.id) }>Remove Item</button>
                        </p>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    )
  }
}
export default App