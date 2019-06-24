package com.brcxzam.owltime;

import android.util.Patterns;
import android.widget.EditText;

import java.util.regex.Pattern;

public class Validation {

    public boolean isValidFirstName(String nameText, EditText name) {
        Pattern patron = Pattern.compile("^[a-zA-Zñáéíóúü ]+$");
        if (!patron.matcher(nameText).matches()) {
            name.setError("Nombre inválido");
            return false;
        } else {
            name.setError(null);
        }
        return true;
    }

    public boolean isValidLastName(String nameText, EditText name) {
        Pattern patron = Pattern.compile("^[a-zA-Zñáéíóúü ]+$");
        if (!nameText.isEmpty()){
            if (!patron.matcher(nameText).matches()) {
                name.setError("Nombre inválido");
                return false;
            } else {
                name.setError(null);
            }
        }
        return true;
    }

    public boolean isValidEmail(String emailText, EditText email) {
        if (!Patterns.EMAIL_ADDRESS.matcher(emailText).matches()) {
            email.setError("Correo electrónico inválido");
            return false;
        } else {
            email.setError(null);
        }
        return true;
    }

    public boolean isValidEmail(String emailText) {
        if (!Patterns.EMAIL_ADDRESS.matcher(emailText).matches()) {
            return false;
        }
        return true;
    }

    public void isValidEmail(EditText email) {
        email.setError("Correo electrónico ya registrado");
    }

    public boolean isValidPassword(String passwordText) {
        if (passwordText.length() < 8) {
            return false;
        }
        return true;
    }
}
