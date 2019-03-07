export const handleValidation = (fields) => {
  // let fields = this.state;
  let errors = {};

  //Name
  if(fields["text"].trim() === ""){
     errors["text"] = "Cannot be empty";
  } else {
    if(typeof fields["text"] !== "undefined"){
       if(!fields["text"].match(/^[a-zA-Z]+$/)){
          errors["text"] = "Name must be only letters";
       } else if (fields["text"].length > 7) {
          errors["text"] = "Your name is too long";
       }        
    }
  }

  //Phone
  if(fields["phone"].trim() === ""){
     errors["phone"] = "Phone cannot be empty";
  } else {
    if(typeof fields["phone"] !== "undefined"){
      if(!fields["phone"].match(/^[0-9\-\\+]{9,15}$/)){
        errors["phone"] = "Not phone number";
      }      
    }
  }
  // Email
  if(fields["email"].trim() === ""){
    errors["email"] = "Cannot be empty";
  } else {
    if(typeof fields["email"] !== "undefined"){
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        errors["email"] = "Email is not valid";
      }
    }
  }
  // Linkedin profile
  if(fields["linkedin_profile"].trim() === ""){
    errors["linkedin_profile"] = "Cannot be empty";
  } else {
    if(typeof fields["linkedin_profile"] !== "undefined"){
      let re=/^((https?|ftp|smtp):\/\/)+(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9-_#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
      if (!re.test(fields["linkedin_profile"])) {
        errors["linkedin_profile"] = "Not Linkedin URL";
      }
    }
  }
  // Website
  if(fields["website"].trim() === ""){
  } else {
    if(typeof fields["website"] !== "undefined"){
      let re=/^((https?|ftp|smtp):\/\/)+(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)?$/;
      if (!re.test(fields["website"])) {
        errors["website"] = "URL is not valid";
      }
    }
  }

  return errors;
}