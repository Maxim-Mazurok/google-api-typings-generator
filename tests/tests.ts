/// <reference path="../src/google-api-typings-generator.ts" />
/// <reference path="../out/typings/gapi.client.youtube-v3/gapi.client.youtube.d.ts" />
/// <reference path="../out/typings/gapi.client.gmail-v1/gapi.client.gmail.d.ts" />

import { App } from "../src/google-api-typings-generator.ts";
import "jasmine";
import * as _ from "lodash";
import * as assert from 'assert';


describe("version parser", () => {
    var expectations = {
        "v1": "1",
        "v1.2": "1.2",
        "v1.2beta3": "1.2-beta3",
        "vm_beta": "0-m_beta"
    }

    _.forEach(expectations, (expected, given) => {
        it("should parse: " + given, () => {
            assert.equal(App.parseVersion(given), expected);
        })
    });

});