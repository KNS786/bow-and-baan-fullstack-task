
export const checkIsEmpty = (input: string) => !input || input.trim() =="";

export const checkLength= (word: string, min=4, max=50) => word.length > min && word.length < max;

export const calculateAge = (birthday: any) => { // birthday is a date
    birthday = new Date(birthday);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
