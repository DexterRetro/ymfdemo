export interface UnverifiedBlog{
    _id?:any;
    Author:String;
    CreatedOn:Date;
    Topic:String;
    Summary:String;
    Content:{paragraph:String,PImage:{ImbededImg:String,caption:String}}[];
    blogPicture:String
}