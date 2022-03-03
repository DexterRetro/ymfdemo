export interface BlogPost {
  _id?: any;
  Author: String;
  Topic: any;
  CreatedOn: Date;
  blogPicture: String;
  Summary: String;
  AuthorTittle: String;
  Content: [{paragraph:String,PImage:{ImbededImg:String,caption:String}}];
  Comments: [
    {
      commentor: String;
      commentedOn: String;
      Comment: String;
    }
  ];
}
