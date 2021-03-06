import { Expression, IExpression } from '../expression'

export class StatementExpression extends Expression {
	type = 'StatementExpression'
	protected didReturn = false
	protected wasLoopBroken = false
	protected wasLoopContinued = false

	constructor(protected expressions: IExpression[]) {
		super()
	}

	get isReturn() {
		return this.didReturn
	}

	get isBreak() {
		if (this.wasLoopBroken) {
			this.wasLoopBroken = false
			return true
		}
		return false
	}
	get isContinue() {
		if (this.wasLoopContinued) {
			this.wasLoopContinued = false
			return true
		}
		return false
	}

	isStatic() {
		let i = 0
		while (i < this.expressions.length) {
			if (!this.expressions[i].isStatic()) return false
			i++
		}
		return true
	}

	eval() {
		this.didReturn = false
		this.wasLoopBroken = false
		this.wasLoopContinued = false
		let i = 0
		while (i < this.expressions.length) {
			let res = this.expressions[i].eval()

			if (this.expressions[i].isReturn) {
				this.didReturn = true
				return res
			} else if (this.expressions[i].isContinue) {
				this.wasLoopContinued = true
				return
			} else if (this.expressions[i].isBreak) {
				this.wasLoopBroken = true
				return
			}
			i++
		}
		return 0
	}

	getExpression() {
		return this.expressions[0]
	}
}
