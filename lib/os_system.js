var os = require('os');

module.exports = class OsSystem {

    static isLinux() {
        return os.type()==="linux";
    }

    static isMac(){
        return os.type()==="Darwin";
    }

    static isWindows(){
        return os.type()==="Windows_NT";
    }
}