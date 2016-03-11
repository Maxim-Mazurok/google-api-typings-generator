/// <reference path="../src/google-api-typings-generator.ts" />
"use strict";
var google_api_typings_generator_ts_1 = require("../src/google-api-typings-generator.ts");
require("jasmine");
var _ = require("lodash");
var assert = require('assert');
describe("version parser", function () {
    var expectations = {
        "v1": "1",
        "v1.1": "1.1",
        "v1.1beta1": "1.1-beta1"
    };
    _.forEach(expectations, function (expected, given) {
        it("should parse: " + given, function () {
            assert.equal(google_api_typings_generator_ts_1.App.parseVersion(given), expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0cy90ZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrREFBK0Q7O0FBRS9ELGdEQUFvQix3Q0FBd0MsQ0FBQyxDQUFBO0FBQzdELFFBQU8sU0FBUyxDQUFDLENBQUE7QUFDakIsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDNUIsSUFBWSxNQUFNLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFakMsUUFBUSxDQUFDLGdCQUFnQixFQUFFO0lBQ3ZCLElBQUksWUFBWSxHQUFHO1FBQ2YsSUFBSSxFQUFFLEdBQUc7UUFDVCxNQUFNLEVBQUUsS0FBSztRQUNiLFdBQVcsRUFBRSxXQUFXO0tBQzNCLENBQUE7SUFFRCxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxVQUFDLFFBQVEsRUFBRSxLQUFLO1FBQ3BDLEVBQUUsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLEVBQUU7WUFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQyxxQ0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vc3JjL2dvb2dsZS1hcGktdHlwaW5ncy1nZW5lcmF0b3IudHNcIiAvPlxyXG5cclxuaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4uL3NyYy9nb29nbGUtYXBpLXR5cGluZ3MtZ2VuZXJhdG9yLnRzXCI7XHJcbmltcG9ydCBcImphc21pbmVcIjtcclxuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCAqIGFzIGFzc2VydCBmcm9tICdhc3NlcnQnO1xyXG5cclxuZGVzY3JpYmUoXCJ2ZXJzaW9uIHBhcnNlclwiLCAoKSA9PiB7XHJcbiAgICB2YXIgZXhwZWN0YXRpb25zID0ge1xyXG4gICAgICAgIFwidjFcIjogXCIxXCIsXHJcbiAgICAgICAgXCJ2MS4xXCI6IFwiMS4xXCIsXHJcbiAgICAgICAgXCJ2MS4xYmV0YTFcIjogXCIxLjEtYmV0YTFcIlxyXG4gICAgfVxyXG5cclxuICAgIF8uZm9yRWFjaChleHBlY3RhdGlvbnMsIChleHBlY3RlZCwgZ2l2ZW4pID0+IHtcclxuICAgICAgICBpdChcInNob3VsZCBwYXJzZTogXCIgKyBnaXZlbiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBhc3NlcnQuZXF1YWwoQXBwLnBhcnNlVmVyc2lvbihnaXZlbiksIGV4cGVjdGVkKTtcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG59KTsiXX0=