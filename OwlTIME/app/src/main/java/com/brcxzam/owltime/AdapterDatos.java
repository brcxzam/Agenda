package com.brcxzam.owltime;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class AdapterDatos extends RecyclerView.Adapter<AdapterDatos.ViewHolderDatos> {

    ArrayList<Subjects> listDatos;

    private OnItemClickListener mListener;

    public interface OnItemClickListener {
        void onUpdateScore(int position);
    }

    public void setOnItemClickListener (OnItemClickListener listener) {
        this.mListener = listener;
    }

    public AdapterDatos(ArrayList<Subjects> listDatos) {
        this.listDatos = listDatos;
    }

    @NonNull
    @Override
    public ViewHolderDatos onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_list,null,false);
        RecyclerView.LayoutParams lp = new RecyclerView.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        lp.setMargins(0,16,0,0);
        view.setLayoutParams(lp);
        return new ViewHolderDatos(view, mListener);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolderDatos holder, int position) {
        holder.name.setText(listDatos.get(position).getName());
        holder.final_score.setText(listDatos.get(position).getFinal_score() + "/100");
    }

    @Override
    public int getItemCount() {
        return listDatos.size();
    }

    public class ViewHolderDatos extends RecyclerView.ViewHolder {

        TextView name, final_score;

        public ViewHolderDatos(@NonNull View itemView, final OnItemClickListener listener) {
            super(itemView);
            name = itemView.findViewById(R.id.name);
            final_score = itemView.findViewById(R.id.final_score);

            final_score.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (listener != null) {
                        int position = getAdapterPosition();
                        if (position != RecyclerView.NO_POSITION) {
                            listener.onUpdateScore(position);
                        }
                    }
                }
            });
        }

    }
}
