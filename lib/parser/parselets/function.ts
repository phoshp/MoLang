import { TToken } from '../../tokenizer/token'
import { Parser } from '../parse'
import { IInfixParselet } from './infix'
import { IExpression } from '../expression'
import { FunctionExpression } from '../expressions/function'

export class FunctionParselet implements IInfixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, left: IExpression, token: TToken) {
		const args: IExpression[] = []

		if (!left.setFunctionCall)
			throw new Error(
				`${left.type ? left.type + ' ' : ''}Expression ${
					!left.type ? `"${left.eval()}" ` : ''
				}is not callable!`
			)
		left.setFunctionCall(true)

		if (!parser.match('RIGHT_PARENT')) {
			do {
				args.push(parser.parseExpression())
			} while (parser.match('COMMA'))
			parser.consume('RIGHT_PARENT')
		}

		return new FunctionExpression(left, args)
	}
}
