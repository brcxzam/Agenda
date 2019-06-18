package com.brcxzam.owltime;

import androidx.annotation.Nullable;

import java.util.Date;

public class Events {

    private int id;
    private String title;
    private Date date;
    private boolean school;
    private int idSubject;
    private String nameSubject;

    public Events(int id, String title, Date date, boolean school, int idSubject, String nameSubject) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.school = school;
        this.idSubject = idSubject;
        this.nameSubject = nameSubject;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean isSchool() {
        return school;
    }

    public void setSchool(boolean school) {
        this.school = school;
    }

    public int getIdSubject() {
        return idSubject;
    }

    public void setIdSubject(int idSubject) {
        this.idSubject = idSubject;
    }

    public String getNameSubject() {
        return nameSubject;
    }

    public void setNameSubject(String nameSubject) {
        this.nameSubject = nameSubject;
    }
}
