/** settings to configure the behaviuor of the application */
module.exports = {
    /** name of the application  */
    name: 'template',
    /** port where we are listening */
    port: 3030,
    /** url with credentials to connect with mongodb */
    mongoUrl: "mongodb://academiabinaria:academiabinaria@ds039311.mongolab.com:039311/academiabinaria",
    /** logging level: debug | production */
    logMode: "debug",
     /** cache mode: off | on */
    cacheMode: "off"
};
