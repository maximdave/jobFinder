export const limitSentence = (sentence) => {
  const words = sentence.split(" ");

  if(words.length > 46 )
      return `${words.slice(0, 45).join(" ")}...`;
  return sentence;
}

export function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export const reverseArray = (arr) => {
  const newArr = [];

  for (let i = arr.length - 1; i >=0; i-- ) {
    newArr.push(arr[i]);
  }

  return newArr;
}