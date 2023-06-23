import "jsbridge"
import { common } from "../js/common"

export function initialize () {
    var c1 = new common();
    c1.showHelloWorld();
}