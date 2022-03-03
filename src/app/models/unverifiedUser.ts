export interface UnverifiedUser{
    _id?:any
    userName:String,
    userSurname:String,
    password?: String,
    passwordConfirm?:String,
    email: String,
    phoneNumber: String,
    IDNumber: String,
    Province:String,
     RegistrationReceipt:{payementOption:String,RefCode?:String,PollUrl?:String,dateOfupload:Date}
}