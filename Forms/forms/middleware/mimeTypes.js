'use strict';

let mimetypes;

module.exports = class MimeTypes {
    constructor() {}

    mimetypes = {
        "image/jpeg": ".jpg",
        "image/gif": ".gif",
        "image/bmp": ".bmp",
        "image/tiff": ".tiff",
        "image/png": ".png"
    };

    getExtension = _mimeType => {
        console.log("** mimetype", _mimeType);
        if (_mimeType || typeof _mimeType !== 'undefined') {
             return this.mimetypes[_mimeType] ? this.mimetypes[_mimeType] : console.error('MIME Type not found!');
        }
    }
}