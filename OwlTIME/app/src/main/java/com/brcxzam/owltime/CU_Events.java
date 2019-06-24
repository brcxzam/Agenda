package com.brcxzam.owltime;

import androidx.appcompat.app.AppCompatActivity;

import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.DatePicker;
import android.widget.TimePicker;

import com.google.android.material.textfield.TextInputEditText;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class CU_Events extends AppCompatActivity implements DatePickerDialog.OnDateSetListener, TimePickerDialog.OnTimeSetListener {

    TextInputEditText edDate;
    int day, month, year, hour, minute;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cu_events);
//        String[] SUBJECTS = new String[] {"Redes", "Investigación", "Programacion", "Tecnologías Web"};
//        ArrayAdapter<String> adapter = new ArrayAdapter<>(getApplicationContext(), R.layout.menu_item, SUBJECTS);
//        AutoCompleteTextView editTextFilledExposedDropdown = findViewById(R.id.acSubjects);
//        editTextFilledExposedDropdown.setAdapter(adapter);

        edDate = (TextInputEditText) findViewById(R.id.date);

        edDate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault());
//                String myStrDate = "";
//                Date date = null;
//                try {
//                     date = format.parse(myStrDate);
//                } catch (ParseException e) {
//                    e.printStackTrace();
//                }
                Calendar c= Calendar.getInstance();
                year = c.get(Calendar.YEAR);
                month = c.get(Calendar.MONTH);
                day = c.get(Calendar.DAY_OF_MONTH);

                DatePickerDialog datePickerDialog = new DatePickerDialog(CU_Events.this, CU_Events.this, year, month, day);
                datePickerDialog.show();
            }
        });
    }

    @Override
    public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {

    }

    @Override
    public void onTimeSet(TimePicker view, int hourOfDay, int minute) {

    }
}
