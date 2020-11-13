
module.exports = {
    searchs: [
        {
            name: "RTX 3090",
            text: "rtx 3090",
            shouldContain: ".*rtx.*3090.*",
            webhookUrl: "",
        },
        {
            name: "RTX 3080",
            text: "rtx 3080",
            shouldContain: ".*rtx.*3080.*",
            webhookUrl: "",
        },
        {
            name: "RTX 3070",
            text: "rtx 3070",
            shouldContain: ".*rtx.*3070.*",
            webhookUrl: "",
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
            enabled: true,
            siteParameters: {
                baseUrl: "https://compragamer.com",
                searchUrl: "/index.php?criterio={0}&x=0&y=0&seccion=3&nro_max=50",
                isAlwaysAvailable: false,
                isNotAvailableText: "sin stock",
            },
            selectorParameters: {
                product: ".products__wrap",
                name: ".products__name",
                price: ".products__price-new",
                availability: ".products-btns__add",
                link: ".products__name a",
                linkElement: "href",
            }
        },
        {
            name: "Gezatek",
            enabled: true,
            siteParameters: {
                baseUrl: "https://www.gezatek.com.ar",
                searchUrl: "/tienda/?busqueda={0}",
                isAlwaysAvailable: false,
                isNotAvailableText: "sin stock",
            },
            selectorParameters: {
                product: ".product",
                name: "h2 a",
                price: ".w-footer .precio_web",
                availability: ".no_hay_stock",
                link: "h2 a",
                linkElement: "href",
            }
        },
        {
            name: "Venex",
            enabled: true,
            siteParameters: {
                baseUrl: "https://www.venex.com.ar",
                searchUrl: "/resultado-busqueda.htm?keywords={0}",
                isAlwaysAvailable: false,
                isNotAvailableText: "SIN STOCK",
            },
            selectorParameters: {
                product: ".product-box",
                name: ".product-box-title",
                price: ".current-price",
                availability: ".label-no-stock",
                link: ".product-box-overlay",
                linkElement: "href",
            }
        },
        {
            name: "Maximus",
            enabled: true,
            siteParameters: {
                baseUrl: "https://www.maximus.com.ar",
                searchUrl: "/ARTICULOS/m=0/OR=1/BUS={0};/maximus.aspx",
                isAlwaysAvailable: true,
            },
            selectorParameters: {
                product: ".product",
                name: ".titprod",
                price: ".price",
                link: ".titprod",
                linkElement: "href",
            }
        },
        {
            name: "Exxa",
            enabled: true,
            siteParameters: {
                baseUrl: "https://exxa.com.ar",
                searchUrl: "/search/?q={0}",
                isAlwaysAvailable: false,
                isNotAvailableText: "SIN STOCK",
            },
            selectorParameters: {
                product: ".product-item",
                name: ".title h3",
                price: "#price_display",
                availability: ".out-of-stock p",
                link: ".title h3 a",
                linkElement: "href",
            }
        },
        {
            name: "Mexx",
            enabled: true,
            siteParameters: {
                baseUrl: "https://www.mexx.com.ar",
                searchUrl: "/buscar/?p={0}",
                isAlwaysAvailable: true,
                isNotAvailableText: "SIN STOCK",
            },
            selectorParameters: {
                product: ".card-ecommerce",
                name: ".card-title",
                price: ".price h4 b",
                link: ".card-title a",
                linkElement: "href",
            }
        },
    ]
}