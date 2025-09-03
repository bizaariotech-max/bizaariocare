import axios from "axios";
const instance=axios.create({
   
        //   baseURL:'https://api.bizaariocare.com/'
          // baseURL:'http://localhost:5000/'
          baseURL:"https://bizaariocare-backend.onrender.com/"
            // baseURL:"https://bizaariocare-backend.onrender.com/"

       
})
export default instance;