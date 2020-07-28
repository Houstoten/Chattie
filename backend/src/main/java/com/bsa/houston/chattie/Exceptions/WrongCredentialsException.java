package com.bsa.houston.chattie.Exceptions;

public class WrongCredentialsException extends RuntimeException {
    public WrongCredentialsException(){
        super("Incorrect Credentials");
    }
}
