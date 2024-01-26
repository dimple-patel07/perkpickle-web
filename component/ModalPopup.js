import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { images } from './Images';
import Image from 'next/image';
import { FaArrowLeft } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

function ModalPopup(props) {
  return (
    <Modal className='login-modal'
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className='p-0'>
        <div className='modal-inn'>


            {/* 4 Change Password  */}
         {/* { <div className='container-fluid p-0'>  
        <div className='row align-items-center'>
                <div className='col-12 col-sm-12 col-md-12 col-lg-5 height'>
                    <div className='login-left'>
                        <h2>Change Password</h2> 
                        <p>Enter your email to change <br /> password</p> 
                        <Image src={images.LoginImg} className='img-fluid' />
                     </div>
                </div>
             <div className='col-12 col-sm-12 col-md-12 col-lg-7 position-relative height'>
                <div className='login-right'>
                <div className='back-arrow text-start'>
                <FaArrowLeft />
                </div>
                    <form>
                    <div className="mb-3">
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Address" autoComplete="off" />
                    </div>  
                                 <button className='btn'>Send OTP</button>
                                </form>
                                </div>
                            </div>
                        </div>
        </div> } */}


          {/* 4.1 Change  Password OTP  */}
              {/* <div className='container-fluid p-0'>
                        <div className='row align-items-center'>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-5 height'>
                            <div className='login-left'>
                                    <h2>Change PASSWORD</h2> 
                                    <p>Enter your email fo <br /> change password</p> 
                                <Image src={images.LoginImg} className='img-fluid' />
                            </div>  
                            </div>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-7 position-relative height'>
                                <div className='login-right'>
                                <div className='back-arrow text-start'>
                                <FaArrowLeft />
                                </div>
                                <form>
                                <div className="mb-3">
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Address" autoComplete="off" />
                                </div>
                                <div className="otp-field">
                                    <input type="text" maxlength="1" placeholder='0'/>
                                    <input type="text" maxlength="1" placeholder='0' />
                                    <input type="text" maxlength="1" placeholder='0'/>
                                    <input type="text" maxlength="1" placeholder='0' />
                                    <input type="text" maxlength="1" placeholder='0' />
                                    <input type="text" maxlength="1" placeholder='0' />
                                    </div>
                                <div id="emailHelp" className="resend">Resend OTP</div>
                                 <button className='btn'>Reset Password</button>
                                </form>
                                </div>
                            </div>
                        </div>
            </div>   */}

            {/* 4.2 Reset Password OTP */}
            {/* { <div className='container-fluid p-0'>
                        <div className='row align-items-center'>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-5 height'>
                            <div className='login-left'>
                                    <h2>CHANGE PASSWORD</h2> 
                                    <p>Enter new and confirm password <br /> to reset your password</p> 
                                <Image src={images.LoginImg} className='img-fluid' />
                            </div>  
                            </div>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-7 position-relative height'>
                                <div className='login-right'>
                                <div className='back-arrow text-start'>
                                <FaArrowLeft />
                                </div>
                                <form>
                                <div className="mb-3">
                                    <input type="Number" className="form-control"  placeholder="New Password" autoComplete="off" />
                                </div>
                                <div className="mb-3">
                                    <input type="Number" className="form-control"  placeholder="Confirm Password" autoComplete="off" />
                                </div>
                                 <button className='btn'>Change Password</button>
                                </form>
                                </div>
                            </div>
                        </div>
            </div>  } */}


        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalPopup;
