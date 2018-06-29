import {FoodSelect, keys} from './index'

describe('FoodSelect _getSelectedIndex()', () => {
  const foodSelect = new FoodSelect()
  foodSelect.state.foodList = [{}, {}, {}]

  describe('No food', () => {
    beforeEach(() => foodSelect.state.selectedFoodIndex = -1)

    test('arrow_up', () => expect(foodSelect._getSelectedIndex(keys.UP)).toBe(2))
    test('arrow_down', () => expect(foodSelect._getSelectedIndex(keys.DOWN)).toBe(0))
  })

  describe('First food', () => {
    beforeEach(() => foodSelect.state.selectedFoodIndex = 0)

    test('arrow_up', () => expect(foodSelect._getSelectedIndex(keys.UP)).toBe(2))
    test('arrow_down', () => expect(foodSelect._getSelectedIndex(keys.DOWN)).toBe(1))
  })

  describe('Last food', () => {
    beforeEach(() => foodSelect.state.selectedFoodIndex = foodSelect.state.foodList.length - 1)

    test('arrow_up', () => expect(foodSelect._getSelectedIndex(keys.UP)).toBe(1))
    test('arrow_down', () => expect(foodSelect._getSelectedIndex(keys.DOWN)).toBe(0))
  })
})
