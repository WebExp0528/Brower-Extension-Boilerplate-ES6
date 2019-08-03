import "babel-polyfill";
import { runtime } from "utils/Runtime.js";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    transformRequest: [
        (data, headers) => {
            console.log("===== request header from client =====", headers);
            console.log("===== request data from client=====", data);
            return data;
        }
    ],
    transformResponse: [
        data => {
            let resp;

            try {
                resp = JSON.parse(data);
            } catch (error) {
                throw Error(
                    `[requestClient] Error parsing response JSON data - ${JSON.stringify(
                        error
                    )}`
                );
            }
            console.log("===== response data from server =====", resp);
            return resp;
        }
    ],
    timeout: 5000,
    validateStatus: status => {
        console.log("===== response status code from server =====", status);
        return status >= 200 && status < 300; // default
    }
});

/**
 * Define Background script functions
 * @type {class}
 */
class Background {
    constructor() {
        this.init();
    }

    /**
     * Document Ready
     * @returns {void}
     */
    init() {
        console.log("loaded Background Scripts");

        //when extension installed
        runtime
            .api("runtime")
            .onInstalled.addListener(() => this.onInstalled());

        //Add message listener in Browser.
        runtime
            .api("runtime")
            .onMessage.addListener((message, sender, reply) =>
                this.onMessage(message, sender, reply)
            );

        //Add message listener from Extension
        runtime
            .api("extension")
            .onConnect.addListener(port => this.onConnect(port));

        //Add Update listener for tab
        runtime
            .api("tabs")
            .onUpdated.addListener((tabId, changeInfo, tab) =>
                this.onUpdatedTab(tabId, changeInfo, tab)
            );
    }

    //TODO: Listeners
    /**
     * Extension Installed
     */
    onInstalled() {
        console.log("Installed Chrome Extension!");
    }

    /**
     * Handles Messages from contentscript
     *
     * @param { object } message
     * @param { object } sender
     * @param { object } reply
     */
    onMessage(message, sender, reply) {
        console.log("Received Message:", message);
        if (message.type == MSG_AUTH) {
        }
        return true;
    }

    /**
     * Connect with Extension
     *
     * @param {*} port
     */
    onConnect(port) {
        this._port = port;
        console.log("Connected .....");
        this._port.onMessage.addListener(msg =>
            this.onMessageFromExtension(msg)
        );
    }

    /**
     * Handles Messages from Extension
     *
     * @param {*} msg
     */
    onMessageFromExtension(msg) {
        console.log("message recieved:" + msg);
    }

    /**
     *Handle changed TabInfo
     *
     * @param {*} tabId
     * @param {*} changeInfo
     * @param {*} tab
     */
    onUpdatedTab(tabId, changeInfo, tab) {}

    // /**
    //  * API Call for checking Auth
    //  *
    //  * @param { object | email: string, timezone: string } param
    //  */
    // async checkAuth(param) {
    //     console.log("*****Checking Auth: ", API_CHECK_AUTH);
    //     try {
    //         const res = await axiosInstance.get(API_CHECK_AUTH, {
    //             params: param
    //         });
    //         return {
    //             isAuth: true
    //         };
    //     } catch (error) {
    //         return {
    //             isAuth: false
    //         };
    //     }
    // }
}

export const background = new Background();
