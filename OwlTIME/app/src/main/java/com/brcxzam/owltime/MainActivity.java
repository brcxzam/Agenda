package com.brcxzam.owltime;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;

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

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    TextInputEditText email, password;
    Button signIn, signUp;
    ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (new Token(getApplicationContext()).getStatus()){
            startActivity(new Intent(getApplicationContext(),Navigation.class));
            this.finish();
        }

        email = findViewById(R.id.email);
        password = findViewById(R.id.password);

        signIn = findViewById(R.id.signIn);
        signUp = findViewById(R.id.signUp);
        signIn.setOnClickListener(this);
        signUp.setOnClickListener(this);

        progressBar = findViewById(R.id.indeterminateBar);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.signIn:
                this.signin();
                break;
            case R.id.signUp:
                this.signup();
                break;
        }
    }

    public void signin() {
        progressBar.setVisibility(View.VISIBLE);
        Validation validation = new Validation();
        String email = this.email.getText().toString();
        String password = this.password.getText().toString();
        Boolean emailIsValid = validation.isValidEmail(email);
        Boolean passwordIsValid = validation.isValidPassword(password);
        if (emailIsValid && passwordIsValid) {

            String url = new Connection().api;

            JSONObject sendQuery = new JSONObject();
            try {
                JSONObject data = new JSONObject();
                data.put("email", email);
                data.put("password", password);
                JSONObject variables = new JSONObject();
                variables.put("data", data);
                JSONObject query = new JSONObject();
                query.put("query", "mutation($data: iLogin){ login(data: $data) }");
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
                                Token token = new Token(getApplicationContext());
                                token.setStatus(true);
                                token.setToken(response.getJSONObject("data").get("login").toString());
                                startActivity(new Intent(getApplicationContext(),Navigation.class));
                                progressBar.setVisibility(View.INVISIBLE);
                                finish();
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    }, new Response.ErrorListener() {

                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Snackbar.make(signIn, "Response: " + error.toString(), Snackbar.LENGTH_SHORT).show();

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
        } else {
            Snackbar.make(signIn, "Correo o Contraseña Invalidos", Snackbar.LENGTH_SHORT).show();
        }
    }

    public void signup() {
        Intent intent = new Intent(getApplicationContext(), SignUp.class);
        startActivity(intent);
    }

}
