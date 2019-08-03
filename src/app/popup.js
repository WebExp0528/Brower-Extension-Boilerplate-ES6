import { selector } from "utils/Selector.js";
import { runtime } from "utils/Runtime.js";

import "styles/popup.scss";

class Popup {
    constructor() {
        this._port;
        selector(document).ready(this.bind());
    }

    /**
     * Document Ready
     */
    bind() {
        this.init();
    }

    /**
     * Initialize Function
     */
    init() {
        //Add Message Listener: Handles messages from Background Script
        this._port = runtime.api("extension").connect({
            name: "Sample Communication"
        });
        this._port.onMessage.addListener(msg => this.onMessage(msg));

        // Send Message to Background Script
        this._port.postMessage("This is Popup JS");
    }

    /**
     * Handles messages from background.js
     *
     * @param {string} msg
     */
    onMessage(msg) {
        console.log("message recieved" + msg);
    }

    /**
     * Send messages from popup.js to background.js
     *
     * @param {object} msg
     */
    sendMsgToBg(msg) {
        this._port.postMessage(msg);
    }
}

export const popup = new Popup();
