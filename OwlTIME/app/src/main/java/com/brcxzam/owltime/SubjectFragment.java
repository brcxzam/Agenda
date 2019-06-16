package com.brcxzam.owltime;


import android.app.AlertDialog;
import android.content.DialogInterface;
import android.graphics.Canvas;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.ItemTouchHelper;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


/**
 * A simple {@link Fragment} subclass.
 */
public class SubjectFragment extends Fragment {

    View v;
    ArrayList<Subjects> listDatos;
    RecyclerView recycler;
    SwipeRefreshLayout refreshLayout;
    LayoutInflater inflater;
    String[] SUBJECTS = new String[] {"Primer parcial: 20%", "Segundo parcial: 20%", "Tercer parcial: 20%", "Cuarto parcial: 40%"};

    public SubjectFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(final LayoutInflater inflater, final ViewGroup container,
                             Bundle savedInstanceState) {
        v = inflater.inflate(R.layout.fragment_subject, container, false);
        refreshLayout = v.findViewById(R.id.refresh);
        refreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
               getSubjects();
            }
        });
        FloatingActionButton fab = v.findViewById(R.id.fab);
        this.inflater =  inflater;
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                final View dialogView = inflater.inflate(R.layout.dialog_subject, null);
                new MaterialAlertDialogBuilder(getContext())
                        .setTitle("Asignatura")
                        .setView(dialogView)
                        .setPositiveButton("Guardar", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                EditText nameSubject = dialogView.findViewById(R.id.nameSubject);
                                if (!nameSubject.getText().toString().isEmpty()){
                                    createSubject(nameSubject.getText().toString());
                                }
                            }
                        })
                        .show();
            }
        });

        recycler = (RecyclerView) v.findViewById(R.id.recycler_view);
        recycler.setLayoutManager(new LinearLayoutManager(v.getContext()));

        getSubjects();
        return v;
    }

    public void getSubjects() {
        //progressBar.setVisibility(View.VISIBLE);
        refreshLayout.setRefreshing(true);
        String url = new Connection().api;

        JSONObject sendQuery = new JSONObject();
        try {
            JSONObject query = new JSONObject();
            query.put("query", "{ subjects { id name final_score } }");
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
                            listDatos = new ArrayList<>();
                            for (int i = 0; i < data.length(); i++){
                                JSONObject datos = data.getJSONObject(i);
                                listDatos.add(new Subjects(Integer.parseInt(datos.get("id").toString()),datos.getString("name"), (float) datos.getDouble("final_score")));
                            }
                            final AdapterDatos adapterDatos = new AdapterDatos(listDatos);
                            final SwipeController swipeController = new SwipeController(new SwipeControllerActions() {
                                @Override
                                public void onRightClicked(final int position) {
                                    new MaterialAlertDialogBuilder(getContext())
                                            .setTitle("Eliminar Asignatura")
                                            .setMessage("¿Eliminar Asignatura?\n"+listDatos.get(position).getName())
                                            .setPositiveButton("Aceptar", new DialogInterface.OnClickListener() {
                                                @Override
                                                public void onClick(DialogInterface dialog, int which) {
                                                    deleteSubject(listDatos.get(position).getId());
                                                }
                                            })
                                            .show();

                                }
                                @Override
                                public void onLeftClicked(final int position) {
                                    final View dialogView = inflater.inflate(R.layout.dialog_subject, null);
                                    final EditText nameSubject = dialogView.findViewById(R.id.nameSubject);
                                    nameSubject.setText(listDatos.get(position).getName());
                                    new MaterialAlertDialogBuilder(getContext())
                                            .setTitle("Editar Asignatura")
                                            .setView(dialogView)
                                            .setPositiveButton("Guardar", new DialogInterface.OnClickListener() {
                                                @Override
                                                public void onClick(DialogInterface dialog, int which) {

                                                    if (!nameSubject.getText().toString().isEmpty()){
                                                        updateSubject(listDatos.get(position).getId(), nameSubject.getText().toString());
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
                            adapterDatos.setOnItemClickListener(new AdapterDatos.OnItemClickListener() {
                                final View dialogView = inflater.inflate(R.layout.dialog_final_score, null);
                                @Override
                                public void onUpdateScore(int position) {
                                    ArrayAdapter<String> adapter = new ArrayAdapter<>(getContext(), R.layout.menu_item, SUBJECTS);
                                    AutoCompleteTextView editTextFilledExposedDropdown = dialogView.findViewById(R.id.acSubjects);
                                    editTextFilledExposedDropdown.setAdapter(adapter);
                                    new MaterialAlertDialogBuilder(getContext())
                                            .setTitle("Title")
                                            //.setMessage(String.valueOf(listDatos.get(position).getFinal_score()))
                                            .setView(dialogView)
                                            .setPositiveButton("Ok", null)
                                            .show();
                                }
                            });
                            refreshLayout.setRefreshing(false);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(v.getContext(), error.toString(), Toast.LENGTH_SHORT).show();
                    }
                })
        {
            public Map<String, String> getHeaders() throws AuthFailureError {
                HashMap<String, String> headers = new HashMap<>();
                headers.put("Content-Type", "application/json; charset=utf-8");
                headers.put("authorization", new Token(v.getContext()).getToken());
                return headers;
            }
        };
        MySingleton.getInstance(v.getContext()).addToRequestQueue(jsonObjectRequest);
    }

    private void deleteSubject(int id) {
        //progressBar.setVisibility(View.VISIBLE);
        refreshLayout.setRefreshing(true);
        String url = new Connection().api;

        JSONObject sendQuery = new JSONObject();
        try {
            JSONObject variables = new JSONObject();
            variables.put("id", id);
            JSONObject query = new JSONObject();
            query.put("query", "mutation($id: ID){ dSubject(id: $id) }");
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
                            if (data.getString("dSubject").equals("done")){
                                getSubjects();
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(v.getContext(), error.toString(), Toast.LENGTH_SHORT).show();
                    }
                })
        {
            public Map<String, String> getHeaders() throws AuthFailureError {
                HashMap<String, String> headers = new HashMap<>();
                headers.put("Content-Type", "application/json; charset=utf-8");
                headers.put("authorization", new Token(v.getContext()).getToken());
                return headers;
            }
        };
        MySingleton.getInstance(v.getContext()).addToRequestQueue(jsonObjectRequest);
    }

    private void createSubject(String name) {
        //progressBar.setVisibility(View.VISIBLE);
        String url = new Connection().api;
        refreshLayout.setRefreshing(true);
        JSONObject sendQuery = new JSONObject();
        try {
            JSONObject data = new JSONObject();
            data.put("name", name);
            JSONObject variables = new JSONObject();
            variables.put("data", data);
            JSONObject query = new JSONObject();
            query.put("query", "mutation($data: iSubjects) { cSubject(data: $data) {id name final_score} }");
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
                            JSONObject datos = response.getJSONObject("data").getJSONObject("cSubject");
                            listDatos.add(new Subjects(Integer.parseInt(datos.get("id").toString()),datos.getString("name"), (float) datos.getDouble("final_score")));
                            refreshLayout.setRefreshing(false);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(v.getContext(), error.toString(), Toast.LENGTH_SHORT).show();
                    }
                })
        {
            public Map<String, String> getHeaders() throws AuthFailureError {
                HashMap<String, String> headers = new HashMap<>();
                headers.put("Content-Type", "application/json; charset=utf-8");
                headers.put("authorization", new Token(v.getContext()).getToken());
                return headers;
            }
        };
        MySingleton.getInstance(v.getContext()).addToRequestQueue(jsonObjectRequest);
    }

    private void updateSubject(int id, String name) {
        //progressBar.setVisibility(View.VISIBLE);
        refreshLayout.setRefreshing(true);
        String url = new Connection().api;

        JSONObject sendQuery = new JSONObject();
        try {
            JSONObject data = new JSONObject();
            data.put("name", name);
            JSONObject variables = new JSONObject();
            variables.put("data", data);
            variables.put("id", id);
            JSONObject query = new JSONObject();
            query.put("query", "mutation($id: ID, $data: iSubjects) { uSubject(id: $id, data: $data) }");
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
                            if (data.getString("uSubject").equals("done")){
                                getSubjects();
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(v.getContext(), error.toString(), Toast.LENGTH_SHORT).show();
                    }
                })
        {
            public Map<String, String> getHeaders() throws AuthFailureError {
                HashMap<String, String> headers = new HashMap<>();
                headers.put("Content-Type", "application/json; charset=utf-8");
                headers.put("authorization", new Token(v.getContext()).getToken());
                return headers;
            }
        };
        MySingleton.getInstance(v.getContext()).addToRequestQueue(jsonObjectRequest);
    }

}
