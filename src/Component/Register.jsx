import React from 'react'
import Header from './Header';

export default function Register() {
    return (
        <>  

            <Header title="Register" desc="If you not have account then fill following form."/>

            <div className="container-fluid mycontent p-4">
                <div className="row justify-content-center">
                    <div className="col-4 p-2">
                        <form method="post" action="">
                            <div className="card">
                                <div className="card-header py-3">
                                    Fill following data properly.
                                </div>
                                <div className="Card-body p-3">
                                    <div className="mb-3">
                                        <label for="exampleInputEmail1" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Name" />
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleInputEmail2" className="form-label">Email</label>
                                        <input type="Email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter Your Email" />
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="Password   " className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Enter Your Password" />
                                    </div>
                                </div>
                                <div className="card-footer text-body-secondary text-center ">
                                    <button className="btn btn-primary mx-2">Register Now</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
