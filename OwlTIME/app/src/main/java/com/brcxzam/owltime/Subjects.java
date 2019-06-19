package com.brcxzam.owltime;

import androidx.annotation.NonNull;

public class Subjects {

    private int id;
    private String name;
    private float final_score;

    public Subjects(int id, String name, float final_score) {
        this.id = id;
        this.name = name;
        this.final_score = final_score;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getFinal_score() {
        return final_score;
    }

    public void setFinal_score(float final_score) {
        this.final_score = final_score;
    }

    @NonNull
    @Override
    public String toString() {
        return name;
    }
}
