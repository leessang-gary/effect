
export function checkPhone(val){
  return /^1\d{10}$/.test(val);
}

export function checkPass(val){
  return /^[a-zA-Z0-9]{6,12}$/.test(val);
}
