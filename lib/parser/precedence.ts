export enum EPrecedence {
	SCOPE = 1,
	STATEMENT,
	PROPERTY_ACCESS,
	ARRAY_ACCESS,

	ASSIGNMENT,
	CONDITIONAL,

	NULLISH_COALESCING,

	AND,
	OR,

	COMPARE,

	SUM,
	PRODUCT,
	EXPONENT,

	PREFIX,
	POSTFIX,
	FUNCTION,
}
