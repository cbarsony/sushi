import {constants} from 'utils/constants'

import {Food, Macros, Unit} from './classes'

const grams = new Unit('grams', 1)
const piece = new Unit('pieces', 100)

const foods = [
  new Food(1, 'apple', new Macros(30, 60, 10), [grams, piece]),
  new Food(2, 'banana', new Macros(30, 60, 10), [grams, piece]),
  new Food(3, 'cheese', new Macros(10, 20, 70), [grams]),
  new Food(4, 'apple 4', new Macros(30, 60, 10), [grams, piece]),
  new Food(5, 'apple 5', new Macros(30, 60, 10), [grams, piece]),
  new Food(6, 'apple 6', new Macros(10, 20, 70), [grams]),
  new Food(7, 'apple 7', new Macros(30, 60, 10), [grams, piece]),
  new Food(8, 'apple 8', new Macros(30, 60, 10), [grams, piece]),
  new Food(9, 'apple 9', new Macros(10, 20, 70), [grams]),
  new Food(10, 'apple 10', new Macros(30, 60, 10), [grams, piece]),
  new Food(11, 'apple 11', new Macros(30, 60, 10), [grams, piece]),
  new Food(12, 'apple 12', new Macros(10, 20, 70), [grams]),
]

const searchFoods = searchText => new Promise(resolve => {
  setTimeout(() => {
    resolve(foods.filter(food => searchText !== '' && food.name.startsWith(searchText)))
  }, constants.delay)
})

export const api = {searchFoods}
