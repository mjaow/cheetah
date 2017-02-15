module.exports = class FileItem {
    constructor(fname, fpath,encode_path,ftype) {
        this.fname = fname;
        this.fpath = fpath;
        this.encode_path = encode_path;
        this.ftype=ftype;
    }

    toString() {
        return 'fileItem:(fname:' + this.fname + ',fpath:' + this.fpath + ',encode_path' + this.encode_path +',ftype'+this.ftype +')';
    }
}