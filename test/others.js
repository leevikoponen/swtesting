import assert from "node:assert/strict";
import test from "node:test";

import defaultTo from "../src/defaultTo.js";
import eq from "../src/eq.js";
import filter from "../src/filter.js";
import get from "../src/get.js";
import isEmpty from "../src/isEmpty.js";
import map from "../src/map.js";
import reduce from "../src/reduce.js";
import toNumber from "../src/toNumber.js";

test.suite("other prioritized functions", () => {
	test.suite("defaultTo.js", () => {
		test("invalid number", () =>
			assert.equal(defaultTo(Number.parseInt("", 10), 0), 0));

		test("null value", () => assert.equal(defaultTo(null, 0), 0));

		test("missing field", () => assert.equal(defaultTo({}.foo, 0), 0));

		test("has existing value", () => assert.equal(defaultTo(0, 1), 0));
	});

	test.suite("eq.js", () => {
		test("matching string", () => assert(eq("example", "example"), true));

		test("mismatched string", () => assert(!eq("example", "something else")));

		test("empty string", () => assert(!eq("example", "")));
	});

	test.suite("isEmpty.js", () => {
		test("undefined value", () => assert(isEmpty(undefined)));

		test("empty string", () => assert(isEmpty("")));

		test("empty array", () => assert(isEmpty([])));

		test("string with content", () => assert(!isEmpty("example")));
	});

	test.suite("toNumber.js", () => {
		test("already number", () => assert.equal(toNumber(1), 1));

		test("needs parsing", () => assert.equal(toNumber("1.1"), 1.1));

		test("some text", () => assert(Number.isNaN(toNumber("text"))));
	});

	const products = [
		{
			name: "cabbage",
			price: 1,
		},
		{
			name: "cucumber",
			price: 3,
		},
		{
			name: "ground beef",
			price: 10,
		},
	];

	test.suite("filter.js", () => {
		test("some match", () =>
			assert.equal(filter(products, (product) => product.price < 5).length, 2));

		test("nothing matches", () =>
			assert.equal(filter(products, () => false).length, 0));

		test("all match", () =>
			assert.equal(
				filter(products, (product) => product.price < 100).length,
				products.length,
			));

		test("empty case", () => assert.equal(filter([], () => true).length, 0));
	});

	test.suite("get.js", () => {
		test("gets object field", () =>
			assert.equal(get(products[0], "name"), products[0].name));

		test("uses default value", () =>
			assert.equal(get(products[0], "category", "unknown"), "unknown"));
	});

	test.suite("map.js", () => {
		test("collects product names", () =>
			assert.deepEqual(
				map(products, ({ name }) => name),
				["cabbage", "cucumber", "ground beef"],
			));
	});

	test.suite("reduce.js", () => {
		test("collects total price", () =>
			assert.equal(
				reduce(products, (sum, { price }) => sum + price, 0),
				1 + 3 + 10,
			));

		test("empty list returns initial", () =>
			assert.equal(
				reduce([], (total) => total + 20, 10),
				10,
			));
	});
});
