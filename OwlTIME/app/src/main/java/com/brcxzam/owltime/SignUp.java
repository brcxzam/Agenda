package com.brcxzam.owltime;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.textfield.TextInputEditText;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class SignUp extends AppCompatActivity implements View.OnClickListener {

    TextInputEditText firstName, lastName, email, password;
    Button signUp;
    ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);

        firstName = findViewById(R.id.firstName);
        lastName = findViewById(R.id.lastName);
        email = findViewById(R.id.email);
        password = findViewById(R.id.password);

        findViewById(R.id.back).setOnClickListener(this);
        signUp = findViewById(R.id.signUp);
        signUp.setOnClickListener(this);

        progressBar = findViewById(R.id.indeterminateBar);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.back:
                this.finish();
                break;
            case R.id.signUp:
                this.signup();
                break;
        }
    }

    public void signup() {
        progressBar.setVisibility(View.VISIBLE);
        final Validation validation = new Validation();
        String firstName = this.firstName.getText().toString();
        String lastName = this.lastName.getText().toString();
        String email = this.email.getText().toString();
        String password = this.password.getText().toString();
        Boolean firstNameIsValid = validation.isValidFirstName(firstName, this.firstName);
        Boolean lastNameIsValid = validation.isValidLastName(lastName, this.lastName);
        Boolean emailIsValid = validation.isValidEmail(email, this.email);
        Boolean passwordIsValid = validation.isValidPassword(password);

        if (!passwordIsValid) {
            Snackbar.make(signUp, "Contraseña Inválida", Snackbar.LENGTH_LONG).show();
        } else if (firstNameIsValid && lastNameIsValid && emailIsValid){
            String url = new Connection().api;

            JSONObject sendQuery = new JSONObject();
            try {
                JSONObject data = new JSONObject();
                data.put("firstName", firstName);
                if (!lastName.isEmpty()){
                    data.put("lastName", lastName);
                }
                data.put("email", email);
                data.put("password", password);
                JSONObject variables = new JSONObject();
                variables.put("data", data);
                JSONObject query = new JSONObject();
                query.put("query", "mutation($data: iUsers){ cUser(data: $data) }");
                query.put("variables", variables);
                sendQuery = query;
            } catch (JSONException e) {
                e.printStackTrace();
            }

            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                    (Request.Method.POST, url, sendQuery, new Response.Listener<JSONObject>() {

                        @Override
                        public void onResponse(JSONObject response) {
                            try {
                                if (!response.isNull("errors")){
                                    if (response.getJSONArray("errors").getJSONObject(0).get("message").equals("Validation error")) {
                                        validation.isValidEmail((EditText) findViewById(R.id.email));
                                        progressBar.setVisibility(View.INVISIBLE);
                                    }
                                } else {
                                    Token token = new Token(getApplicationContext());
                                    token.setStatus(true);
                                    token.setToken(response.getJSONObject("data").get("cUser").toString());
                                    startActivity(new Intent(getApplicationContext(),Navigation.class));
                                    progressBar.setVisibility(View.INVISIBLE);
                                    finish();
                                }
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    }, new Response.ErrorListener() {

                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Snackbar.make(signUp, "Response: " + error.toString(), Snackbar.LENGTH_SHORT).show();

                        }
                    })
            {
                public Map<String, String> getHeaders() throws AuthFailureError {
                    HashMap<String, String> headers = new HashMap<>();
                    headers.put("Content-Type", "application/json; charset=utf-8");
                    return headers;
                }
            };
            MySingleton.getInstance(this).addToRequestQueue(jsonObjectRequest);
        }
    }
}
