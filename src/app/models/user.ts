export interface User {
  _id?: any;
  userName: String;
  userSurname: String;
  YMFID?:String;
  role?: String;
  extraRoles?:String;
  password?: String;
  passwordChangedAt?: Date;
  passwordConfirm?: String;
  passwordResetToken?: String;
  passwordResetExpires?: Date;
  email?: String;
  phoneNumber?: String;
  IDNumber: String;
  Province: String;
  ProfilePhoto?: string;
  Registered?:Boolean;
  RegistrationPollURL?:String;
  PaymentRecord?:[
    {PaymentPurpose:String,
      PaymentDate:Date,
      PaymentRef:String}];
  MembershipSubscriptionDate?:Date;
  MembershipExpireryDate?:Date;
  Notifications?:[{NotHeader:String,NotContent:String,NotExpirery:Date}];
}
