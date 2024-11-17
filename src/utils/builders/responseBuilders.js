class responseBuilder {
    response = {
        ok: false,
        message: '',
        status: 100,
        payload: {}
    }
setOK(ok) {
    this.response.ok = ok;
    return this;
}
stStatus(status) {
    this.response.status = status;
    return this;
}
setMessage(message) {
    this.response.message = message;
    return this;
}
setPayload(payload) {
    this.response.payload = payload;
    return this;
}
build() {
    return this.response;
}
}