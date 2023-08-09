const { Telegraf, session, Scenes, Markup } = require("telegraf")
const CustomScene = require('./scenes');

//const lib = require('./lib');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([
    CustomScene.startScene,
    CustomScene.categoryScene,
    CustomScene.categoryChoiceScene,
    CustomScene.cartScene,
    CustomScene.orderScene,
    CustomScene.orderConfirmationScene,
    CustomScene.productScene,

], {
    default: CustomScene.startScene,
})

bot.use(session());
bot.use(stage.middleware());

bot.start(async (ctx) => { ctx.scene.enter("startScene") })

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
