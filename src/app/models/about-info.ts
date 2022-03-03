export interface AboutInfo {
  _id?: any;
  MainHeader?: String;
  Icon?: String;
  InbedLogo?: Boolean;
  Info?: {
    SubHeader?: String;
    SubParagraph?: String;
    SubInfo?:  {
      Header?: String;
      Info?: String[];
    }[
    ];
  }[];
}
