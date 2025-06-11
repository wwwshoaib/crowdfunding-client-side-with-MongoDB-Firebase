
/**
 * <div className="login flex gap-2 items-center">
                    <div>
                        {
                              user &&   user?.email ?
                                <div>
                                    <img className="w-10 h-10 rounded-full"
                                        src={  user?.photoURL} alt="" />
                                    <p className="text-[10px]">{  user?.displayName}</p>
                                </div>
                                :
                                <FaRegUser className="size-4 md:size-5"></FaRegUser>

                        }

                    </div>
                    {
                        (  user &&   user?.email) ?
                            <Link onClick={handleSignOut} to="/" className="btn  bg-green-200 ">Log Out</Link>
                            :
                            <>
                                <Link to="login" className="btn  bg-green-200 ">Login</Link>
                                <Link to="register" className=" btn  bg-green-200 ">Register</Link>
                            </>

                    }
                </div>
 * 
 */

                  user,
                        loading,
                        createUser,
                        signInUser,
                        signOutUser,
                        updateUserProfile,
                        setUser, 



                        import { createContext, useEffect, useState } from "react";
                        import PropTypes from "prop-types";
                        import { auth } from "../firebase/firebase.config";
                        import {
                            createUserWithEmailAndPassword,
                            onAuthStateChanged,
                            signInWithEmailAndPassword,
                            signOut,
                            updateProfile
                        } from "firebase/auth";
                        
                        export const AuthContext = createContext(null);
                        