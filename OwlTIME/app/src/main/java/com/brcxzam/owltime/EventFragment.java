package com.brcxzam.owltime;

import android.app.AlarmManager;
import android.app.DatePickerDialog;
import android.app.PendingIntent;
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
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.CompoundButton;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TimePicker;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.switchmaterial.SwitchMaterial;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;

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

    int dayFinal, monthFinal, yearFinal, hourFinal, minuteFinal;



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
        v=view;


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
                addEvent(false, 0, null, null, false, 0);
                break;
        }
    }

    public void startAlarm(Calendar c, String title) {
        AlarmManager alarmManager = (AlarmManager) getActivity().getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(getContext(), AlertReceiver.class);
        Bundle bundle = new Bundle();
        bundle.putSerializable("datos", title);
        intent.putExtra("bundle", bundle);
        final int _id = (int) System.currentTimeMillis();
        PendingIntent pendingIntent = PendingIntent.getBroadcast(getContext(), _id, intent, PendingIntent.FLAG_ONE_SHOT);
        c.set(Calendar.SECOND, 0);
        alarmManager.setExact(AlarmManager.RTC_WAKEUP, c.getTimeInMillis(), pendingIntent);
    }

    int day, month, year, hour, minute;
    int subject;
    TextInputEditText title;
    ArrayList<SubjectsEvent> SUBJECTS;
    SwitchMaterial school;
    Spinner spinner;
    ArrayAdapter<SubjectsEvent> adapter;
    ArrayList<SubjectsEvent1> busqueda;
    ArrayAdapter<SubjectsEvent1> adapterBusqueda;
    String fechaYhora;
    private void addEvent(final boolean isUpdate, final int id, String titulo, final Date fecha, boolean escolar, int asignatura) {
        LayoutInflater inflater = getActivity().getLayoutInflater();
        final View dialogView = inflater.inflate(R.layout.activity_cu_events, null);

        title = dialogView.findViewById(R.id.title);

        final TextInputEditText edDate = dialogView.findViewById(R.id.date);
        edDate.setKeyListener(null);
        edDate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final Calendar c= Calendar.getInstance();
                if (isUpdate) {
                    c.setTime(fecha);
                }
                year = c.get(Calendar.YEAR);
                month = c.get(Calendar.MONTH);
                day = c.get(Calendar.DAY_OF_MONTH);
                hour = c.get(Calendar.HOUR_OF_DAY);
                minute = c.get(Calendar.MINUTE);
                DatePickerDialog datePickerDialog = new DatePickerDialog(getContext(), new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker view, final int year, final int month, final int dayOfMonth) {
                        TimePickerDialog timePickerDialog = new TimePickerDialog(getContext(), new TimePickerDialog.OnTimeSetListener() {
                            @Override
                            public void onTimeSet(TimePicker view, int hourOfDay, int minute) {
                                c.set(year, month, dayOfMonth, hourOfDay, minute);
                                SimpleDateFormat format = new SimpleDateFormat("EEEE, MMMM d, yyyy h:mm a");
                                edDate.setText(format.format(c.getTime()));
                                format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                                fechaYhora = format.format(c.getTime());
                                //Toast.makeText(getContext(), fechaYhora, Toast.LENGTH_LONG).show();
                            }
                        }, hour, minute, DateFormat.is24HourFormat(getActivity()));
                        timePickerDialog.show();
                    }
                }, year, month, day);
                datePickerDialog.getDatePicker().setMinDate(System.currentTimeMillis()-1000);
                datePickerDialog.show();
            }
        });

        school = dialogView.findViewById(R.id.school);
        spinner = dialogView.findViewById(R.id.subject);
        getSubjects();

        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                subject = adapter.getItem(position).getId();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        school.setChecked(false);
        school.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if (isChecked) {
                    spinner.setVisibility(View.VISIBLE);
                } else {
                    spinner.setVisibility(View.GONE);
                }
            }
        });

        if (isUpdate) {
            title.setText(titulo);
            Calendar c= Calendar.getInstance();
            c.setTime(fecha);
            SimpleDateFormat format = new SimpleDateFormat("EEEE, MMMM d, yyyy h:mm a");
            edDate.setText(format.format(c.getTime()));
            format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            fechaYhora = format.format(c.getTime());
            school.setChecked(escolar);
        }

        new MaterialAlertDialogBuilder(getContext(), R.style.Theme_Dialog)
                .setTitle("Evento")
                .setView(dialogView)
                .setPositiveButton("Guardar", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        if (isUpdate) {
                            updateEvent(id,title.getText().toString(),
                                    fechaYhora,
                                    school.isChecked(),
                                    subject);
                        } else {
                            createEvent(
                                    title.getText().toString(),
                                    fechaYhora,
                                    school.isChecked(),
                                    subject);
                        }
                    }
                })
                .show();
    }

    public void getSubjects() {
        refreshLayout.setRefreshing(true);
        String url = new Connection().api;

        JSONObject sendQuery = new JSONObject();
        try {
            JSONObject query = new JSONObject();
            query.put("query", "{ subjects { id name } }");
            sendQuery = query;
        } catch (JSONException e) {
            e.printStackTrace();
        }

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                (Request.Method.POST, url, sendQuery, new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            JSONArray data = response.getJSONObject("data").getJSONArray("subjects");
                            SUBJECTS = new ArrayList<>();
                            busqueda = new ArrayList<>();
                            for (int i = 0; i < data.length(); i++){
                                JSONObject datos = data.getJSONObject(i);
                                SUBJECTS.add(new SubjectsEvent(Integer.parseInt(datos.get("id").toString()),datos.getString("name")));
                                busqueda.add(new SubjectsEvent1(Integer.parseInt(datos.get("id").toString()),datos.getString("name")));
                            }
                            if (SUBJECTS.isEmpty()){
                                spinner.setVisibility(View.GONE);
                                school.setVisibility(View.GONE);
                            } else {
                                spinner.setVisibility(View.VISIBLE);
                                if (school.isChecked()) {
                                    spinner.setVisibility(View.VISIBLE);
                                } else {
                                    spinner.setVisibility(View.GONE);
                                }
                            }
                            // Create an ArrayAdapter using the string array and a default spinner layout
                            adapter = new ArrayAdapter<>(getContext(), R.layout.menu_item, SUBJECTS);
                            adapterBusqueda = new ArrayAdapter<>(getContext(), R.layout.menu_item, busqueda);
                            // Specify the layout to use when the list of choices appears
                            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                            // Apply the adapter to the spinner
                            spinner.setAdapter(adapter);
                            refreshLayout.setRefreshing(false);
                        } catch (JSONException e) {
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
//                            JSONObject datos = data.getJSONObject(0);
//                            String myStrDate = datos.getString("date");
//                            Date date = format.parse(myStrDate);
//                            Calendar c= Calendar.getInstance();
//                            c.setTime(date);
//                            startAlarm(c);
                            for (int i = 0; i < data.length(); i++){
                                JSONObject datos = data.getJSONObject(i);
                                String myStrDate = datos.getString("date");
                                Date date = format.parse(myStrDate);
                                Calendar c= Calendar.getInstance();
                                c.setTime(date);
                                startAlarm(c, datos.getString("title"));
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
                                    new MaterialAlertDialogBuilder(getContext(), R.style.Theme_Dialog)
                                            .setTitle("Eliminar Evento")
                                            .setMessage("¿Eliminar Evento?\n"+listDatos.get(position).getTitle())
                                            .setPositiveButton("Aceptar", new DialogInterface.OnClickListener() {
                                                @Override
                                                public void onClick(DialogInterface dialog, int which) {
                                                    deleteEvent(listDatos.get(position).getId());
                                                }
                                            })
                                            .show();

                                }
                                @Override
                                public void onLeftClicked(final int position) {
                                    addEvent(true, listDatos.get(position).getId(), listDatos.get(position).getTitle(), listDatos.get(position).getDate(), listDatos.get(position).isSchool(), listDatos.get(position).getIdSubject());
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

    private void deleteEvent(int id) {
        //progressBar.setVisibility(View.VISIBLE);
        refreshLayout.setRefreshing(true);
        String url = new Connection().api;

        JSONObject sendQuery = new JSONObject();
        try {
            JSONObject variables = new JSONObject();
            variables.put("id", id);
            JSONObject query = new JSONObject();
            query.put("query", "mutation($id: ID){ dEvent(id: $id) }");
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
                            JSONObject data = response.getJSONObject("data");
                            if (data.getString("dEvent").equals("done")){
                                getEvents();
                            }
                        } catch (JSONException e) {
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

    private void createEvent(String title, String date, boolean school, int subject) {
        String url = new Connection().api;
        refreshLayout.setRefreshing(true);
        JSONObject sendQuery = new JSONObject();
        try {
            JSONObject data = new JSONObject();
            data.put("title", title);
            data.put("date", date);
            data.put("school", school);
            if (school){
                data.put("subject", subject);
            }
            JSONObject variables = new JSONObject();
            variables.put("data", data);
            JSONObject query = new JSONObject();
            query.put("query", "mutation($data: iEvents){ cEvent(data: $data){ id date } }");
            query.put("variables", variables);
            sendQuery = query;
            System.out.println(query);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                (Request.Method.POST, url, sendQuery, new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject response) {
                        System.out.println(response);
                        try {
                            JSONObject datos = response.getJSONObject("data").getJSONObject("cEvent");
                            getEvents();
                            refreshLayout.setRefreshing(false);
                        } catch (JSONException e) {
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

    private void updateEvent(int id, String title, String date, boolean school, int subject) {
        //progressBar.setVisibility(View.VISIBLE);
        refreshLayout.setRefreshing(true);
        String url = new Connection().api;

        JSONObject sendQuery = new JSONObject();
        try {
            JSONObject data = new JSONObject();
            data.put("title", title);
            data.put("date", date);
            data.put("school", school);
            if (school){
                data.put("subject", subject);
            }
            JSONObject variables = new JSONObject();
            variables.put("data", data);
            variables.put("id", id);
            JSONObject query = new JSONObject();
            query.put("query", "mutation($id: ID, $data: iEvents){ uEvent(id: $id, data: $data) }");
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
                            JSONObject data = response.getJSONObject("data");
                            if (data.getString("uEvent").equals("done")){
                                getEvents();
                            }
                        } catch (JSONException e) {
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

    private void updateScore(int id, float advance1, float advance2, float advance3,float advance4) {
        //progressBar.setVisibility(View.VISIBLE);
        refreshLayout.setRefreshing(true);
        String url = new Connection().api;

        JSONObject sendQuery = new JSONObject();
        try {
            JSONObject data = new JSONObject();
            data.put("advance1", advance1);
            data.put("advance2", advance2);
            data.put("advance3", advance3);
            data.put("advance4", advance4);
            JSONObject variables = new JSONObject();
            variables.put("data", data);
            variables.put("id", id);
            JSONObject query = new JSONObject();
            query.put("query", "mutation($id: ID, $data: iScores){ uScore(id: $id, data: $data) }");
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
                            JSONObject data = response.getJSONObject("data");
                            if (data.getString("uScore").equals("done")){
                                //getSubjects();
                            }
                        } catch (JSONException e) {
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
