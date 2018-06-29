import React from 'react'
import PropTypes from 'prop-types'

import {Ingredient} from 'api/classes'

export const Pie = props => (
  <div className="Pie">pie...</div>
)

Pie.propTypes = {ingredientList: PropTypes.arrayOf(PropTypes.instanceOf(Ingredient)).isRequired}
