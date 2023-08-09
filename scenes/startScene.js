const { Scenes } = require('telegraf');
const { Markup } = require('telegraf');

const startScene = new Scenes.BaseScene('startScene');

startScene.enter(async (ctx, next) => {
    await ctx.reply('Welcome', Markup.keyboard([
        ['Каталог', 'Корзина'],
        ['Заказы']
    ]).resize());
})

startScene.on('message', async (ctx) => {
    if (ctx.message.text === 'Каталог') {
        console.log("sent")
        ctx.scene.enter('categoryChoiceScene')

    }

    else if (ctx.message.text === 'Корзина')
        ctx.scene.enter('cartScene')
    else if (ctx.message.text === 'Заказы')
        ctx.scene.enter('orederScene')
})

startScene.leave(async (ctx) => {
    try {
        console.log("Cleaning welcome scene")
    } catch (error) {

    }
})


module.exports = { startScene }
