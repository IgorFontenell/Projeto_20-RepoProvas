"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(error, request, response, next) {
    if (error.type === "unauthorized")
        return response.status(401).send(error.message);
    if (error.type === "not_found")
        return response.status(404).send(error.message);
    if (error.type === "not_acceptable")
        return response.status(406).send(error.message);
    if (error.type === "unprocessable_entity")
        return response.status(422).send(error.message);
    response.status(500).send("Server error");
    // internal server error
}
exports.default = errorHandler;
