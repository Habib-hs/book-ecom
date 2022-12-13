/* eslint-disable valid-typeof */




exports.isAuthenticated = () => {
    // if (typeof window == 'undefined') {
      
    //     return false;
    // }
    if (localStorage.getItem('user')) {
      
       return JSON.parse(localStorage.getItem('user'));
    } else {
      
        return false;
    }
};


exports.selectDashboard = () => {
    const user =   JSON.parse(localStorage.getItem("user")) 

    if (user.role === true) {
        return true;
    } else {
      
        return false;
    }
};