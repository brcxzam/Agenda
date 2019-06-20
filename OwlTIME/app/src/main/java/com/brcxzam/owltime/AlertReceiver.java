package com.brcxzam.owltime;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import androidx.core.app.NotificationCompat;

public class AlertReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        // get the Bundle
        Bundle bundle = intent.getBundleExtra("bundle");
        // get the object
        String valor = bundle.getSerializable("datos").toString();
        NotificationHelper notificationHelper = new NotificationHelper(context);
        NotificationCompat.Builder nb = notificationHelper.getChannelNotification(valor);
        notificationHelper.getManager().notify(1, nb.build());
    }
}
