import {constants} from 'utils/constants'

import {Food, Macros, Unit} from './classes'

const grams = new Unit('grams', 1)
const piece = new Unit('pieces', 100)

const foods = [
  new Food(1, 'apple', 'apple description...', new Macros(30, 60, 10), [grams, piece]),
  new Food(2, 'banana', 'banana description...', new Macros(30, 60, 10), [grams, piece]),
  new Food(3, 'cheese', 'cheese description...', new Macros(10, 20, 70), [grams]),
  new Food(4, 'app', 'apple 4 description...', new Macros(30, 60, 10), [grams, piece]),
  new Food(5, 'appl', 'apple 5 description...', new Macros(30, 60, 10), [grams, piece]),
  new Food(6, 'apple 1', 'apple 6 description...', new Macros(10, 20, 70), [grams]),
  new Food(7, 'apple 7', 'apple 7 description...', new Macros(30, 60, 10), [grams, piece]),
  new Food(8, 'apple 8', 'apple 8 description...', new Macros(30, 60, 10), [grams, piece]),
  new Food(9, 'apple 9', 'apple 9 description...', new Macros(10, 20, 70), [grams]),
  new Food(10, 'apple 10', 'apple 10 description...', new Macros(30, 60, 10), [grams, piece]),
  new Food(11, 'apple 11', 'apple 11 description...', new Macros(30, 60, 10), [grams, piece]),
  new Food(12, 'apple 12', 'apple 12 description...', new Macros(10, 20, 70), [grams]),
]

const searchFoods = searchText => new Promise(resolve => {
  setTimeout(() => {
    resolve(foods.filter(food => searchText !== '' && food.name.startsWith(searchText)))
  }, constants.delay)
})

export const api = {searchFoods}
