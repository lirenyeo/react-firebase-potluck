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

  componentWillMount() {
    const itemsRef = fire.database().ref('items')
    itemsRef.on('child_added', (snapshot) => {
      this.setState({
        items: this.state.items.concat(snapshot.val())
      })
    })
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

  render() {
    console.log('rendered')
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Potluck Items</h1>
              
            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
                <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                <button>Add Item</button>
              </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
                {this.state.items.map((item, index) => {
                    return (
                      <li key={index}>
                        <h3>{item.item}</h3>
                        <p>brought by: {item.user}
                          <button onClick={ () => alert(`Please implement this feature!`)}>Remove Item</button>
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