//return epoc time with _time included // _time in minutes.
function epoc_time (_time) {
  var d = new Date();
  d.setMinutes(d.getMinutes() + Number(_time));
  return d.getTime();
};

function convertDaysToMinutes(day){
  // 1 day -> 24 hours
  // 1 hour -> 60 minutes
  if(Number(day) < 0) return;
  return Math.floor(day * 24 * 60);
}

export const carData = {

  getTotal: (data) => {
    //(price * days). 
    const total = Number(data.price) !== 0 && Number(data.days) !== 0 && Math.floor(data.price * data.days);

    return Number(total || 0)
  },
  getReservedTime: (data) => {
    //return reservedEndTime for selected days.
    return data.is_reserved ? epoc_time(convertDaysToMinutes(data.days)) : null;
  },

  getUserDetails: (data) => {
    //if user is reserving the car we take his info.

    if(data.is_reserved === false) {
      return {};
    }

    return {userName: data.userName, userPhoneNumber: data.userPhoneNumber}
  },

  prepare_data: (data) => {

    let return_object = {
      id: data.id,
      name: data.name,
      location: data.location,
      description: data.description || "perfect ride for family",
      price: Number(data.price || 0), //per day
      total: carData.getTotal(data),
      maxed_days: 10, //default
      is_reserved: data.is_reserved || false, //default
      is_rented: false, //default 
      currency: 'RM', //default
      reserved_for_days: Number(data.days || 0), // days in number.
      reserved_start_time: data.reserved_start_time || null,
      reserved_end_time: carData.getReservedTime(data),
      user: carData.getUserDetails(data),
    };
    return return_object;
  }
} 