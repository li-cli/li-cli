import { hasOwn } from "@vue/shared"

export const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
        // 取值时要访问 setupState props data
        const { setupState, props, data } = instance
        if (key[0] == '$') {
            return //不能访问 $ 开头的
        }
        if (hasOwn(setupState, key)) {
            return setupState[key]
        } else if (hasOwn(data, key)) {
            return data[key]
        } else if (hasOwn(props, key)) {
            return props[key]
        } else {
            return undefined
        }
    },
    set({ _: instance }, key, value) {
        const { setupState, props, data } = instance
        if (hasOwn(setupState, key)) {
            setupState[key]=value
        } else if (hasOwn(props, key)) {
            props[key]=value
        } else if (hasOwn(data, key)) {
            data[key]=value
        }
        return true
    }
}