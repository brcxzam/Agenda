package com.brcxzam.owltime;

import android.app.Dialog;
import android.content.Context;
import android.widget.EditText;

public class CuadroDialogo {

    public CuadroDialogo(Context context) {
        final Dialog dialog = new Dialog(context);
        dialog.setContentView(R.layout.dialog_subject);

        final EditText name = dialog.findViewById(R.id.nameSubject);

        dialog.show();
    }
}
