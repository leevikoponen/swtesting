import assert from "node:assert/strict";
import test from "node:test";

import capitalize from "../src/capitalize.js";
import chunk from "../src/chunk.js";

test.suite("llm created tests", () => {
	test.suite("chunk.js", () => {
		test("splits evenly with size=2", () => {
			const input = ["a", "b", "c", "d"];
			const result = chunk(input, 2);
			assert.deepEqual(result, [
				["a", "b"],
				["c", "d"],
			]);
		});

		test("final chunk contains remaining elements when not divisible", () => {
			const input = ["a", "b", "c", "d"];
			const result = chunk(input, 3);
			assert.deepEqual(result, [["a", "b", "c"], ["d"]]);
		});

		test("default size=1 when omitted", () => {
			const input = [1, 2, 3];
			const result = chunk(input);
			assert.deepEqual(result, [[1], [2], [3]]);
		});

		test("size larger than array length returns single chunk", () => {
			const input = [1, 2];
			const result = chunk(input, 10);
			assert.deepEqual(result, [[1, 2]]);
		});

		test("empty array returns empty array", () => {
			const input = [];
			const result = chunk(input, 3);
			assert.deepEqual(result, []);
		});

		test("size=0 treated as 1 (clamped)", () => {
			const input = ["x", "y", "z"];
			const result = chunk(input, 0);
			assert.deepEqual(result, [["x"], ["y"], ["z"]]);
		});

		test("negative size treated as 1 (clamped)", () => {
			const input = [1, 2, 3];
			const result = chunk(input, -2);
			assert.deepEqual(result, [[1], [2], [3]]);
		});

		test("non-integer size is floored", () => {
			const input = [1, 2, 3, 4, 5];
			const result = chunk(input, 2.7);
			assert.deepEqual(result, [[1, 2], [3, 4], [5]]);
		});

		test("handles sparse arrays by preserving holes", () => {
			const input = Array(3);
			input[0] = 1;
			input[2] = 3;

			const result = chunk(input, 2);

			assert.equal(result.length, 2);
			assert.equal(result[0].length, 2);
			assert.equal(0 in result[0], true);
			assert.equal(1 in result[0], false);
			assert.equal(result[0][0], 1);
			assert.equal(result[1].length, 1);
			assert.equal(0 in result[1], true);
			assert.equal(result[1][0], 3);
		});
	});

	test.suite("capitalize.js", () => {
		test('converts to "Fred" from "FRED"', () => {
			assert.equal(capitalize("FRED"), "Fred");
		});

		test("single character", () => {
			assert.equal(capitalize("f"), "F");
			assert.equal(capitalize("F"), "F");
		});

		test("mixed casing becomes first upper, rest lower", () => {
			assert.equal(capitalize("hElLo"), "Hello");
			assert.equal(capitalize("javaScript"), "Javascript");
		});

		test("empty string returns empty string", () => {
			assert.equal(capitalize(""), "");
		});

		test("undefined defaults to empty string", () => {
			assert.equal(capitalize(undefined), "");
		});

		test("handles whitespace and punctuation", () => {
			assert.equal(capitalize(" hello"), " hello");
			assert.equal(capitalize("!wow"), "!wow");
			assert.equal(capitalize("  aBC"), "  abc");
		});

		test("non-ASCII letters", () => {
			assert.equal(capitalize("ßMALL"), "ßmall");
			assert.equal(capitalize("åBÇ"), "Åbc");
		});
	});
});
