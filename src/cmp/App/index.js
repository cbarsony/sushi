import React, {Component} from 'react'

import {api} from 'api'
import {FoodSelect} from 'cmp/FoodSelect'

export class App extends Component {
  state = {
    searchText: '',
    isSearching: false,
  }

  render() {
    // const state = this.state

    return (
      <div className="App">
        <FoodSelect/>
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
