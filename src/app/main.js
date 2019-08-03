import { selector } from "utils/Selector.js";
import "styles/main.scss";

/**
 * Define content script functions
 * @type {class}
 */
class Main {
    constructor() {
        selector(document).ready(this.bind());
    }

    /**
     * Document Ready
     * @returns {void}
     */
    bind() {}

    /**
     * Sends message to Background Script
     */

    // runtime.api("runtime").sendMessage({
    //     type: MSG_MAINMENU,
    //     options: {
    //       email: Base._iSDK.User.getEmailAddress(),
    //       url: URL_FOLLOWUPS
    //     }
    //   });
}

export const main = new Main();
