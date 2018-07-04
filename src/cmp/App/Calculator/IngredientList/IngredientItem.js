import React, {Component} from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'

import {Ingredient} from 'api/classes'

export class IngredientItem extends Component {
  state = {
    amount: 1,
    unitName: this.props.ingredient.food.units[0].name,
  }

  componentDidMount() {
    this.numberInput && this.numberInput.focus()
  }

  render() {
    const props = this.props
    const state = this.state

    return (
      <div className="IngredientItem">
        <span>{props.ingredient.food.name}</span>
        {props.isEditing ? (
          <input
            type="number"
            ref={input => this.numberInput = input}
            value={state.amount}
            onChange={e => this.setState({amount: Number(e.target.value)})}
          />
        ) : (
          <span>{props.ingredient.amount}</span>
        )}
        {props.isEditing ? (
          <select
            value={state.unitName}
            onChange={e => this.setState({unitName: e.target.value})}
          >
            {props.ingredient.food.units.map((unit, index) => (
              <option
                key={index}
                value={unit.name}
              >{unit.name}</option>
            ))}
          </select>
        ) : (
          <span>{props.ingredient.unit.name}</span>
        )}
        {props.isEditing && <button onClick={this.onSaveIngredient}>+</button>}
        <button onClick={this.onRemoveIngredient}>-</button>
      </div>
    )
  }

  onSaveIngredient = () => {
    const newUnit = this.props.ingredient.food.units.find(unit => unit.name === this.state.unitName)

    const newIngredient = update(this.props.ingredient, {
      amount: {
        $set: this.state.amount,
      },
      unit: {
        $set: newUnit,
      },
    })

    this.props.saveIngredient(newIngredient)
  }

  onRemoveIngredient = () => this.props.removeIngredient(this.props.index)
}

IngredientItem.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.instanceOf(Ingredient).isRequired,
  isEditing: PropTypes.bool,
  saveIngredient: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
}
