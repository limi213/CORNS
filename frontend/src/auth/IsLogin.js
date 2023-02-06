const IsLogin = () => {
    return Boolean(sessionStorage.getItem("accessToken"))
}

export default IsLogin;