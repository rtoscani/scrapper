
module.exports = {
    searchs: [
        {
            name: "RTX 3080",
            text: "rtx 3080",
        },
        {
            name: "RTX 3070",
            text: "rtx 3070",
        },
    ],
    notification: {
        enabled: false,
        title: "Found stock of ",
        webhookUrl: "",
    },
    cron: {
        enabled: true,
        pattern: "* * * * *",
    },
    stores: [
        {
            name: "Compragamer",
            siteParameters: {
                baseUrl: "https://compragamer.com",
                searchUrl: "/index.php?criterio={0}&x=0&y=0&seccion=3&nro_max=50",
                isAlwaysAvailable: false,
                isNotAvailableText: "sin stock",
            },
            paginatorParameters: {
                hasPaginator: false,
            },
            selectorParameters: {
                product: ".products__wrap",
                name: ".products__name",
                price: ".products__price-new",
                offerPrice: null,
                availability: ".products-btns__add",
                link: ".products__name a",
                linkElement: "href",
            }
        },
        {
            name: "Gezatek",
            siteParameters: {
                baseUrl: "https://www.gezatek.com.ar/",
                searchUrl: "/tienda/?busqueda={0}",
                isAlwaysAvailable: false,
                isNotAvailableText: "sin stock",
            },
            paginatorParameters: {
                hasPaginator: false,
            },
            selectorParameters: {
                product: ".product",
                name: "h2 a",
                price: ".w-footer .precio_web",
                offerPrice: null,
                availability: ".no_hay_stock",
                link: "h2 a",
                linkElement: "href",
            }
        }
    ]
}