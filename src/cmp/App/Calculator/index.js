import React, {Component} from 'react'
import update from 'immutability-helper'

import {Ingredient} from 'api/classes'

import {FoodSelect} from './FoodSelect'
import {IngredientList} from './IngredientList'
import {Pie} from './Pie'

export class Calculator extends Component {
  state = {
    isEditing: false,
    ingredientList: [],
  }

  render() {
    const state = this.state
    let isPieVisible = false

    state.ingredientList.forEach(ingredient => {
      if(ingredient.amount > 0) {
        isPieVisible = true
      }
    })

    return (
      <div className="Calculator">
        <FoodSelect selectFood={this.onSelectFood}/>
        <IngredientList
          isEditing={state.isEditing}
          ingredientList={state.ingredientList}
          saveIngredient={this.onSaveIngredient}
          removeIngredient={this.onRemoveIngredient}
        />
        {isPieVisible && <Pie ingredientList={state.ingredientList}/>}
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

  onRemoveIngredient = index => this.setState(state => update(state, {
    ingredientList: {
      $splice: [[index, 1]],
    },
  }))
}
