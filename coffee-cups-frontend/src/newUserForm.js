class NewUserForm extends UserForm {
    static submitNewObj(e) {
        super.submitNewObj(e)
        let configObj = Object.assign({}, newObjConfigObj, UserForm.userConfigObjBody(e, signupFields))
        UserForm.fetchUser(USERS_URL, configObj, renderUserSignup)
    }
}