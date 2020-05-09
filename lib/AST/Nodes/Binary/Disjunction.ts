import { BinaryNode, testBinaryHelper } from '../../ASTNode'

export class DisjunctionNode extends BinaryNode {
	type = 'MoLang.DisjunctionNode'
	constructor(getSplitStrings: () => string[]) {
		super('||', getSplitStrings)
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: val1 || val2,
		}
	}
}

export function testDisjunction(expression: string) {
	const { isCorrectToken, getSplitStrings } = testBinaryHelper(
		expression,
		'||'
	)
	if (isCorrectToken)
		return new DisjunctionNode(<() => string[]>getSplitStrings)
}
