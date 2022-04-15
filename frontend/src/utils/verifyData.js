/**
 * 校验数据
 */

/**
 *
 * @param {*} data 待校验数据
 * @param {object} options 配置对象
 * @param {boolean} [options.required=true] 是否必须有数据
 * @param {'string' | 'number' | 'boolean' | Function | Array | Object } options.dataType 数据类型
 * @param {number} options.minLength (字符串)最长限度
 * @param {number} options.maxLength (字符串)最低限度
 * @param {RegExp} options.regex (字符串)正则表达式
 * @param {number} options.min (数字)最大限度
 * @param {number} options.max (数字)最小限度
 * @param {object} [options.errorMessages={}] 错误信息
 * @returns {[boolean, undefined] | [boolean, object]} 是否正确, 错误信息
 */
export default function verifyData(
	data,
	options = {
		required: true,
		errorMessages: {},
	},
) {
	// 设置默认值
	if (options.required === undefined) {
		options.required = true;
	}
	if (options.errorMessages === undefined) {
		options.errorMessages = {};
	}

	// 无需校验
	const noNeedVerify = data === undefined && options.required === false;
	if (noNeedVerify) {
		return [true, undefined];
	}

	if (options.required && data === undefined) {
		return [false, options.errorMessages.required || 'міндетті өріс'];
	}

	if (options.dataType) {
		// 基础数据类型
		if (['string', 'number', 'boolean'].includes(options.dataType)) {
			if (typeof data !== options.dataType) {
				return [false, options.errorMessages.dataType || 'дұрыс емес тип'];
			}
		} else {
			// 引用数据类型
			if (data instanceof options.dataType === false) {
				return [false, options.errorMessages.dataType || 'дұрыс емес тип'];
			}
		}
	}

	if (options.dataType === 'string') {
		if (options.minLength && data.length < options.minLength) {
			return [
				false,
				options.errorMessages.minLength || 'минималды ұзындығынан аз',
			];
		}

		if (options.maxLength && data.length > options.maxLength) {
			return [
				false,
				options.errorMessages.minLength || 'максималды ұзындығынан артық',
			];
		}

		if (options.regex && options.regex.test(data) === false) {
			return [false, options.errorMessages.regex || 'ережеге сәйкес емес'];
		}
	}

	if (options.dataType === 'number') {
		if (options.min && data < options.min) {
			return [false, options.errorMessages.min || 'минималды мәннен аз'];
		}

		if (options.max && data > options.max) {
			return [false, options.errorMessages.max || 'максималды мәннен артық'];
		}
	}

	return [true, undefined];
}
