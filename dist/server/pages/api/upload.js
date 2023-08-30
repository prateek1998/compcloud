"use strict";
(() => {
var exports = {};
exports.id = 39;
exports.ids = [39];
exports.modules = {

/***/ 730:
/***/ ((module) => {

module.exports = require("next/dist/server/api-utils/node.js");

/***/ }),

/***/ 3076:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 7441:
/***/ ((module) => {

module.exports = require("sharp");

/***/ }),

/***/ 6705:
/***/ ((module) => {

module.exports = import("formidable");;

/***/ }),

/***/ 6555:
/***/ ((module) => {

module.exports = import("uuid");;

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 6453:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   routeModule: () => (/* binding */ routeModule)
/* harmony export */ });
/* harmony import */ var next_dist_server_future_route_modules_pages_api_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6429);
/* harmony import */ var next_dist_server_future_route_modules_pages_api_module__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_pages_api_module__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7153);
/* harmony import */ var next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7305);
/* harmony import */ var private_next_pages_api_upload_index_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6258);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([private_next_pages_api_upload_index_ts__WEBPACK_IMPORTED_MODULE_3__]);
private_next_pages_api_upload_index_ts__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// @ts-ignore this need to be imported from next/dist to be external



const PagesAPIRouteModule = next_dist_server_future_route_modules_pages_api_module__WEBPACK_IMPORTED_MODULE_0__.PagesAPIRouteModule;
// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

// Re-export the handler (should be the default export).
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_api_upload_index_ts__WEBPACK_IMPORTED_MODULE_3__, "default"));
// Re-export config.
const config = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_api_upload_index_ts__WEBPACK_IMPORTED_MODULE_3__, "config");
// Create and export the route module that will be consumed.
const routeModule = new PagesAPIRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__/* .RouteKind */ .x.PAGES_API,
        page: "/api/upload",
        pathname: "/api/upload",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    userland: private_next_pages_api_upload_index_ts__WEBPACK_IMPORTED_MODULE_3__
});

//# sourceMappingURL=pages-api.js.map
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6258:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6705);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6555);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var sharp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7441);
/* harmony import */ var sharp__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sharp__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([formidable__WEBPACK_IMPORTED_MODULE_0__, uuid__WEBPACK_IMPORTED_MODULE_2__]);
([formidable__WEBPACK_IMPORTED_MODULE_0__, uuid__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





let filePath = "./uploads";
const config = {
    api: {
        bodyParser: false
    }
};
const readFile = (req, saveLocally)=>{
    const options = {};
    if (saveLocally) {
        options.uploadDir = path__WEBPACK_IMPORTED_MODULE_1___default().join(filePath);
        options.filename = (name, ext, path, form)=>{
            let fileExt = path.originalFilename?.split(".")[1];
            return (0,uuid__WEBPACK_IMPORTED_MODULE_2__.v4)() + "." + fileExt;
        //Date.now().toString() + "_" + path.originalFilename
        };
    }
    options.maxFileSize = 4000 * 1024 * 1024;
    const form = (0,formidable__WEBPACK_IMPORTED_MODULE_0__["default"])(options);
    return new Promise((resolve, reject)=>{
        form.parse(req, async (error, fields, files)=>{
            let fileExt = fields.fileExt[0];
            let quality = fields.fileQuality[0];
            let newFilePath = path__WEBPACK_IMPORTED_MODULE_1___default().join(filePath, (0,uuid__WEBPACK_IMPORTED_MODULE_2__.v4)() + "." + fileExt);
            let info = await sharp__WEBPACK_IMPORTED_MODULE_4___default()(files.images[0].filepath).webp({
                quality: Number(quality)
            }).toFile(newFilePath); // (err, info) => { console.log(info) });
            info["originalSize"] = files.images[0].size;
            info["filePath"] = newFilePath;
            if (error) reject(error);
            resolve({
                fields,
                files,
                fileDetails: info
            });
        });
    });
};
const handler = async (req, res)=>{
    if (req.method === "POST") {
        // step 1: check images folder exist or not
        const isUploadDirExist = (0,fs__WEBPACK_IMPORTED_MODULE_3__.existsSync)(filePath);
        if (!isUploadDirExist) {
            fs__WEBPACK_IMPORTED_MODULE_3___default().mkdirSync(filePath);
        }
        // step 2: upload images to this folder then we need to compress this images
        let { fileDetails } = await readFile(req, false).catch((err)=>{
            console.log("error in conversion", err);
        });
        let respData = {
            success: 1,
            data: {
                originalSize: fileDetails.originalSize,
                finalSize: fileDetails.size,
                filePath: fileDetails.filePath,
                height: fileDetails.height,
                width: fileDetails.width
            }
        };
        return res.send(respData);
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [172], () => (__webpack_exec__(6453)));
module.exports = __webpack_exports__;

})();