const fs = require("fs");
const { mkdir, writeFile } = require("fs/promises");
const { Readable } = require('stream');
const { finished } = require('stream/promises');
const path = require("path");

const moySklad = require('moysklad');
const ms = moySklad();

const downloadFile = (async (url, folder = ".") => {
    const res = await fetch(url);
    if (!fs.existsSync("downloads")) await mkdir("downloads"); //Optional if you already have downloads directory
    const destination = path.resolve("./downloads", folder);
    const fileStream = fs.createWriteStream(destination, { flags: 'w' });
    await finished(Readable.fromWeb(res.body).pipe(fileStream));
});

const setImages = async () => {
    console.log("start")
    ms.GET('entity/product', {
        expand: "images"
    }).then(async res => {
        i = 0;
        for (let item of res.rows) {
            setTimeout(() => {
                try {
                    ms.fetchUrl(item.images.rows[0].meta.downloadHref, {
                        headers: {
                            'Authorization': ms.getAuthHeader()
                        },
                        rawRedirect: 'true'
                    })
                        .then(response => {
                            downloadFile(response.headers.get('location'), item.name + ".jpg");
                        })
                } catch (e) {
                    downloadFile("https://i.ytimg.com/vi/YC-hK78YjDI/hqdefault.jpg", item.name + ".jpg")
                }
            }, 1000);

        }
    });


}

const getGroups = async () => {
    return await fetch("https://online.moysklad.ru/api/remap/1.2/entity/productfolder", {
        headers: {
            'Authorization': 'Bearer ' + process.env.SKLAD_TOKEN
        }
    })
        .then(res => res.json())
        .then(res => {
            let groups = [];
            for (let row of res.rows)
                groups.push(row.name)
            return groups;
        })
}


module.exports = {
    getGroups,
    setImages,
    downloadFile
}



const scenes = [require('./scenes/startScene'), require('./scenes/catalogScene')];




// lib.setImages();

// bot.start(async (ctx) => {
//     await ctx.reply('Welcome', Markup.keyboard([
//         ['Каталог', 'Корзина'],
//         ['Оформить заказ']
//     ]).resize());
//     if (true) {
//         //ctx.stage.enter('startScene');
//     }

// });

// bot.help(async (ctx) => {

// });

// bot.hears("Каталог", Stage.enter('catalogScene'))

// bot.action(/^group_.*/, async (ctx) => {
//     let group = ctx.match[0].replace("group_", "");
//     try {
//         let items = await ms.GET('entity/product', {
//             filter: {
//                 pathName: { $contains: group }
//             }
//         }).then(res => res.rows)
//         for (let item of items) {
//             ctx.replyWithPhoto({ source: './downloads/' + item.name + ".jpg" }, { caption: item.name });
//         }
//     } catch (error) {
//         console.log(e);
//     }
// })