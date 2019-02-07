var a=["http://www.sample.com","https://www.sample.com/","https://www.sample.com#","http://www.sample.com/xyz","http://www.sample.com/#xyz","www.sample.com","www.sample.com/xyz/#/xyz","sample.com","sample.com?name=foo","http://www.sample.com#xyz","http://www.sample.c"];
var re=/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
a.map(x=>console.log(x+" => "+re.test(x)));


// WITHOUT http:// not works 
// IF you want without + change to ? http:// works https?|ftp|smtp):\/\/)?(www.)
//site with "-" (problem validate http://example)
let re=/^((https?|ftp|smtp):\/\/)+(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)?$/;

// site without "-"
let re=/^((https?|ftp|smtp):\/\/)+(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9-_#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

// Linkedin profile 
if(fields["linkedin_profile"].trim() === ""){
formIsValid = false;
errors["linkedin_profile"] = "Cannot be empty";
} else {
if(typeof fields["linkedin_profile"] !== "undefined"){
  let re=/^((https?|ftp|smtp):\/\/)+(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9-_#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
  if (!re.test(fields["linkedin_profile"])) {
    formIsValid = false;
    errors["linkedin_profile"] = "URL is not valid";
  }
}
}
// Website
if(fields["website"].trim() === ""){
} else {
if(typeof fields["website"] !== "undefined"){
  let re=/^((https?|ftp|smtp):\/\/)+(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)?$/;
  if (!re.test(fields["website"])) {
    formIsValid = false;
    errors["website"] = "URL is not valid";
  }
}
}

//Name
if(fields["text"].trim() === ""){
 formIsValid = false;
 errors["text"] = "Cannot be empty";
} else {
if(typeof fields["text"] !== "undefined"){
   if(!fields["text"].match(/^[a-zA-Z]+$/)){
      formIsValid = false;
      errors["text"] = "Name must be only letters";
   } else if (fields["text"].length > 7) {
      formIsValid = false;
      errors["text"] = "Your name is too long";
   }        
}
}

//Phone
if(fields["phone"].trim() === ""){
 formIsValid = false;
 errors["phone"] = "Phone cannot be empty";
} else {
if(typeof fields["phone"] !== "undefined"){
  if(!fields["phone"].match(/^[0-9\-\\+]{9,15}$/)){
    formIsValid = false;
    errors["phone"] = "Not phone number";
  }      
}
}
// Email
if(fields["email"].trim() === ""){
formIsValid = false;
errors["email"] = "Cannot be empty";
} else {
if(typeof fields["email"] !== "undefined"){
  let lastAtPos = fields["email"].lastIndexOf('@');
  let lastDotPos = fields["email"].lastIndexOf('.');
  if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
    formIsValid = false;
    errors["email"] = "Email is not valid";
  }
}
}