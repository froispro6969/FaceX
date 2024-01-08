export const currentDate = () => {
    const currentDate = new Date();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

    const day = currentDate.getDate();
    const monthIndex = currentDate.getMonth();
    const month = monthNames[monthIndex];
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    
    let formattedDate;

    if (minutes < 10) {
      formattedDate = `${hours}:0${minutes}, ${day} ${month} ${year}`;
    } else {
      formattedDate = `${hours}:${minutes}, ${day} ${month} ${year}`;
    }
    
    

    return formattedDate;
}