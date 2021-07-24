function isUserConnected() {
    const cookie = document.cookie;
    const cookieKeyValue = cookie.split(/[;= ]+/);
    const userTokenIndex = cookieKeyValue.indexOf('userToken');
    const userToken = cookieKeyValue[userTokenIndex + 1];

    return !!userToken;
}
