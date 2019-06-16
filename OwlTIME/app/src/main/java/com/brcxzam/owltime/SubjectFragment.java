package com.brcxzam.owltime;


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
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
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

    public SubjectFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, final ViewGroup container,
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
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Here's a Snackbar", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
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
                                public void onRightClicked(int position) {
                                    adapterDatos.listDatos.remove(position);
                                    adapterDatos.notifyItemRemoved(position);
                                    adapterDatos.notifyItemRangeChanged(position, adapterDatos.getItemCount());
                                }
                            });
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
