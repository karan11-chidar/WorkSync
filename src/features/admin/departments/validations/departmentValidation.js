export  const departmentFormValidation =(formData)=>{
    const formError = {
      departmentName: "",
      location: "",
      budget: "",
      manager: "",
      description: "",
      themeColor: "",
    };
    formError.departmentName = (formData.departmentName.trim() === '') ? "❌ Fill Department Name." : '';
    formError.budget = Number(formData.budget) > 0 ? "" : "❌ Fill Positive Value";
    formError.description = (formData.description.trim() === '') ? "❌ Fill Description On Department Data" : '';
    formError.location = (formData.location.trim() === '') ? "❌ Fill Department Location" : '';
    formError.manager = (formData.manager.trim() === '') ? "❌ Fill Department Manager" : '';
    formError.themeColor = (formData.themeColor.trim() === '') ? "❌ Fill Theme Color" : '';
    const isValid = (
        formError.departmentName === '' &&
        formError.description === '' &&
        formError.location === '' &&
        formError.budget === '' &&
        formError.manager === '' &&
        formError.themeColor==='') ? true : false;
    return { isValid, formError };
}