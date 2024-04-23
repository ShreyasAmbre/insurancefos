import { Validators } from "@angular/forms";

//Form validations

export var requiredValidation = [
  Validators.required,
]

export var phoneNumberValidation = [
  Validators.required,
  Validators.pattern(/^[6-9]\d{9}$/),
  Validators.maxLength(10),
  Validators.minLength(10),
]

export var policyNumberValidation = [
  Validators.required,
  Validators.minLength(5),
  Validators.maxLength(200),
]

export var vehicleNumberValidation = [
  Validators.required,
  Validators.pattern("^[A-Z]{2}[0-9]{1,2}(?:[A-Z])?(?:[A-Z]*)?[0-9]{1,4}$"),
  Validators.minLength(7),
  Validators.maxLength(20),
]

export var loanAccountValidation = [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(200),
]

export var dayValidation = [
  Validators.required,
  Validators.maxLength(2),
  Validators.minLength(2),
  Validators.max(31),
  Validators.min(1),

]

export var monhtValidation = [
  Validators.required,
  Validators.maxLength(2),
  Validators.minLength(2),
  Validators.max(12),
  Validators.min(1),

]

//export var DOBYearValidation = [
//  Validators.required,
//  Validators.maxLength(4),
//  Validators.minLength(4),
//  Validators.min(new Date().getFullYear() - INSURED_ADULT_END_AGE),
 
//]

export var PolicyEndDateYearValidation = [
  Validators.required,
  Validators.maxLength(4),
  Validators.minLength(4),
  Validators.max(2024),
  Validators.min(2000),
]

export var engineChassisNumberValidation = [
  Validators.required,
  Validators.pattern("^[0-9a-zA-Z]+$"),
  Validators.minLength(5),
  Validators.maxLength(25)
]

export var nameValidation = [
  Validators.required,
  //Validators.pattern('^[a-zA-Z0-9\\s]+$'),
  Validators.pattern('^[a-zA-Z \-\']+'),
  Validators.maxLength(24),
  Validators.minLength(3)
]

export var emailValidation = [
  Validators.required,
  //Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
  Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,4})$/),
  Validators.maxLength(24),
]
export var addressValidation = [
  Validators.required,
  Validators.maxLength(50)
  /*Validators.pattern(/^[a-zA-Z0-9\s.,#'"’-]*$/)*/
]

export var ppnAddressValidation = [
 /* Validators.required,*/
  Validators.maxLength(50)
  /*Validators.pattern(/^[a-zA-Z0-9\s.,#'"’-]*$/)*/
]

 

//export var ppnAddressValidation = [
//  Validators.maxLength(50)
//]
export var pinCodeValidation = [
  Validators.required,
  Validators.pattern(/^[0-9]\d*$/),
  Validators.minLength(6),
   Validators.maxLength(6),
]



export var ppnPinCodeValidation = [
  Validators.required,
  Validators.pattern(/^[0-9]\d*$/),
  Validators.minLength(6),
  Validators.maxLength(6),
]


//export var ppnPinCodeValidation = [
//  Validators.pattern(/^[0-9]\d*$/),
//  Validators.minLength(6),
//  Validators.maxLength(6),
//]
export var gstNoValidation = [
  Validators.required,
  //Validators.pattern("^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([a-zA-Z0-9]){1}([a-zA-Z]){1}([a-zA-Z0-9]){1}?$"),
  Validators.pattern(/^([0-9]){2}([a-zA-Z]){3}([P|C|H|A|B|G|J|L|E|F|T]){1}([A-Z]){1}([0-9]){4}([a-zA-Z]){1}([A-Z1-9]){1}([A-J1-9Z]){1}([A-Z0-9]){1}?$/),
  Validators.minLength(15),
  Validators.maxLength(15),
]
export var panNoValidation = [
  Validators.required,
  Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]{1}$"),
  Validators.minLength(10),
  Validators.maxLength(10),
]
export var newMobileValidation = [
  Validators.required,
  Validators.pattern("^([6-9]{1}[0-9]{9})$")
]

export var mobileNumberValidation = [
  Validators.required,
  Validators.pattern(/^(?!(\d)\1{9})([6-9]{1}[0-9]{9})$/),
]

