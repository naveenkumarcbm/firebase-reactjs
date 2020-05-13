export function getKeyandValueFromForm(form){
  let data = {};
  for (let i in form.elements) {
    if(form.elements[i].value) data[form.elements[i].name] = form.elements[i].value;
  }
  return data;
};
