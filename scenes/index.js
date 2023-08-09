const start = require('./startScene')
const category = require('./categoryScene')
const categoryChoice = require('./categoryChoiceScene')
const cart = require('./cartScene')
const order = require('./orderScene')
const orderConfirmation = require('./orderConfirmationScene')
const product = require('./productScene')

module.exports = {
    startScene: start.startScene,
    categoryScene: category.categoryScene,
    categoryChoiceScene: categoryChoice.categoryChoiceScene,
    cartScene: cart.cartScene,
    orderScene: order.orderScene,
    orderConfirmationScene: orderConfirmation.orderConfirmationScene,
    productScene: product.productScene,
}