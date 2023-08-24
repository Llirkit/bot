const moySklad = require('moysklad');
const { Markup } = require('telegraf');

let pageLimit = 10

const ms = moySklad();
module.exports = {
    getMainCategoriesButtons: async function () {
        groups = await ms.GET('entity/productfolder').then(res => res.rows)
        let r = [];
        for (let row of groups) {
            if (row.pathName === "")
                r.push([Markup.button.callback(row.name, "category_" + row.name)]);
        }
        return r;
    },
    getItems: async function (page, group) {
        return await ms.GET('entity/product', {
            filter: {
                pathName: key = {
                    $contains: group
                },

            },
            limit: pageLimit,
            offset: pageLimit * page,
        }).then((res) => res.rows)
    }
}