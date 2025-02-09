import type { ComponentType, createElement as createElementType } from 'react'
import { createElement } from 'react'

export function renderIcon(Icon: ComponentType<{ className?: string }>, className: string = '') {
	return createElement(Icon, { className })
}
