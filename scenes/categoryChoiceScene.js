const { Scenes } = require('telegraf');
const { Markup } = require('telegraf');
const moySklad = require('moysklad');
const ms = moySklad();

const categoryChoiceScene = new Scenes.BaseScene('categoryChoiceScene');

categoryChoiceScene.enter(async (ctx, next) => {
    console.log('recieved');
    let buttons = await getCategoriesButtons()
    console.log(buttons)
    ctx.reply("Выберите интересующую категорию", Markup.inlineKeyboard(buttons).resize())
})

async function getCategoriesButtons() {
    console.log("func")
    groups = await ms.GET('entity/productfolder').then(res => res.rows)
    let r = [];
    for (let row of groups) {
        if (row.pathName === "")
            r.push([Markup.button.callback(row.name, "category_" + row.name)]);
    }
    return r;
}

module.exports = { categoryChoiceScene }