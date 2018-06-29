import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {Ingredient} from 'api/classes'

import {IngredientItem} from './IngredientItem'

export class IngredientList extends Component {
  state = {isEditing: true}

  render() {
    const props = this.props
    const state = this.state

    return (
      <div className="IngredientList">
        {props.ingredientList.map((ingredient, index) => (
          <IngredientItem
            key={index}
            index={index}
            ingredient={ingredient}
            isEditing={state.isEditing && props.ingredientList.length - 1 === index}
            saveIngredient={this.onSaveIngredient}
            removeIngredient={this.onRemoveIngredient}
          />
        ))}
      </div>
    )
  }

  onSaveIngredient = ingredient => {
    this.props.saveIngredient(ingredient)
    this.setState({isEditing: false})
  }

  onRemoveIngredient = index => {
    this.props.removeIngredient(index)
    this.setState({isEditing: false})
  }
}

IngredientList.propTypes = {
  ingredientList: PropTypes.arrayOf(PropTypes.instanceOf(Ingredient)).isRequired,
  saveIngredient: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
}
