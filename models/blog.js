/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

// Validate Function to check blog title length
let titleLengthChecker = (title) => {
  // Check if blog title exists
  if (!title) {
    return false; // Return error
  } else {
    // Check the length of title
    if (title.length < 5 || title.length > 50) {
      return false; // Return error if not within proper length
    } else {
      return true; // Return as valid title
    }
  }
};

// Validate Function to check if valid title format
let alphaNumericTitleChecker = (title) => {
  // Check if title exists
  if (!title) {
    return false; // Return error
  } else {
    // Regular expression to test for a valid title
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    return regExp.test(title); // Return regular expression test results (true or false)
  }
};

// Array of Title Validators
const titleValidators = [
  // First Title Validator
  {
    validator: titleLengthChecker,
    message: 'Title must be more than 5 characters but no more than 50'
  },
  // Second Title Validator
  {
    validator: alphaNumericTitleChecker,
    message: 'Title must be alphanumeric'
  }
];

// Validate Function to check body length
let bodyLengthChecker = (body) => {
  // Check if body exists
  if (!body) {
    return false; // Return error
  } else {
    // Check length of body
    if (body.length < 5 || body.length > 500) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid body
    }
  }
};

 //JobNo length checker
let JobNoLengthChecker = (JobNo) => {
  // Check if JobNo exists
  if (!JobNo) {
    return false; // Return error
  } else {
    // Check length of JobNo
    if (JobNo.length < 5 || JobNo.length > 5) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid JobNo
    }
  }
};
let NumericCheckerJobNo = (JobNo) => {
  // Check if title exists
  if (!JobNo) {
    return false; // Return error
  } else {
    // Regular expression to test for a valid title
    const regExp = new RegExp(/^[0-9]+$/);
    return regExp.test(JobNo); // Return regular expression test results (true or false)
  }
};

const JobNoValidators =[
  {
    validator: JobNoLengthChecker,
    message: 'JobNo must be only 5 characters.'
  },
  {
    validator: NumericCheckerJobNo,
    message: 'JobNo must be numeric.'
  }
]

//Client Checkers
let ClientLengthChecker = (Client) => {
  // Check if Client exists
  if (!Client) {
    return false; // Return error
  } else {
    // Check length of Client
    if (Client.length < 3 || Client.length > 25) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid Client
    }
  }
};
let AlphaNumericCheckerClient = (Client) => {
  // Check if Client exists
  if (!Client) {
    return false; // Return error
  } else {
    // Regular expression to test for a valid Client
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    return regExp.test(Client); // Return regular expression test results (true or false)
  }
};

const ClientValidators =[
  {
    validator: ClientLengthChecker,
    message: 'Client must be more than 3 characters but no more than 25'
  },
  {
    validator: AlphaNumericCheckerClient,
    message: 'Clien must be alphanumeric.'
  }
]
//RoadWidth checkers
let RoadWidthLengthChecker = (RoadWidth) => {
  // Check if RoadWidth exists
  if (!RoadWidth) {
    return false; // Return error
  } else {
    // Check length of RoadWidth
    if (RoadWidth.length < 1 || RoadWidth.length > 4) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid RoadWidth
    }
  }
};
let NumericCheckerRoadWidth = (RoadWidth) => {
  // Check if title exists
  if (!RoadWidth) {
    return false; // Return error
  } else {
    // Regular expression to test for a valid title
    const regExp = new RegExp(/^\d*\.?\d*$/);
    return regExp.test(RoadWidth); // Return regular expression test results (true or false)
  }
};

const RoadWidthValidators =[
  {
    validator: RoadWidthLengthChecker,
    message: 'Client must be more than 1 characters but no more than 4'
  },
  {
    validator: NumericCheckerRoadWidth,
    message: 'RoadWidth must be numeric.'
  }
]

//Volume checkers

let VolumeLengthChecker = (Volume) => {
  // Check if Volume exists
  if (!Volume) {
    return false; // Return error
  } else {
    // Check length of Volume
    if (Volume.length < 1 || Volume.length > 4) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid Volume
    }
  }
};

let NumericCheckerVolume = (Volume) => {
  // Check if Volume exists
  if (!Volume) {
    return false; // Return error
  } else {
    // Regular expression to test for a valid Volume
    const regExp = new RegExp(/^\d*\.?\d*$/);
    return regExp.test(Volume); // Return regular expression test results (true or false)
  }
};

const VolumeValidators =[
  {
    validator: VolumeLengthChecker,
    message: 'Volume must be more than 3 characters but no more than 25.'
  },
  {
    validator: NumericCheckerVolume,
    message: 'Volume must be numeric.'
  }
]

let AddressLengthChecker = (Address) => {
  // Check if Address exists
  if (!Address) {
    return false; // Return error
  } else {
    // Check length of Address
    if (Address.length < 10 || Address.length > 200) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid Address
    }
  }
};

const AddressValidators =[
  {
    validator: AddressLengthChecker,
    message: 'Address must be more than 10 characters but no more than 200.'
  }
]

// Array of Body validators
const bodyValidators = [
  // First Body validator
  {
    validator: bodyLengthChecker,
    message: 'Body must be more than 5 characters but no more than 500.'
  }
];

// Validate Function to check comment length
let commentLengthChecker = (comment) => {
  // Check if comment exists
  if (!comment[0]) {
    return false; // Return error
  } else {
    // Check comment length
    if (comment[0].length < 1 || comment[0].length > 200) {
      return false; // Return error if comment length requirement is not met
    } else {
      return true; // Return comment as valid
    }
  }
};

// Array of Comment validators
const commentValidators = [
  // First comment validator
  {
    validator: commentLengthChecker,
    message: 'Comments may not exceed 200 characters.'
  }
];

// Blog Model Definition
const blogSchema = new Schema({
  title: { type: String, required: true, validate: titleValidators },
  body: { type: String, required: true, validate: bodyValidators },
  JobNo: { type: String, required: true, validate:JobNoValidators},
  Client: {type:String, required: true, validate:ClientValidators},
  StartDate:{type:String, required: true},
  SpeedOfRoad:{type:String, required: true},
  RoadWidth:{type:String, required: true, validate:RoadWidthValidators},
  CarriagewayType:{type:String,required: true},
  RoadLevel:{type:String,required: true},
  Volume:{type:String,required:true, validate:VolumeValidators},
  WorksType:{type:String,required:true},
  WorksHours:{type:String,required:true},
  LocationOnRoad:{type:String,required:true},
  TypeOfTrafficCR:{type:String,required:true},
  Address:{type:String,required:true, validate:AddressValidators},
  LocationMap:{type:String},
  LicenceRequired:{type:String, required:true},
  close: {type:Boolean, default:false},
  path:{type:Array},
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  likedBy: { type: Array },
  dislikes: { type: Number, default: 0 },
  dislikedBy: { type: Array },
  comments: [{
    comment: { type: String, validate: commentValidators },
    commentator: { type: String },
    attachements:{ type:Array },
    createdTime: { type: Date, default: Date.now }
  }]
});

// Export Module/Schema
module.exports = mongoose.model('Blog', blogSchema);
