import React, {Component} from 'react'
import update from 'immutability-helper'

import {Ingredient} from 'api/classes'

import {FoodSelect} from './FoodSelect'
import {IngredientList} from './IngredientList'

export class Calculator extends Component {
  state = {ingredientList: []}

  render() {
    const state = this.state

    return (
      <div className="Calculator">
        <FoodSelect selectFood={this.onSelectFood}/>
        <IngredientList
          ingredientList={state.ingredientList}
          saveIngredient={this.onSaveIngredient}
          removeIngredient={this.onRemoveIngredient}
        />
      </div>
    )
  }

  onSelectFood = food =>     this.setState(state => update(state, {
    ingredientList: {
      $push: [new Ingredient(food, 0, food.units[0])],
    },
  }))

  onSaveIngredient = ingredient => this.setState(state => update(state, {
    ingredientList: {
      $push: [ingredient],
    },
  }))

  onRemoveIngredient = index => console.log(index)
}
