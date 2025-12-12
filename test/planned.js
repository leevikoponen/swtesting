import assert from "node:assert/strict";
import test from "node:test";

import capitalize from "software-testing-assignment/src/capitalize.js";
import chunk from "software-testing-assignment/src/chunk.js";

test.suite("pre planned functions", () => {
	test.suite("chunk.js", () => {
		test("expected usage", () =>
			assert.equal(chunk([1, 2, 3, 4], 2), [
				[1, 2],
				[3, 4],
			]));

		test("single chunks", () =>
			assert.equal(chunk([1, 2, 3], [[1], [2], [3]])));

		test("size mismatch", () =>
			assert.equal(chunk([1, 2, 3], 2), [[1, 2], [3]]));

		test("empty input", () => assert.equal(chunk([]), []));

		test("not integer", () => assert.equal(chunk([1, 2], 1.001), [[1], [2]]));

		test("not array", () => assert.equal(chunk({}), []));
	});

	test.suite("capitalize.js", () => {
		test("lowercase word", () => assert.equal(capitalize("apple"), "Apple"));

		test("whole sentence", () =>
			assert.equal(capitalize("fresh fruits"), "Fresh fruits"));

		test("capital casing", () =>
			assert.equal(capitalize("CUCUMBER"), "Cucumber"));

		test("empty case", () => assert.equal(capitalize(""), ""));

		test("already capitalized", () => assert.equal(capitalize("Car"), "Car"));

		test("unicode emoji", () => assert.equal(capitalize("😀"), "😀"));

		test("invalid input", () => assert.equal(capitalize({}), ""));
	});
});
