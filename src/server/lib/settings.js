/** settings to configure the behaviuor of the application */
module.exports = {
    /** name of the application  */
    name: 'ciclismean',
    /** port where we are listening */
    port: 3030,
    /** url with credentials to connect with mongodb */
    mongoUrl: "mongodb://ciclismania:agorabinaria@46.101.153.31:3017/ciclismania",
    /** logging level: debug | production */
    logMode: "debug",
     /** cache mode: off | on */
    cacheMode: "off"
};
