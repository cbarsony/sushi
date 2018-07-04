import React from 'react'
import PropTypes from 'prop-types'

import {Ingredient} from 'api/classes'

import {IngredientItem} from './IngredientItem'

export const IngredientList = props => (
  <div className="IngredientList">
    {props.ingredientList.map((ingredient, index) => (
      <IngredientItem
        key={index}
        index={index}
        ingredient={ingredient}
        isEditing={props.isEditing && props.ingredientList.length - 1 === index}
        saveIngredient={props.saveIngredient}
        removeIngredient={props.removeIngredient}
      />
    ))}
  </div>
)

IngredientList.propTypes = {
  isEditing: PropTypes.bool,
  ingredientList: PropTypes.arrayOf(PropTypes.instanceOf(Ingredient)).isRequired,
  saveIngredient: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
}
