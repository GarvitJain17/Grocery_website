import React, { useState } from 'react'
import "../CSS/BecomeSeller.css";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from 'react-hot-toast';
import { useSelector ,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginRedux } from '../redux/userSlice';






const BecomeSeller = () => {
  const userData = useSelector((state)=>state.user.userdetail);
  const [curr,setCurr]=useState('first');
  // const [GST,setGST] = useState('');
  // const [address,setAddress] = useState('');
  // const [bank,setBank] = useState('');
  // const [PanImage,setPanImage] = useState('');
  // const [PanNumber,setPanNumber] = useState('');
  // const [store,setStore] = useState('');
  // const [PIN,setPin] = useState('');
  // const [Ifsc,setIfsc] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName:userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    image : userData.image,
    type:"seller",
    GST:"",
    address:"",
    PIN:"",
    PanImage:"",
    PanNumber:"",
    bank:"",
    store:"",
    Ifsc:"",
    Orders:[],
    Uploads:[]
  });

const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
};

const handleUploadPanImage = async(e)=>{
  const data = await ImagetoBase64(e.target.files[0])
  setData((preve)=>{
    return{
      ...preve,
      PanImage : data
    }
})
}
const handleNext = (e)=>{
  e.preventDefault();
  if(curr==='first')
  {
    if(data.GST && data.PanNumber && data.PanImage)
    {
      setCurr('second');
    }
    else{
      toast("Enter Required fields");
    }
  }
  else if(curr==='second'){
    if(data.address && data.store && data.PIN)
    {
      setCurr('third');
    }
    else{
      toast("Enter Required fields");
    }
  }
}

const handlePrev = ()=>{
  if(curr==='second')
  {
    setCurr('first');
  }
  else if(curr==='third'){
    setCurr('second');
  }
}
const handleSubmit = async(e)=>
{
    e.preventDefault();
    // const {firstName,lastName,email,type,image}=userData;
    // const data  = {GST,address,PIN,PanImage,PanNumber,bank,store,Ifsc,firstName,lastName,email,type,image};
    console.log(data);
    // return;
    try {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}becomeseller`, {
          method: "POST",
          headers: {
              "content-type": "application/json"
          },
          body:JSON.stringify(data)
      });
      const response = await fetchData.json();
      if (response.mes === "SellerExist") {
          toast("Seller already exists");
      } else {
          toast("Successfully became a seller");
          alert("Please login again");
          navigate("/login");
          // Handle success, e.g., navigate to a different page or dispatch an action
      }
  } catch (error) {
      console.error("Error during form submission:", error);
      toast("An error occurred during submission");
      // Handle error, e.g., show an error message to the user
  }

}
  return (
    <div>
      <div className="main-heading">
        <div className={`${curr==='first'?'highlight':'nohighlight'}`}>
           GSN_RGSTN & other Documents
        </div>
        <div className={`${curr==='second'?'highlight':'nohighlight'}`}>
           Address And Name
        </div>
        <div className={`${curr==='third'?'highlight':'nohighlight'}`}>
           Bank Details
        </div>
      </div>

      <div className="mine">
      <form className="w-full py-3 flex flex-col">
          {curr==='first' && (
          <>
          <h2 htmlFor="gst">Enter GST number</h2>
          <h3 htmlFor="gst">15 digit GST number</h3>
          <input
            type="text"
            id="gst"
            name="GST"
            className='input-field'
            value={data.GST}
            onChange = {handleOnChange}
            placeholder='GST NUMBER'
          />
          <br />
          <h2 htmlFor="PanNumber">Enter Pan number</h2>
          <input
            type="text"
            id="PanImage"
            name="PanNumber"
            className='input-field'
            value={data.PanNumber}
            onChange = {handleOnChange}
            placeholder='PanImage ID'

          />
          <label htmlFor="PanImage">
          <input type={"file"} id="PanImage" accept="image/*"  onChange={handleUploadPanImage}/>
          </label>
          <button onClick={handleNext} className='nextbutton1'>Next</button>
          </>)}


          {curr==='second' && (
          <>
          <h2 htmlFor="address">Address</h2>
          <input
            type="text"
            id="address"
            name="address"
            className='input-field'
            value={data.address}
            onChange = {handleOnChange}
            placeholder='Pickup address'
          />
          <h2 htmlFor="store">Give store-name</h2>
          <input
            type="text"
            id="store"
            name="store"
            className='input-field'
            value={data.store}
            onChange = {handleOnChange}
            placeholder='Your Shop Name'
          />
          <h2 htmlFor="PIN">Area PIN-code</h2>
          <input
            type="text"
            id="PIN"
            name="PIN"
            className='input-field'
            value={data.PIN}
            onChange = {handleOnChange}
            placeholder='Enter 5 digit Pin'
          />
          <button onClick={handlePrev} className='prevbutton2'>Prev</button>
          <button onClick={handleNext} className='nextbutton2'>Next</button>
          </>)}

          {curr==='third' && (
          <>
          <h2 htmlFor="">Bank Account Details</h2>
          <input
            type="text"
            id="bank"
            name="bank"
            className='input-field'
            value={data.bank}
            onChange = {handleOnChange}
            placeholder='Account no.'
          />
          <h2 htmlFor="IFSC">IFSC Code</h2>
          <input
            type="text"
            id="IFSC"
            name="Ifsc"
            className='input-field'
            value={data.Ifsc}
            onChange = {handleOnChange}
            placeholder='Bank IFSC'
          />
          <button onClick={handlePrev} className='prevbutton3'>Prev</button>
          <input type='submit' value='submit' onClick={handleSubmit} className='submitbutton'/>
          </>)}
      </form>
    </div>
    </div>
  )
}

export default BecomeSeller
