const TokenKey = 'Web-Token'

export const getToken = () => {
	return localStorage.get(TokenKey)
}

export const setToken = (token) => {
	return localStorage.set(TokenKey, token)
}

export const removeToken = () => {
	return localStorage.remove(TokenKey)
}
