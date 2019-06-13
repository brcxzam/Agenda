package com.brcxzam.owltime;


import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.provider.MediaStore;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.textfield.TextInputEditText;
import com.squareup.picasso.Picasso;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


/**
 * A simple {@link Fragment} subclass.
 */
public class AccountFragment extends Fragment implements View.OnClickListener {

    Context ctx;
    ImageButton imageView;
    ProgressBar progressBar;
    TextInputEditText firstName, lastName, email, password;
    Button update;
    View v;

    public AccountFragment() {
        // Required empty public constructor

    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
         v = inflater.inflate(R.layout.fragment_account, container, false);
        imageView = v.findViewById(R.id.imageView);
        imageView.setOnClickListener(this);
        ctx = v.getContext();
        progressBar = v.findViewById(R.id.indeterminateBar);
        getUser();

        firstName = v.findViewById(R.id.firstName);
        lastName = v.findViewById(R.id.lastName);
        email = v.findViewById(R.id.email);
        password = v.findViewById(R.id.password);

        update = v.findViewById(R.id.update);
        update.setOnClickListener(this);

        return v;
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.imageView:
                Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                startActivityForResult(intent, 100);
                break;
            case R.id.update:
                updateUser();
                break;
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        progressBar.setVisibility(View.VISIBLE);
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 100 && resultCode == Activity.RESULT_OK && data != null){
            Uri imageUri = data.getData();
            try {
                Bitmap bitmap = MediaStore.Images.Media.getBitmap(ctx.getContentResolver(), imageUri);
                imageView.setImageBitmap(bitmap);
                uploadBitmap(bitmap);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /*
     * The method is taking Bitmap as an argument
     * then it will return the byte[] array for the given bitmap
     * and we will send this array to the server
     * here we are using PNG Compression with 80% quality
     * you can give quality between 0 to 100
     * 0 means worse quality
     * 100 means best quality
     * */
    public byte[] getFileDataFromDrawable(Bitmap bitmap) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 80, byteArrayOutputStream);
        return byteArrayOutputStream.toByteArray();
    }

    private void uploadBitmap(final Bitmap bitmap) {

        //our custom volley request
        VolleyMultipartRequest volleyMultipartRequest = new VolleyMultipartRequest(Request.Method.POST, new Connection().uploadProfileImage,
                new Response.Listener<NetworkResponse>() {
                    @Override
                    public void onResponse(NetworkResponse response) {
                        try {
                            JSONObject obj = new JSONObject(new String(response.data));
                            Picasso.get().load(new Connection().staticFiles + obj.get("profile_image").toString()).into(imageView);
                            progressBar.setVisibility(View.INVISIBLE);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(ctx, error.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                }) {

            /*
             * Here we are passing image by renaming it with a unique name
             * */
            @Override
            protected Map<String, DataPart> getByteData() {
                Map<String, DataPart> params = new HashMap<>();
                long imagename = System.currentTimeMillis();
                params.put("profile_image", new DataPart(imagename + ".png", getFileDataFromDrawable(bitmap)));
                return params;
            }

            public Map<String, String> getHeaders() throws AuthFailureError {
                HashMap<String, String> headers = new HashMap<>();
                headers.put("authorization","Bearer " + new Token(ctx).getToken());
                return headers;
            }
        };

        //adding the request to volley
        Volley.newRequestQueue(ctx).add(volleyMultipartRequest);
    }

    public void getUser() {
        progressBar.setVisibility(View.VISIBLE);
        String url = new Connection().api;

        JSONObject sendQuery = new JSONObject();
        try {
            JSONObject query = new JSONObject();
            query.put("query", "{ user { firstName, lastName, email, profile_image }}");
            sendQuery = query;
        } catch (JSONException e) {
            e.printStackTrace();
        }

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                (Request.Method.POST, url, sendQuery, new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            JSONObject data = response.getJSONObject("data").getJSONObject("user");
                            firstName.setText(data.get("firstName").toString());
                            if (!data.isNull("lastName")){
                                lastName.setText(data.get("lastName").toString());
                            }
                            email.setText(data.get("email").toString());
                            Picasso.get().load(new Connection().staticFiles + data.get("profile_image").toString()).into(imageView);
                            progressBar.setVisibility(View.INVISIBLE);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(ctx, error.toString(), Toast.LENGTH_SHORT).show();
                    }
                })
        {
            public Map<String, String> getHeaders() throws AuthFailureError {
                HashMap<String, String> headers = new HashMap<>();
                headers.put("Content-Type", "application/json; charset=utf-8");
                headers.put("authorization", new Token(ctx).getToken());
                return headers;
            }
        };
        MySingleton.getInstance(ctx).addToRequestQueue(jsonObjectRequest);
    }

    public void updateUser() {
        progressBar.setVisibility(View.VISIBLE);
        final Validation validation = new Validation();
        String firstNameT = this.firstName.getText().toString();
        String lastNameT = this.lastName.getText().toString();
        String emailT = this.email.getText().toString();
        String passwordT = this.password.getText().toString();
        Boolean firstNameIsValid = validation.isValidFirstName(firstNameT, this.firstName);
        Boolean lastNameIsValid = validation.isValidLastName(lastNameT, this.lastName);
        Boolean emailIsValid = validation.isValidEmail(emailT, this.email);
        Boolean passwordIsValid = validation.isValidPassword(passwordT) || passwordT.isEmpty();

        if (!passwordIsValid) {
            Snackbar.make(update, "Contraseña Inválida", Snackbar.LENGTH_LONG).show();
        } else if (firstNameIsValid && lastNameIsValid && emailIsValid){
            String url = new Connection().api;

            JSONObject sendQuery = new JSONObject();
            try {
                JSONObject data = new JSONObject();
                data.put("firstName", firstNameT);
                if (!lastNameT.isEmpty()){
                    data.put("lastName", lastNameT);
                }
                data.put("email", emailT);
                if (!passwordT.isEmpty()) {
                    data.put("password", passwordT);
                }
                JSONObject variables = new JSONObject();
                variables.put("data", data);
                JSONObject query = new JSONObject();
                query.put("query", "mutation($data: iUsers){ uUser(data: $data) }");
                query.put("variables", variables);
                sendQuery = query;
            } catch (JSONException e) {
                e.printStackTrace();
            }

            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                    (Request.Method.POST, url, sendQuery, new Response.Listener<JSONObject>() {

                        @Override
                        public void onResponse(JSONObject response) {
                            System.out.println(response.toString());
                            try {
                                if (!response.isNull("errors")){
                                    if (response.getJSONArray("errors").getJSONObject(0).get("message").equals("Validation error")) {
                                        validation.isValidEmail((EditText) v.findViewById(R.id.email));
                                        progressBar.setVisibility(View.INVISIBLE);
                                    }
                                } else {
                                    if (response.getJSONObject("data").get("uUser").toString().equals("done")){
                                        progressBar.setVisibility(View.INVISIBLE);
                                    }

                                }
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    }, new Response.ErrorListener() {

                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Snackbar.make(update, "Response: " + error.toString(), Snackbar.LENGTH_SHORT).show();
                        }
                    })
            {
                public Map<String, String> getHeaders() throws AuthFailureError {
                    HashMap<String, String> headers = new HashMap<>();
                    headers.put("Content-Type", "application/json; charset=utf-8");
                    headers.put("authorization", new Token(ctx).getToken());
                    return headers;
                }
            };
            MySingleton.getInstance(ctx).addToRequestQueue(jsonObjectRequest);
        } else {
            progressBar.setVisibility(View.INVISIBLE);
        }
    }
}
