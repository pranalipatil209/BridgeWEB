/**email and password validation regex pattern*/
var hrDashData={ email :/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
 pwd :/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,

/**login path*/
config:{ method: 'POST', url: 'http://192.168.0.60:3000/login' },

dashBoardData :["Engineers","Clients","Reports"],

alphabets:['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],

filters: { employeeName: "", employeeStatus: "", company: "" }
};
