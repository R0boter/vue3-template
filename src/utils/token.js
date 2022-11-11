const TokenKey = 'Web-Token'

export const getToken = () => {
	return localStorage.getItem(TokenKey)
}

export const setToken = (token) => {
	return localStorage.setItem(TokenKey, token)
}

export const removeToken = () => {
	return localStorage.remove(TokenKey)
}
