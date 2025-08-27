const express = require("express");
const { lookupList } = require("../../controllers/common/lookupController.js");

const router = express.Router();

router.post("/LookupList", lookupList);

module.exports = router;