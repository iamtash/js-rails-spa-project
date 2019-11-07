class NewSessionForm extends UserForm {
    static submitNewObj(e) {
        super.submitNewObj(e)
        let configObj = Object.assign({}, newObjConfigObj, UserForm.userConfigObjBody(e, loginFields))
        UserForm.fetchUser(SESSIONS_URL, configObj, renderUserLogin)
    }
}
