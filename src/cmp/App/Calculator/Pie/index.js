import React from 'react'
import PropTypes from 'prop-types'

import {Ingredient, Macros} from 'api/classes'

export const Pie = props => {
  const macros = _calculateMacros(props.ingredientList)

  return (
    <div className="Pie">
      <div>ch: {macros.ch}</div>
      <div>protein: {macros.protein}</div>
      <div>fat: {macros.fat}</div>
    </div>
  )
}

export const _calculateMacros = ingredientList => {
  let sumCh      = 0
  let sumProtein = 0
  let sumFat     = 0

  ingredientList.forEach(ingredient => {
    sumCh      += ingredient.amount * ingredient.unit.weight * ingredient.food.macros.ch
    sumProtein += ingredient.amount * ingredient.unit.weight * ingredient.food.macros.protein
    sumFat     += ingredient.amount * ingredient.unit.weight * ingredient.food.macros.fat
  })

  const sumMacros = sumCh + sumFat + sumProtein

  const ch =      Math.round(sumCh      / sumMacros * 1000) / 10
  const protein = Math.round(sumProtein / sumMacros * 1000) / 10
  const fat =     Math.round(sumFat     / sumMacros * 1000) / 10

  return new Macros(ch, protein, fat)
}

Pie.propTypes = {ingredientList: PropTypes.arrayOf(PropTypes.instanceOf(Ingredient)).isRequired}
