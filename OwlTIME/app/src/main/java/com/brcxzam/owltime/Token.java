package com.brcxzam.owltime;

import android.content.Context;
import android.content.SharedPreferences;

public class Token {
    Context ctx;
    SharedPreferences sharedPref;
    String preference_file_key = "com.brcxzam.owltime.preference_file_key";

    public Token(Context ctx) {
        this.ctx = ctx;
        sharedPref = ctx.getSharedPreferences(preference_file_key, Context.MODE_PRIVATE);
    }

    public void setStatus(boolean status){
        sharedPref.edit().putBoolean("status",status).apply();
    }

    public boolean getStatus(){
        return sharedPref.getBoolean("status",false);
    }

    public void setToken(String token){
        sharedPref.edit().putString("token",token).apply();
    }

    public String getToken(){
        return sharedPref.getString("token","");
    }
}
