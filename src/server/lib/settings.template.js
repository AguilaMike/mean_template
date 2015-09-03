/** settings to configure the behaviuor of the application 
 * rename to settings.js
 */
module.exports = {
    /** name of the application  */
    name: 'mean_template',
    /** port where we are listening */
    port: 3030,
    /** url with credentials to connect with mongodb */
    mongoUrl: "mongodb://127.0.0.1:27017/mean",
    /** logging level: debug | production */
    logMode: "debug",
<<<<<<< HEAD:src/server/lib/settings.js
     /** cache mode: off | on */
    cacheMode: "off", 
    /** key to sign tokens */
    secret:"academia-binaria"
};
=======
    /** cache mode: off | on */
    cacheMode: "off"
};
>>>>>>> 7b8e1e8fb18b727447d82b384d75a42b392e5ebb:src/server/lib/settings.template.js
