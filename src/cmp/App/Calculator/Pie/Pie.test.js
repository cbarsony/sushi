import {Ingredient, Food, Macros, Unit} from 'api/classes'

import {_calculateMacros} from './index'

describe('Pie', () => {
  const grams = new Unit('grams', 1)
  const apple = new Food(1, 'apple', '', new Macros(30, 60, 10), [grams])
  const banana = new Food(2, 'banana', '', new Macros(20, 50, 30), [grams])
  const ingredients = [
    new Ingredient(apple, 2, grams),
    new Ingredient(banana, 3, grams),
  ]

  test('calculateMacros', () => expect(_calculateMacros(ingredients)).toEqual(new Macros(24, 54, 22)))
})
