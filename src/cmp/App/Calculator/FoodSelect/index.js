import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Statechart} from 'scion-core'
import makeBem from 'bem-cx'
import _ from 'lodash'

import {api} from 'api'

import {FoodItem} from './FoodItem'

const cn = makeBem('FoodSelect')

const states = {
  BLURRED: 'BLURRED',
  FOCUSED: 'FOCUSED',
  WAITING_HISTORY: 'WAITING_HISTORY',
  EMPTY: 'EMPTY',
  TEXT: 'TEXT',
  WAITING: 'WAITING',
  SEARCHING: 'SEARCHING',
  SELECTED: 'SELECTED',
  UNSELECTED: 'UNSELECTED',
  CHOSEN: 'CHOSEN',
}

const events = {
  FOCUS: 'FOCUS',
  BLUR: 'BLUR',
  START_TYPING: 'START_TYPING',
  CLEAR: 'CLEAR',
  TYPE: 'TYPE',
  FIND: 'FIND',
  SELECT: 'SELECT',
  CHOOSE: 'CHOOSE',
}

export const keys = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  ENTER: 'Enter',
}

const initialState = {
  searchText: '',
  isSearching: false,
  foodList: [],
  isSuggestionContainerVisible: false,
  selectedFoodIndex: -1,
}

export class FoodSelect extends Component {
  state = initialState

  componentDidMount() {
    const model = {
      states: [
        {
          id: states.BLURRED,
          transitions: [
            {
              event: events.FOCUS,
              target: states.WAITING_HISTORY,
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
              states: [
                {
                  id: states.WAITING_HISTORY,
                  $type: 'history',
                  transitions: [{target: states.EMPTY}],
                },
                {
                  id: states.EMPTY,
                  onEntry: this.onEmptyEntry,
                },
                {
                  id: states.TEXT,
                  transitions: [
                    {
                      event: events.CLEAR,
                      target: states.EMPTY,
                    },
                    {
                      event: events.FIND,
                      target: states.TEXT,
                    },
                  ],
                  onEntry: this.onTextEntry,
                  states: [
                    {
                      id: states.UNSELECTED,
                      transitions: [
                        {
                          event: events.SELECT,
                          target: states.SELECTED,
                        },
                      ],
                    },
                    {
                      id: states.SELECTED,
                      transitions: [
                        {
                          event: events.SELECT,
                          target: states.SELECTED,
                        },
                        {
                          event: events.CHOOSE,
                          target: states.CHOSEN,
                        },
                      ],
                      onEntry: this.onSelectedEntry,
                    },
                  ],
                },
              ],
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
                  target: states.TEXT,
                },
                {
                  event: events.CLEAR,
                  target: states.EMPTY,
                },
              ],
              onEntry: this.onSearchingEntry,
              onExit: this.onSearchingExit,
            },
          ],
        },
        {
          id: states.CHOSEN,
          onEntry: this.onChosenEntry,
          transitions: [
            {
              event: events.FOCUS,
              target: states.WAITING,
            },
            {
              event: events.BLUR,
              target: states.BLURRED,
            },
          ],
        },
      ],
    }

    this.sc = new Statechart(model, {}, true)
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
          value={state.searchText}
          onChange={this.onInputChange}
          onKeyDown={this.onInputKeyDown}
          onFocus={() => this.sc.gen(events.FOCUS)}
          onBlur={() => this.sc.gen(events.BLUR)}
        />
        {state.isSearching && <span>searching...</span>}
        {state.isSuggestionContainerVisible && (
          state.foodList.length === 0 ? (
            <div>No search results for "{state.searchText}"</div>
          ) : (
            state.foodList.map((food, index) => (
              <FoodItem
                key={index}
                index={index}
                isSelected={index === state.selectedFoodIndex}
                food={food}
                onSelect={this.onFoodItemSelect}
                onChoose={this.onFoodItemChoose}
              />
            ))
          )
        )}
      </div>
    )
  }

  /* Events */

  onInputChange = ({target: {value}}) => value ? this.sc.gen(events.TYPE, {searchText: value}) : this.sc.gen(events.CLEAR)

  onInputKeyDown = e => {
    if(_.isEmpty(this.state.foodList)) {
      return
    }

    const key = e.key

    if(key === keys.UP || key === keys.DOWN) {
      this.sc.gen(events.SELECT, {index: this._getSelectedIndex(key)})
      e.preventDefault()
    }
    else if(key === keys.ENTER && this.state.selectedFoodIndex > -1) {
      this.sc.gen(events.CHOOSE, {index: this.state.selectedFoodIndex})
    }
  }

  onSearchFoodsSuccess = foodList => this.sc.gen(events.FIND, {foodList})

  onFoodItemSelect = index => this.sc.gen(events.SELECT, {index})

  onFoodItemChoose = index => this.sc.gen(events.CHOOSE, {index})

  /* Actions */

  onFocusedExit = () => this.setState({isSuggestionContainerVisible: false})

  onEmptyEntry = () => this.setState({
    searchText: '',
    isSuggestionContainerVisible: false,
  })

  onSearchingEntry = e => {
    const searchText = e.data.searchText

    api.searchFoods(searchText).then(this.onSearchFoodsSuccess)

    this.setState({
      searchText,
      isSearching: true,
      selectedFoodIndex: -1,
    })
  }

  onTextEntry = e => this.setState({
    foodList: e.data.foodList,
    isSuggestionContainerVisible: true,
  })

  onSearchingExit = () => this.setState({isSearching: false})

  onSelectedEntry = e => this.setState({
    searchText: this.state.foodList[e.data.index].name,
    selectedFoodIndex: e.data.index,
  })

  onChosenEntry = e => {
    this.props.selectFood(this.state.foodList[e.data.index])
    this.setState(initialState)
  }

  /* Methods */

  _getSelectedIndex = direction => {
    if(direction === keys.DOWN) {
      if(this.state.selectedFoodIndex === this.state.foodList.length - 1) {
        return 0
      }
      else {
        return this.state.selectedFoodIndex + 1
      }
    }
    else if(direction === keys.UP) {
      if(this.state.selectedFoodIndex <= 0) {
        return this.state.foodList.length - 1
      }
      else {
        return this.state.selectedFoodIndex - 1
      }
    }
    else {
      console.warn(`getSelectedIndex direction param should be 'UP' or 'DOWN'`)
    }
  }
}

FoodSelect.propTypes = {selectFood: PropTypes.func.isRequired}
