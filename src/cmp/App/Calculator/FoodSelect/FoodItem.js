import React from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'

import {Food} from 'api/classes'
import './FoodItem.css'

const cn = makeBem('FoodItem')

export const FoodItem = props => (
  <div
    className={cn.mod({selected: props.isSelected})}
    onMouseEnter={() => props.onSelect(props.index)}
    onMouseDown={e => {
      // to prevent blur in IngredientItem
      e.preventDefault()
      props.onChoose(props.index)
    }}
  >
    <div>{props.food.name}</div>
    {props.isSelected && (<div key="2">{props.food.description}</div>)}
    {props.isSelected && (<div key="3">ch: {props.food.macros.ch}, protein: {props.food.macros.protein}, fat: {props.food.macros.fat}</div>)}
  </div>
)

FoodItem.propTypes = {
  index: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  onChoose: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  food: PropTypes.instanceOf(Food).isRequired,
}
