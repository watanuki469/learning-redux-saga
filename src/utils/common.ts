export const capitalizeString=(str:string)=>{
    if(!str) return ''
    return `${str[0].toUpperCase()}${str.slice(1)}`
}

export const getMarkColor = (mark: number): string => {
    if (mark >= 8) return 'goldenrod';
    if (mark >= 6.5) return 'blue'; 
    if (mark >= 5) return 'black';
    if (mark >3.5) return 'purple';
    return 'red';
  };