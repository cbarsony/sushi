import React, {Component} from 'react'
import update from 'immutability-helper'

import {Ingredient} from 'api/classes'

import {FoodSelect} from './FoodSelect'
import {IngredientList} from './IngredientList'

export class Calculator extends Component {
  state = {
    isEditing: false,
    ingredientList: [],
  }

  render() {
    const state = this.state

    return (
      <div className="Calculator">
        <FoodSelect selectFood={this.onSelectFood}/>
        <IngredientList
          isEditing={state.isEditing}
          ingredientList={state.ingredientList}
          saveIngredient={this.onSaveIngredient}
          removeIngredient={this.onRemoveIngredient}
        />
      </div>
    )
  }

  onSelectFood = food => this.setState(state => update(state, {
    isEditing: {
      $set: true,
    },
    ingredientList: {
      $push: [new Ingredient(food, 0, food.units[0])],
    },
  }))

  onSaveIngredient = ingredient => this.setState(state => update(state, {
    isEditing: {
      $set: false,
    },
    ingredientList: {
      [this.state.ingredientList.length - 1]: {
        $set: ingredient,
      },
    },
  }))

  onRemoveIngredient = index => console.log(index)
}
