const { Scenes } = require("telegraf")
const utils = require("../utils/moysklad")
const { Markup } = require('telegraf');

const categoryScene = new Scenes.BaseScene('categoryScene');

categoryScene.enter(async (ctx) => {
    let items = await utils.getItems(0, ctx.group)

    let count = 0

    for (let item of items) {
        ctx.reply(item.name, Markup.inlineKeyboard([
            [Markup.button.callback("<<", "prev"), Markup.button.callback(">>", "next")]
        ]))
    }


})

module.exports = { categoryScene }