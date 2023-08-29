"use strict";
(() => {
var exports = {};
exports.id = 152;
exports.ids = [152];
exports.modules = {

/***/ 730:
/***/ ((module) => {

module.exports = require("next/dist/server/api-utils/node.js");

/***/ }),

/***/ 3076:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 9501:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderkind_PAGES_API_page_2Fapi_2Fupload_2Fcloud_preferredRegion_absolutePagePath_private_next_pages_2Fapi_2Fupload_2Fcloud_tsx_middlewareConfigBase64_e30_3D_),
  routeModule: () => (/* binding */ routeModule)
});

// NAMESPACE OBJECT: ./src/pages/api/upload/cloud.tsx
var cloud_namespaceObject = {};
__webpack_require__.r(cloud_namespaceObject);
__webpack_require__.d(cloud_namespaceObject, {
  "default": () => (handler)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/pages-api/module.js
var pages_api_module = __webpack_require__(6429);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(7153);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js
var helpers = __webpack_require__(7305);
;// CONCATENATED MODULE: external "@aws-sdk/client-s3"
const client_s3_namespaceObject = require("@aws-sdk/client-s3");
// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(7147);
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_);
;// CONCATENATED MODULE: ./src/pages/api/upload/cloud.tsx


const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET;
let filePath = "uploads/";
async function handler(req, res) {
    if (req.method === "POST") {
        let fileLink = req.body.filePath;
        if (!(0,external_fs_.existsSync)(fileLink)) {
            return res.status(200).json({
                status: 0,
                errorMsg: "File not found"
            });
        }
        let content = external_fs_default().readFileSync(fileLink);
        let fileName = fileLink.split("\\")[1];
        const command = new client_s3_namespaceObject.PutObjectCommand({
            Bucket: Bucket,
            Key: filePath + fileName,
            Body: content,
            ContentType: "image/jpeg"
        });
        let s3Client = new client_s3_namespaceObject.S3Client({
            region: region,
            credentials: {
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey
            }
        });
        const data = await s3Client.send(command);
        // console.log(data);
        let imageUrl = Bucket + "/" + filePath + fileName;
        return res.status(200).json({
            success: 1,
            data: {
                message: "successfully uploaded file to S3",
                location: imageUrl,
                path: fileLink
            }
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fupload%2Fcloud&preferredRegion=&absolutePagePath=private-next-pages%2Fapi%2Fupload%2Fcloud.tsx&middlewareConfigBase64=e30%3D!
// @ts-ignore this need to be imported from next/dist to be external



const PagesAPIRouteModule = pages_api_module.PagesAPIRouteModule;
// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

// Re-export the handler (should be the default export).
/* harmony default export */ const next_route_loaderkind_PAGES_API_page_2Fapi_2Fupload_2Fcloud_preferredRegion_absolutePagePath_private_next_pages_2Fapi_2Fupload_2Fcloud_tsx_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(cloud_namespaceObject, "default"));
// Re-export config.
const config = (0,helpers/* hoist */.l)(cloud_namespaceObject, "config");
// Create and export the route module that will be consumed.
const routeModule = new PagesAPIRouteModule({
    definition: {
        kind: route_kind/* RouteKind */.x.PAGES_API,
        page: "/api/upload/cloud",
        pathname: "/api/upload/cloud",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    userland: cloud_namespaceObject
});

//# sourceMappingURL=pages-api.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [172], () => (__webpack_exec__(9501)));
module.exports = __webpack_exports__;

})();