export const emailFilterOne = /^(([^|\\<>/()\[\]\,;:@\"]+(\[^<>()\[\]\,;:\s@\"])*)|(\"\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^0-9<>/()[\]\.,;:\s@\"]{2,4})$/;
export const emailFilterTwo = /^([a-zA-Z0-9_.-])+\@(([a-zA-Z0-9-]{2,9})+\.)+([a-zA-Z0-9]{2,4})+$/;

export var colourValidation = [
  //Validators.required,
  Validators.pattern('^[a-zA-Z \-\']+'),
  Validators.maxLength(10),
  Validators.minLength(3)
]


export var userValidations = [
  Validators.required,
  Validators.pattern(/^\b(ilom(?!00000)\d{5,6}|ILOM(?!00000)\d{5,6}|ASLC(?!00000)\d{5}|(?!0000000)\d{6,8})\b(?!.*[^\w\s])/)
]




export var claimnumber = [
  Validators.required,
  Validators.pattern("^[a-zA-Z0-9]*$"),
  Validators.minLength(8),
  Validators.maxLength(17),
]

export var assetCapacity = [
    Validators.required,
    Validators.pattern("(?:[1-9]|0[1-9]|10)"),
    Validators.minLength(1),
    Validators.maxLength(2),
]

// User Management validations
export var fullNameValidation = [
  Validators.required,
  Validators.pattern('^[A-Za-z \-\'\s.]+$'),
  Validators.maxLength(24),
  Validators.minLength(3)
]

export var emailValidations = [
  Validators.required,
  //Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
  //Validators.pattern(/^[a-zA-Z0-9._%+-]+@icicilombard\.com$/),
  Validators.email,
  //Validators.maxLength(24)
]

export var userEmailValidations = [
  Validators.required,
  Validators.pattern('^[a-zA-Z0-9._%+-]+@(?:icicilombard|ICICILOMBARD|ext\\.icicilombard)\\.com$'),
  Validators.maxLength(35)
];



// PPN Master - Creation Form Validaiton
export var onlyNum8to10 = [
  Validators.required,
  Validators.pattern(/^\d{8,15}$/),
]

export var aplhaNumericUpto24CharOptional = [

  Validators.pattern(/^[a-zA-Z0-9\s]{0,24}$/)
]
export var PPNstate = [
  Validators.required,
  Validators.pattern("^[a-zA-Z]{1,24}$")
]

export var PPNcity = [
  Validators.required,
  Validators.pattern("^[a-zA-Z]{1,24}$")
]

export var tenDigitNoSpace = [
  Validators.required,
  Validators.pattern(/^[6-9]\d{9}$/)
]

//export var latitudeValidaiton = [
//  Validators.required,
//  //Validators.pattern(/^([-+]?([1-8]?\d(\.\d+)?|90(\.0+)?))$/),
//  Validators.pattern(/^[0-9.]+$/),
//]

export var latitudeValidaiton = [
  Validators.required,
  Validators.pattern(/^(\d{1,2}(\.\d*)?)$/),
]

export var longitudeValidaiton = [
  Validators.required,
  //Validators.pattern(/^([-+]?(180(\.0+)?|1[0-7]?\d(\.\d+)?|\d{1,2}(\.\d+)?))$/),
  Validators.pattern(/^(\d{1,2}(\.\d*)?)$/),
]

export var onlyAlpha5to50Char = [
  Validators.required,
  Validators.pattern('^[A-Za-z \-\'\s.]+$'),
  Validators.minLength(5),
  Validators.maxLength(50)
]


export var commaSepratedPincodes = [
  Validators.required,
  Validators.pattern(/^(\d{6},)*\d{6}$/)
]

export var mobileNoUser = [
  Validators.required,
  Validators.pattern(/^[6-9]\d{9}$/)
]

export var cityPPN = [
  Validators.required,
  Validators.pattern(/^[a-zA-Z\s]{0,24}$/)
]
export var statePPN = [
  Validators.required,
  Validators.pattern(/^[a-zA-Z\s]{0,24}$/)
]

export var ppnContactNumber = [
  Validators.required,
 /* Validators.pattern(/^[6-9]\d{9}$/),*/
  Validators.minLength(5),
  Validators.maxLength(15)
]

export var WynPinCode = [
  Validators.required,
  Validators.pattern(/^[0-9]\d*$/),
  Validators.minLength(6),
  Validators.maxLength(6),
]

export var BookingRationValidation = [
  Validators.required,
  Validators.pattern("(?:[1-9]|0[1-9]|10)"),
  Validators.minLength(1),
  Validators.maxLength(2),
]


export var alternatePOCNumberValidation = [
  Validators.pattern(/^[6-9]\d{9}$/),
  Validators.maxLength(10),
  Validators.minLength(10),
]


export var DCSMnameValidation = [
  Validators.pattern('^[a-zA-Z \-\']+'),
  Validators.maxLength(24),
  Validators.minLength(3)
]
