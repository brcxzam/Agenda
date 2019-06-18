package com.brcxzam.owltime;

import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Canvas;
import android.net.Uri;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.ItemTouchHelper;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import android.text.format.DateFormat;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.TimePicker;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.textfield.TextInputEditText;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Array;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;


public class EventFragment extends Fragment implements View.OnClickListener {

    TextInputEditText edDate;

    int day, month, year, hour, minute;
    int dayFinal, monthFinal, yearFinal, hourFinal, minuteFinal;

    String[] SUBJECTS = new String[] {"Redes", "Investigación", "Programacion", "Tecnologías Web"};

    View v;
    ArrayList<Events> listDatos;
    RecyclerView recycler;
    SwipeRefreshLayout refreshLayout;
    LayoutInflater inflater;
    FloatingActionButton fab;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_event, container, false);

//        edDate = (TextInputEditText) view.findViewById(R.id.edDate);
//
//        ArrayAdapter<String> adapter = new ArrayAdapter<>(getContext(), R.layout.menu_item, SUBJECTS);
//        AutoCompleteTextView editTextFilledExposedDropdown = view.findViewById(R.id.acSubjects);
//        editTextFilledExposedDropdown.setAdapter(adapter);
//
//        edDate.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Calendar c= Calendar.getInstance();
//                year = c.get(Calendar.YEAR);
//                month = c.get(Calendar.MONTH);
//                day = c.get(Calendar.DAY_OF_MONTH);
//
//                DatePickerDialog datePickerDialog = new DatePickerDialog(getActivity(), EventFragment.this, year, month, day);
//                datePickerDialog.show();
//            }
//        });

        refreshLayout = view.findViewById(R.id.refresh);
        refreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                getEvents();
            }
        });

        fab = view.findViewById(R.id.fab);
        fab.setOnClickListener(this);

        recycler = (RecyclerView) view.findViewById(R.id.recycler_view);
        recycler.setLayoutManager(new LinearLayoutManager(getContext()));
//        listDatos = new ArrayList<>();
//        listDatos.add(new Events(1,"prueba", "1212121321231", false, 1, ""));
//        AdapterEvents adapterDatos = new AdapterEvents(listDatos);
//        recycler.setAdapter(adapterDatos);
        getEvents();

        return view;
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.fab:
                startActivity(new Intent(getContext(), CU_Events.class));
                break;
        }
    }

//    @Override
//    public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
//        yearFinal = year;
//        monthFinal = month +1;
//        dayFinal = dayOfMonth;
//
//        Calendar c = Calendar.getInstance();
//        hour = c.get(Calendar.HOUR_OF_DAY);
//        minute = c.get(Calendar.MINUTE);
//
//        TimePickerDialog timePickerDialog = new TimePickerDialog(getActivity(), EventFragment.this, hour, minute, DateFormat.is24HourFormat(getActivity()));
//        timePickerDialog.show();
//    }
//
//    @Override
//    public void onTimeSet(TimePicker view, int hourOfDay, int minute) {
//
//        hourFinal = hourOfDay;
//        minuteFinal = minute;
//
//        edDate.setText(yearFinal + "-" + monthFinal + "-" + dayFinal + " " + hourFinal + ":" + minuteFinal);
//
//    }

    public void getEvents() {
        refreshLayout.setRefreshing(true);
        String url = new Connection().api;

        JSONObject sendQuery = new JSONObject();
        try {
            JSONObject query = new JSONObject();
            query.put("query", "{ events{ id title date repeat school subject{ id name } } }");
            sendQuery = query;
        } catch (JSONException e) {
            e.printStackTrace();
        }

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                (Request.Method.POST, url, sendQuery, new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            JSONArray data = response.getJSONObject("data").getJSONArray("events");
                            listDatos = new ArrayList<>();
                            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault());
                            format.setTimeZone(TimeZone.getTimeZone("GMT"));
                            for (int i = 0; i < data.length(); i++){
                                JSONObject datos = data.getJSONObject(i);
                                String myStrDate = datos.getString("date");
                                Date date = format.parse(myStrDate);
                                System.out.println(myStrDate);
                                System.out.println(format.format(format.parse(myStrDate)));
                                System.out.println(date);
                                if (datos.isNull("subject")){
                                    listDatos.add( new Events(datos.getInt("id"), datos.getString("title"), date, datos.getBoolean("school"), 0, null));
                                } else {
                                    JSONObject subject = datos.getJSONObject("subject");
                                    listDatos.add( new Events(datos.getInt("id"), datos.getString("title"), date, datos.getBoolean("school"), subject.getInt("id"), subject.getString("name")));
                                }
                            }
                            final AdapterEvents adapterDatos = new AdapterEvents(listDatos);
                            final SwipeController swipeController = new SwipeController(new SwipeControllerActions() {
                                @Override
                                public void onRightClicked(final int position) {
                                    new MaterialAlertDialogBuilder(getContext())
                                            .setTitle("Eliminar Asignatura")
                                            .setMessage("¿Eliminar Asignatura?\n"+listDatos.get(position).getTitle())
                                            .setPositiveButton("Aceptar", new DialogInterface.OnClickListener() {
                                                @Override
                                                public void onClick(DialogInterface dialog, int which) {
                                                    Toast.makeText(getContext(), "Looks good", Toast.LENGTH_SHORT).show();
                                                }
                                            })
                                            .show();

                                }
                                @Override
                                public void onLeftClicked(final int position) {
                                    final View dialogView = inflater.inflate(R.layout.dialog_subject, null);
                                    final EditText nameSubject = dialogView.findViewById(R.id.nameSubject);
                                    //nameSubject.setText(listDatos.get(position).getName());
                                    new MaterialAlertDialogBuilder(getContext())
                                            .setTitle("Editar Asignatura")
                                            .setView(dialogView)
                                            .setPositiveButton("Guardar", new DialogInterface.OnClickListener() {
                                                @Override
                                                public void onClick(DialogInterface dialog, int which) {

                                                    if (!nameSubject.getText().toString().isEmpty()){
                                                        Toast.makeText(getContext(), "Looks good", Toast.LENGTH_SHORT).show();
                                                    }
                                                }
                                            })
                                            .show();
                                }
                            }, getContext());
                            ItemTouchHelper itemTouchhelper = new ItemTouchHelper(swipeController);
                            itemTouchhelper.attachToRecyclerView(recycler);
                            recycler.addItemDecoration(new RecyclerView.ItemDecoration() {
                                @Override
                                public void onDraw(@NonNull Canvas c, @NonNull RecyclerView parent, @NonNull RecyclerView.State state) {
                                    swipeController.onDraw(c);
                                }
                            });
                            recycler.setAdapter(adapterDatos);
                            refreshLayout.setRefreshing(false);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        } catch (ParseException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(getContext(), error.toString(), Toast.LENGTH_SHORT).show();
                    }
                })
        {
            public Map<String, String> getHeaders() throws AuthFailureError {
                HashMap<String, String> headers = new HashMap<>();
                headers.put("Content-Type", "application/json; charset=utf-8");
                headers.put("authorization", new Token(getContext()).getToken());
                return headers;
            }
        };
        MySingleton.getInstance(getContext()).addToRequestQueue(jsonObjectRequest);
    }
}
