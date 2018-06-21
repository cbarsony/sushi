import React, {Component} from 'react'
import {Statechart} from 'scion-core'
import makeBem from 'bem-cx'

import {api} from 'api'

import './FoodSelect.css'

const cn = makeBem('FoodSelect')

const states = {
  BLURRED: 'BLURRED',
  FOCUSED: 'FOCUSED',
  FOCUSED_HISTORY: 'FOCUSED_HISTORY',
  EMPTY: 'EMPTY',
  TEXT: 'TEXT',
  WAITING: 'WAITING',
  SEARCHING: 'SEARCHING',
}

const events = {
  FOCUS: 'FOCUS',
  BLUR: 'BLUR',
  START_TYPING: 'START_TYPING',
  CLEAR: 'CLEAR',
  TYPE: 'TYPE',
  FIND: 'FIND',
}

export class FoodSelect extends Component {
  state = {
    searchText: '',
    isSearching: false,
    foodList: [],
    isSuggestionContainerVisible: false,
    selectedFoodIndex: -1,
  }

  componentDidMount() {
    const model = {
      states: [
        {
          id: states.BLURRED,
          transitions: [
            {
              event: events.FOCUS,
              target: states.WAITING,
            },
          ],
        },
        {
          id: states.FOCUSED,
          transitions: [
            {
              event: events.BLUR,
              target: states.BLURRED,
            },
          ],
          onExit: this.onFocusedExit,
          states: [
            {
              id: states.WAITING,
              transitions: [
                {
                  event: events.TYPE,
                  target: states.SEARCHING,
                },
              ],
              onEntry: this.onWaitingEntry,
            },
            {
              id: states.SEARCHING,
              transitions: [
                {
                  event: events.TYPE,
                  target: states.SEARCHING,
                },
                {
                  event: events.FIND,
                  target: states.WAITING,
                },
              ],
              onEntry: this.onSearchingEntry,
              onExit: this.onSearchingExit,
            },
          ],
        },
      ],
    }

    this.sc = new Statechart(model)
    this.sc.start()

    this.foodSelectInput.focus()
  }

  render() {
    const state = this.state

    return (
      <div className={cn}>
        <input
          type="text"
          placeholder="Start typing a food name..."
          ref={input => this.foodSelectInput = input}
          onChange={e => this.sc.gen(events.TYPE, e.target.value)}
          onFocus={() => this.sc.gen(events.FOCUS)}
          onBlur={() => this.sc.gen(events.BLUR)}
          onKeyDown={this.onKeyDown}
        />
        {state.isSearching && <span>searching...</span>}
        {state.isSuggestionContainerVisible && (
          state.foodList.length === 0 ? (
            <div>No search results for "{state.searchText}"</div>
          ) : (
            state.foodList.map((food, index) => (
              <div
                key={index}
                className={cn.mod({selected: index === state.selectedFoodIndex})}
              >{food.name}</div>
            ))
          )
        )}
      </div>
    )
  }

  onFocusedExit = () => this.setState({isSuggestionContainerVisible: false})

  onWaitingEntry = ({data}) => {
    const isSuggestionContainerVisible = this.state.searchText !== ''

    if(data) {
      this.setState({
        foodList: data,
        isSuggestionContainerVisible,
      })
    }
    else {
      this.setState({isSuggestionContainerVisible})
    }
  }

  onSearchingEntry = ({data}) => {
    api.searchFoods(data).then(foodList => this.sc.gen(events.FIND, foodList))

    this.setState({
      searchText: data,
      isSearching: true,
      selectedFoodIndex: -1,
    })
  }

  onSearchingExit = () => this.setState({isSearching: false})

  onKeyDown = e => {
    if(this.state.foodList.length === 0) {
      return
    }

    if(e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      let selectedFoodIndex

      if(e.key === 'ArrowDown') {
        if(this.state.foodList.length <= this.state.selectedFoodIndex + 1) {
          selectedFoodIndex = 0
        }
        else {
          selectedFoodIndex = this.state.selectedFoodIndex + 1
        }
      }
      else if(e.key === 'ArrowUp') {
        if(this.state.selectedFoodIndex === 0) {
          selectedFoodIndex = this.state.foodList.length - 1
        }
        else {
          selectedFoodIndex = this.state.selectedFoodIndex - 1
        }
      }

      this.setState({selectedFoodIndex})

      e.preventDefault()
    }
  }
}
