/// <reference path="../src/google-api-typings-generator.ts" />

import { App } from "../src/google-api-typings-generator.ts";
import "jasmine";
import * as _ from "lodash";
import * as assert from 'assert';

describe("version parser", () => {
    var expectations = {
        "v1": "1",
        "v1.1": "1.1",
        "v1.1beta1": "1.1-beta1"
    }

    _.forEach(expectations, (expected, given) => {
        it("should parse: " + given, () => {
            assert.equal(App.parseVersion(given), expected);
        })
    });

});