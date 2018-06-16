import React, {Component} from 'react'

import {api} from 'api'

export class App extends Component {
  state = {
    searchText: '',
    isSearching: false,
  }

  render() {
    const state = this.state

    return (
      <div className="App">
        <input
          type="text"
          value={state.searchText}
          onChange={this.onSearchFoods}
        />
        {state.isSearching && <span>searching...</span>}
      </div>
    )
  }

  onSearchFoods = e => {
    this.setState({
      searchText: e.target.value,
      isSearching: true,
    })

    api.searchFoods(e.target.value)
      .then(foods => {
        this.setState({isSearching: false})
        console.log(foods)
      })
  }
}
