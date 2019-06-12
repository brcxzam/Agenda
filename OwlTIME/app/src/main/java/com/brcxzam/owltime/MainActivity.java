package com.brcxzam.owltime;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Patterns;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.material.textfield.TextInputLayout;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    EditText email, password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        email = (EditText) findViewById(R.id.email);
        password = (EditText) findViewById(R.id.password);

        findViewById(R.id.signin).setOnClickListener(this);
        findViewById(R.id.signup).setOnClickListener(this);

        email.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                esCorreoValido(String.valueOf(s));
            }

            @Override
            public void afterTextChanged(Editable s) {

            }
        });
        password.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                esContrasenaValido(String.valueOf(s));
            }

            @Override
            public void afterTextChanged(Editable s) {

            }
        });
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.signin:
                this.signin();
                break;
            case R.id.signup:
                this.signup();
                break;
        }
    }

    public void signin() {
        String email = this.email.getText().toString();
        String password = this.password.getText().toString();
        Boolean emailIsValid = esCorreoValido(email);
        Boolean passwordIsValid = esContrasenaValido(password);
        if (emailIsValid && passwordIsValid) {
            /**
             * TODO: validación de datos a travez de la API
             */
            Toast.makeText(getApplicationContext(),"signin", Toast.LENGTH_LONG).show();
            Intent intent = new Intent(getApplicationContext(), Events.class);
            startActivity(intent);
        }
    }

    public void signup() {
        Intent intent = new Intent(getApplicationContext(), SignUp.class);
        startActivity(intent);
    }

    private boolean esCorreoValido(String correo) {
        if (!Patterns.EMAIL_ADDRESS.matcher(correo).matches()) {
            email.setError("Correo electrónico inválido");
            return false;
        } else {
            email.setError(null);
        }
        return true;
    }

    private boolean esContrasenaValido(String contrasena) {
        if (contrasena.length() < 8) {
            password.setError("Contraseña inválida");
            return false;
        } else {
            password.setError(null);
        }
        return true;
    }
}
