const { Scenes } = require('telegraf');
const { Markup } = require('telegraf');
const Moysklad = require('../utils/moysklad');

const categoryChoiceScene = new Scenes.BaseScene('categoryChoiceScene');

categoryChoiceScene.enter(async (ctx) => {
    let buttons = await Moysklad.getMainCategoriesButtons()
    buttons.push([Markup.button.callback("Назад", "Back")])
    ctx.reply("Выберите интересующую категорию", Markup.inlineKeyboard(buttons).resize())
})

categoryChoiceScene.action(/^category_.*/, async (ctx) => {
    let group = ctx.match[0].replace("category_", "")
    ctx.group = group
    ctx.scene.enter('categoryScene')
})

categoryChoiceScene.action("Back", async (ctx) => {
    ctx.scene.enter('startScene')
})

module.exports = { categoryChoiceScene }