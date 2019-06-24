package com.brcxzam.owltime;

import android.text.format.DateFormat;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class AdapterEvents extends RecyclerView.Adapter<AdapterEvents.ViewHolderDatos> {

    ArrayList<Events> listDatos;

    public AdapterEvents(ArrayList<Events> listDatos) {
        this.listDatos = listDatos;
    }

    @NonNull
    @Override
    public ViewHolderDatos onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_event,null,false);
        RecyclerView.LayoutParams lp = new RecyclerView.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        lp.setMargins(0,16,0,0);
        view.setLayoutParams(lp);
        return new ViewHolderDatos(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolderDatos holder, int position) {
        holder.date.setText(DateFormat.format("EEEE, MMMM d, yyyy h:mm A", listDatos.get(position).getDate()).toString());
        holder.title.setText(listDatos.get(position).getTitle());
        holder.subject.setText(listDatos.get(position).getNameSubject());
    }

    @Override
    public int getItemCount() {
        return listDatos.size();
    }

    public class ViewHolderDatos extends RecyclerView.ViewHolder {

        TextView date, title, subject;

        public ViewHolderDatos(@NonNull View itemView) {
            super(itemView);
            date = itemView.findViewById(R.id.date);
            title = itemView.findViewById(R.id.title);
            subject = itemView.findViewById(R.id.subject);
        }
    }
}
