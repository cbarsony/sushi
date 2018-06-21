export class Unit {
  /**
   * @param name {string}
   * @param weight {number} in grams
   */
  constructor(name, weight) {
    this.name = name
    this.weight = weight
  }
}

export class Macros {
  /**
   * @param ch {number}
   * @param protein {number}
   * @param fat {number}
   */
  constructor(ch, protein, fat) {
    this.ch = ch
    this.protein = protein
    this.fat = fat
  }
}

export class Food {
  /**
   * @param id {number}
   * @param name {string}
   * @param description {string}
   * @param macros {Macros}
   * @param units {Unit[]}
   */
  constructor(id, name, description, macros, units) {
    this.id = id
    this.name = name
    this.description = description
    this.macros = macros
    this.units = units
  }
}

export class Ingredient {
  /**
   * @param food {Food}
   * @param amount {number} of Unit
   * @param unit {Unit}
   */
  constructor(food, amount, unit) {
    this.food = food
    this.amount = amount
    this.unit = unit
  }
}
